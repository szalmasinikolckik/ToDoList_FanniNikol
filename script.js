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
    // let tasks = [];
    // const items = ul.querySelectorAll("li");    
    // for (let i = 0; i < items.length; i++) {
    //     const span = items[i].querySelector("span");
    //     const checkbox = items[i].querySelector("input[type='checkbox']");
    //     tasks.push({
    //         text: span.innerText,
    //         checked: checkbox.checked
    //     });
    // }
        
    // localStorage.setItem("tasks", JSON.stringify(tasks)); //OBJECTES
    let taskTexts = [];
    let taskChecks = [];
    const items = ul.querySelectorAll("li");
    for (let i = 0; i < items.length; i++) {
        const span = items[i].querySelector("span");
        const checkbox = items[i].querySelector("input[type='checkbox']");
        taskTexts.push(span.innerText);
        taskChecks.push(checkbox.checked);
    }
    localStorage.setItem("taskTexts", JSON.stringify(taskTexts));
    localStorage.setItem("taskChecks", JSON.stringify(taskChecks)); //2 tombos
}
   

function loadTask() {
    // const savedTasks = JSON.parse(localStorage.getItem("tasks")); 
    // for (let i = 0; i < savedTasks.length; i++) {
    //     input.value = savedTasks[i];
    //     addTask();
        
    // }
    const savedTexts = JSON.parse(localStorage.getItem("taskTexts"));
    const savedChecks = JSON.parse(localStorage.getItem("taskChecks"));
    for (let i = 0; i < savedTexts.length; i++) {

        const li = document.createElement("li");
        const div = document.createElement("div");
        div.id = "taskContent";

        const checkBtn = document.createElement("input");
        checkBtn.type = "checkbox";
        checkBtn.checked = savedChecks[i];
        checkBtn.addEventListener("change", saveTask);

        const span = document.createElement("span");
        span.innerText = savedTexts[i];

        div.appendChild(checkBtn);
        div.appendChild(span);
        li.appendChild(div);

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Törlés";
        li.appendChild(deleteBtn);

        ul.appendChild(li);
        

    }
}

input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});



function selectTask() {
   ul.addEventListener("click", function(e) {
        let li = e.target.closest("li");
        if (!li) return;

        const items = ul.querySelectorAll("li");

        if (li.classList.contains("selected")) {
            li.classList.remove("selected");
            return;
        }

        for (let i = 0; i < items.length; i++) {
            items[i].classList.remove("selected");
        }

        li.classList.add("selected");
    });
}


function swapTask() {
    document.addEventListener("keydown", function(e) {
        
        let selectedIndex = -1;
        const items = ul.querySelectorAll("li");
        
        for (let i = 0; i < items.length; i++) {
            if (items[i].classList.contains("selected")) {
                selectedIndex = i;
            }
        }
        if (selectedIndex === -1) return;

        if (e.key === "ArrowUp") {
            if (selectedIndex === 0) return;  
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


