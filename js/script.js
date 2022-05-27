const submit = document.getElementById("submit");

// отключаем стандартное поведение submit
submit.onclick = function(event) {return false;};


// вешаем на submit валидацию и вызов функции-публикатора
submit.addEventListener("click", function() {
    let data_to_post = {
        title: document.getElementById("title").value,
        body: document.getElementById("body").value,
        completed: document.getElementById("completed").checked
    };
    if (data_to_post.title == "") {
        return alert("Title is required")
    }
    // поставил этот костыль, потому что сервер не принимает "" в качестве body:
    if (data_to_post.body == "") {
        data_to_post.body = " "
    }
    // передаем данные на сервер и создаем новый TODO
    poster(data_to_post);
    document.getElementById("form").reset();
});


// создает новый TODO и сразу же развешивает события на элементы
function creator(id, title, body, completed) {
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

    //вешаем обработчик на удаление
    newDelete.addEventListener("click", function() {deleter(id);});

    //вешаем обработчик на изменение
    input = document.querySelector(`[data-id="${id}"]` + ' input[type="checkbox"]');
    input.addEventListener("click", function() {updater(id);});    
}

//публикатор
async function poster(data) {
    // передаем данные на сервер
    let response = await fetch('http://localhost:8080/todo', {
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify(data)
    });
    if (response.ok) {
        // ответ с сервера передаем на создание нового элемента
        let result = await response.json();
        creator(result.id, result.title, result.body, result.completed);
    }
}

//делитер
async function deleter(id) {
    let response = await fetch('http://localhost:8080/todo/' + id, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
    });
    if (response.ok) {
        document.querySelector(`[data-id="${id}"]`).remove();
    }
}

//для обновления
//ПРОБЛЕМА: запрос уходит, приходит 202 ответ, в файле БД происходит какое-то обновление, но содержимое не меняется
async function updater(id, completed) {
    data = {
        completed: document.querySelector(`[data-id="${id}"]` + ' input[type="checkbox"]').checked
    }
    let response = await fetch('http://localhost:8080/todo/' + id, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json; charset=utf-8'},
        body: JSON.stringify(data)
    });
}
