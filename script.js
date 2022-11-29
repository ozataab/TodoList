const form = document.querySelector("form");
const input = document.querySelector("#txtTaskName");
const btnAddNewTask = document.querySelector("#btnAddNewTask");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const taskList = document.querySelector("#task-list");

let todos;


eventListeners();

loadItems();

function eventListeners() {

    form.addEventListener("submit", addNewItem);

    taskList.addEventListener("click", deleteItem);

    btnDeleteAll.addEventListener("click", deleteAllItems);

}
function loadItems() {
    todos = getItemsLS();
    todos.forEach(function (item) {
        creatItems(item);

    })


};
function getItemsLS() {
    if (localStorage.getItem("todos") === null) {
        todos = [];


    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    return todos;


}


function setItemToLS(newTodo) {

    todos = getItemsLS();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos))



}



function creatItems(newTodo) {

    const li = document.createElement("li");
    li.className = "list-group-item list-group-item-secondary";
    li.appendChild(document.createTextNode(newTodo));




    const a = document.createElement("a");
    a.classList = "delete-item float-right";
    a.setAttribute("href", "#");
    a.innerHTML = '<i class="fas fa-times"></i>';

    li.appendChild(a);

    taskList.appendChild(li);


}


function addNewItem(e) {

    if (input.value === '') {
        alert("add new item");


    }
    setItemToLS(input.value);


    e.preventDefault();

    creatItems(input.value);

    input.value = "";

};


function deleteItem(e) {

    if (e.target.className === "fas fa-times") {
        if (confirm("Silmek istediğinize emin misin ?"))

            e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);



    }

    e.preventDefault();

};


function deleteTodoFromStorage(deletetodo) {
    let todos = getItemsLS();

    todos.forEach(function (todo, index) {
        if (todo === deletetodo) {
            todos.splice(index, 1);


        }



    })
    localStorage.setItem("todos", JSON.stringify(todos));


}
function deleteAllItems(e) {

    if (confirm("Tamamını silmek istediğinize emin misiniz ?")) {
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
        localStorage.clear();

    }

}