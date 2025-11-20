const input = document.getElementById("taskInput");
const ul = document.querySelector("#taskList");

function addTask() {
    if (!input.value.trim()) {
        alert("Kérlek írj valami teendőt!");
        return;
    }
    if (!isNaN(input.value)) {
        alert("A megadott érték nem lehet szám!");
        return;
    }
    if(input.value){
        const li = document.createElement("li");

        const div = document.createElement("div");
        div.id = "taskContent"; 

        const checkBtn = document.createElement("input");
        checkBtn.setAttribute("type", "checkbox");
        div.appendChild(checkBtn);
        
        const span = document.createElement("span");
        span.innerText = input.value;
        div.appendChild(span);
        
        li.appendChild(div);

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Törlés";
        li.appendChild(deleteBtn);
        
        ul.appendChild(li);

        deleteTask(deleteBtn, li);

        input.value = "";
        saveTask()
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

input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});



function selectTask() {
    let selectedLi;

    ul.addEventListener("click", function(e) {
    let li = e.target.closest("li");
 
    let items = ul.querySelectorAll("li");

    for (let i = 0; i < items.length; i++)
    {
        items[i].style.backgroundColor = "";
    } 

    selectedLi = li;
    selectedLi.style.backgroundColor = "lightpink";
    
});
}


function completeTask() {
    
}

function swapTask() {
    document.addEventListener("keydown", function(e) {
        
        let selectedIndex = -1;
        const items = ul.querySelectorAll("li");
        
        for (let i = 0; i < items.length; i++) {
            if (items[i].style.backgroundColor === "lightpink") {
                selectedIndex = i;
            }
        }
        
        if (selectedIndex === -1) return;
        
        if (e.key === "ArrowUp") {

            const selectedItem = items[selectedIndex];
            const prevItem = items[selectedIndex - 1];
            ul.insertBefore(selectedItem, prevItem);
            saveTask();
        }

        else if (e.key === "ArrowDown") {
            
            const selectedItem = items[selectedIndex];
            const nextItem = items[selectedIndex + 1];
            ul.insertBefore(nextItem, selectedItem);
            saveTask();
        }
    });
}


loadTask();
selectTask();
swapTask();


