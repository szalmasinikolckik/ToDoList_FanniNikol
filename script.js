const input = document.getElementById("taskInput");
const ul = document.querySelector("#taskList");

function addTask() {
    const li = document.createElement("li");
    li.textContent = input.value;
    ul.appendChild(li);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Törlés";
    li.appendChild(deleteBtn);
    ul.appendChild(li);
    deleteBtn.addEventListener("click", () => 
    {
        li.remove();
    });

    input.value = "";
}

function saveTask() {
    const tasks = [];
    
}

