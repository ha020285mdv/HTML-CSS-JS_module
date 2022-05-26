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

    Poster(data_to_post);
});


async function Poster(data) {
    let response = await fetch('http://localhost:8080/todo', {
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify(data)
    });

      let result = await response.json();
      
      print(result)
}





const getDataFromServer = () => {
    return new Promise((resolve, reject) => { // (0)
        setTimeout(() => {
            resolve(server); // успех
            // reject(new Error('500 ServerError')); // не успех
        }, 2000);
    })
}

function asyncAction() {
    const responce = getDataFromServer();
    responce
        .then((data) => {  // (1)
            console.log('data: ', data); // [{ name: 'Vlad', ... }, { name: 'Vova', ... }]
        })
        .catch((err) => { // (2)
            console.log('err: ', err);
        })
}

btn.addEventListener('click', asyncAction)