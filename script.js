const input = document.getElementById("taskInput");
const ul = document.querySelector("#taskList");

function addTask() {
    const li = document.createElement("li");
    li.textContent = input.value;
    ul.appendChild(li);
    input.value = "";
}


