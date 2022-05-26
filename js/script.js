function print(some) {console.log(some)};

const submit = document.getElementById("submit");

submit.onclick = function(event) {return false;}



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

    poster(data_to_post);
});


async function poster(data) {
    let response = await fetch('http://localhost:8080/todo', {
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify(data)
    });

    let result = await response.json();
    
    print(result);
}


const add = document.getElementById("new");
add.addEventListener("click", creator(2, 'new', 'new text', true));


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

    content = document.getElementById("content");
    content.appendChild(newToDo);
}
