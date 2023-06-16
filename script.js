
// Array to store tasks
const tasks = [];

// Get the necessary elements from the DOM
const taskInput = document.querySelector(".form-control");
const taskform = document.querySelector("#taskform");
const taskList = document.querySelector("#taskList");

// Add event listener to the form submission
taskform.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission behavior
    addTask();
});

   // Function to add a new task to the list
        function addTask() {
            if (taskInput.value !== "") {
                // Create a new task object with text and completion status
                var newTask = {
                    text: taskInput.value,
                    completed: false
                };

                // Add the new task to the tasks array
                tasks.push(newTask);
                // Render the updated tasks
                renderTasks();
                // Clear the input field
                taskInput.value = "";
            }
        }

 // Function to render tasks
 function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {
        // Create a list item element for each task
        var listItem = document.createElement("li");
        listItem.innerText = task.text;
        listItem.classList.add("task-item");

        // Add completed class if task is marked as completed
        if (task.completed) {
            listItem.classList.add("completed");
        }

        // Create checkbox element for toggling task completion
       const checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", function() {
            toggleTaskCompletion(index);
        });
        checkbox.classList.add("checkbox");

        // Create text element for displaying task text
        const taskText = document.createElement("span");
        taskText.innerText = task.text;

        // Add completed class if task is marked as completed
        if (task.completed) {
        listItem.classList.add("completed");
        }

        // Create edit button for editing task
        var editButton = document.createElement("button");
        editButton.innerText = "Edit";
        editButton.addEventListener("click", function() {
            editTask(index);
        }); 
        editButton.classList.add("edit-button");

        // Create delete button for deleting task
        var deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.addEventListener("click", function() {
            deleteTask(index);
        });
        deleteButton.classList.add("delete-button");

        // Append checkbox, edit button, and delete button to the list item
        listItem.appendChild(checkbox);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);
        // Append the list item to the task list
        taskList.appendChild(listItem);
    });
}

  // Function to toggle task completion
  function toggleTaskCompletion(index) {
    // Toggle the completed status of the task
    tasks[index].completed = !tasks[index].completed;
    // Render the updated tasks
    renderTasks();
}

// Function to edit a task
function editTask(index) {
    // Prompt the user to enter a new task description
   const newTaskText = prompt("Enter a new task description:", tasks[index].text);
    
    if (newTaskText !== null) {
        // Update the task text with the new description
        tasks[index].text = newTaskText;
        // Render the updated tasks
        renderTasks();
    }
}
 // Function to delete a task
 function deleteTask(index) {
    // Remove the task from the tasks array
    tasks.splice(index, 1);
    // Render the updated tasks
    renderTasks();
}

// Initial rendering of tasks
renderTasks();
