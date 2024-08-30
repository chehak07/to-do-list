const inputBox = document.getElementById("input-box");
const dateBox = document.getElementById("date-box");
const backlogList = document.getElementById("backlog-list");
const todoList = document.getElementById("todo-list");
const ongoingList = document.getElementById("ongoing-list");
const doneList = document.getElementById("done-list");

function addTask() {
    if (inputBox.value === '' || dateBox.value === '') {
        alert("You must write something and select a deadline date!");
    } else {
        let taskText = inputBox.value;
        let deadline = dateBox.value;
        let taskItem = createTaskElement(taskText, deadline, 'backlog');
        backlogList.appendChild(taskItem);
    }
    inputBox.value = "";
    dateBox.value = "";
}

function createTaskElement(text, deadline, status) {
    let li = document.createElement("li");
    li.className = "task-item";
    
    // Task content
    let taskSpan = document.createElement("span");
    taskSpan.className = "task-text";
    taskSpan.innerHTML = `${text} (Deadline: ${deadline})`;
    li.appendChild(taskSpan);

    // Navigation buttons
    let navDiv = document.createElement("div");
    navDiv.className = "navigation-buttons";
    
    let leftButton = document.createElement("button");
    leftButton.className = "nav-left";
    leftButton.innerHTML = "←";
    leftButton.onclick = () => moveTask(li, -1);
    navDiv.appendChild(leftButton);

    let rightButton = document.createElement("button");
    rightButton.className = "nav-right";
    rightButton.innerHTML = "→";
    rightButton.onclick = () => moveTask(li, 1);
    navDiv.appendChild(rightButton);

    li.appendChild(navDiv);
    
    updateButtonState(li, status);

    return li;
}


function moveTask(task, direction) {
    let currentList = task.parentElement;
    let nextList;
    
    if (currentList === backlogList && direction === 1) {
        nextList = todoList;
    } else if (currentList === todoList) {
        nextList = direction === 1 ? ongoingList : backlogList;
    } else if (currentList === ongoingList) {
        nextList = direction === 1 ? doneList : todoList;
    } else if (currentList === doneList && direction === -1) {
        nextList = ongoingList;
    }

    if (nextList) {
        nextList.appendChild(task);
        updateButtonState(task, nextList.id);
    }
}


function updateButtonState(task, status) {
    let leftButton = task.querySelector(".nav-left");
    let rightButton = task.querySelector(".nav-right");

    if (status === 'backlog') {
        leftButton.disabled = true;
        rightButton.disabled = false;
    } else if (status === 'todo') {
        leftButton.disabled = false;
        rightButton.disabled = false;
    } else if (status === 'ongoing') {
        leftButton.disabled = false;
        rightButton.disabled = false;
    } else if (status === 'done') {
        leftButton.disabled = false;
        rightButton.disabled = true;
    }
}

