const input = document.getElementById("taskInput");
const ul = document.querySelector("#taskList");

function addTask() {

    if(input.value){
        const li = document.createElement("li");
    

        const span = document.createElement("span");
        span.innerText = input.value;
        li.appendChild(span);

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Törlés";
        li.appendChild(deleteBtn);
        ul.appendChild(li);
        deleteTask(deleteBtn, li);

        input.value = "";
        saveTask()
    }

    else{
        alert("Kérlek írj valami teendőt!")
    }

}

function deleteTask(deleteBtn, li){
    deleteBtn.addEventListener("click", () => 
    {
        li.remove();
        saveTask()
    });
}

function saveTask() {
    let tasks = [];
    const span = ul.querySelectorAll("span");

    for (let i = 0; i < span.length; i++) {
        tasks.push(span[i].innerText)
    }
    
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTask() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")); 
    for (let i = 0; i < savedTasks.length; i++) {
        input.value = savedTasks[i];
        addTask();

    }
    
}

loadTask();

