function print(some) {console.log(some)};

const submit = document.getElementById("submit");
submit.onclick = function(event) {return false;};



submit.addEventListener("click", function() {
    title = document.getElementById("title").value;
    body = document.getElementById("body").value;
    completed = document.getElementById("completed").checked;

    if (title == "") {
        return alert("Title is required")
    }

    let data_to_post = {
        title: title,
        body: body,
        completed: completed
    };
    // передаем подготовленные данные на сервер и создаем новый TODO
    poster(data_to_post);

    document.getElementById("form").reset();



});


async function poster(data) {
    // передаем данные на сервер
    let response = await fetch('http://localhost:8080/todo', {
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify(data)
    });
    
    // ответ с сервера передаем на создание нового элемента
    let result = await response.json();
    creator(result.id, result.title, result.body, result.completed);
    
    // создаем/обновляем обработчик для удаления
    let closers = document.querySelectorAll(".delete");
    for (closer of closers) {
        closer.addEventListener("click", function() {
            deleter(closer.parentNode.dataset.id);
            //closer.parentNode.remove();
        });
    }
}


function creator(id, title, body, completed) {
    //хотел сделать клонированием, но в учебных целях создавал каждый элемент отдельно
    newToDo = document.createElement("div");
    newToDo.classList.add("todo");
    newToDo.dataset.id = id;
    
    newTitle = document.createElement("h2");
    newTitle.innerText = title;
    newTitle.classList.add("title");
    newToDo.appendChild(newTitle);
        
    newBody = document.createElement("div");
    newBody.innerText = body;
    newBody.classList.add("body");
    newToDo.appendChild(newBody);
        
    newCompleted = document.createElement("div");
    newCompleted.classList.add("completed");
    newToDo.appendChild(newCompleted);

    newLabel = document.createElement("label");
    newLabel.innerText = "Is completed";
    newCompleted.appendChild(newLabel);

    newInput = document.createElement("input");
    newInput.type = "checkbox";
    newInput.checked = completed;
    newLabel.appendChild(newInput);    

    newDelete = document.createElement("button");
    newDelete.classList.add("delete");
    newDelete.innerText = "X";
    newToDo.appendChild(newDelete);

    content = document.getElementById("content");
    content.appendChild(newToDo);
}


async function deleter(id) {
    let response = await fetch('http://localhost:8080/todo/' + id, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
    });

    let result = await response.json();
}