// Array to store tasks
const tasks = [];

// Get the necessary elements from the DOM
const taskInput = document.querySelector(".form-control");
const taskform = document.querySelector("#taskform");
const taskList = document.querySelector("#taskList");

// Add event listener to the form submission
taskform.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent default form submission behavior
  addTask();
});

// Function to save the tasks Array to the browser`s localStorage for persistance
const saveToLocalStorage = () => {
  const stringifiedTasks = JSON.stringify(tasks); // Convert the tasks array to a JSON string
  localStorage.setItem("tasks", stringifiedTasks); // Store the stringified tasks array in localStorage
}

// Function to load the tasks array from localstorage when the page is loaded or refreshed
const loadFromLocalStorage = () => {
  const parsedTasks = JSON.parse(localStorage.getItem("tasks")); // retrieves the stringified tasks array stored in the browser's localStorage with the key "tasks". The retrieved data is a string, so JSON.parse() is used to convert it back into an array format.
  if (parsedTasks) {  
      tasks = parsedTasks;
  } else {
      tasks = [];
  }
  renderTasks(); // Call the renderTasks function to display the loaded tasks
}


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
    saveToLocalStorage(); // Update localStorage
    // Render the updated tasks
    renderTasks();
    // Clear the input field
    taskInput.value = "";
  }
}

// Function to render tasks
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach(function (task, index) {
    // Create a list item element for each task
    var listItem = document.createElement("li");
    listItem.classList.add("task-item");

    // Create checkbox element for toggling task completion
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", function () {
      toggleTaskCompletion(index);
      saveToLocalStorage(); // Update localStorage
    });
    checkbox.classList.add("checkbox");

     // Add completed class if task is marked as completed
      if (task.completed) {
      listItem.classList.add("completed");
    }

    // Create edit button for editing task
    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.addEventListener("click", function () {
      editTask(index);
      saveToLocalStorage(); // Update localStorage
    });
    editButton.classList.add("edit-button");

    // Create delete button for deleting task
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", function () {
      deleteTask(index);
      saveToLocalStorage(); // Update localStorage
    });
    deleteButton.classList.add("delete-button");

    // Append checkbox, edit button, and delete button to the list item
    listItem.appendChild(checkbox);
    listItem.appendChild(document.createTextNode(task.text));
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
  saveToLocalStorage(); // Update localStorage
}

// Function to edit a task
function editTask(index) {
  // Prompt the user to enter a new task description
  const newTaskText = prompt(
    "Enter a new task description:",
    tasks[index].text
  );

  if (newTaskText !== null) {
    // Update the task text with the new description
    tasks[index].text = newTaskText;
    // Render the updated tasks
    renderTasks();
  }
  saveToLocalStorage(); // Update localStorage
}

// Function to delete a task
function deleteTask(index) {
  const confirmation = confirm("Are you sure you want to delete this Task?"); // adding a confirmation prompt
    if (confirmation) {
  // Remove the task from the tasks array
  tasks.splice(index, 1);
  // Render the updated tasks
  renderTasks();
}
saveToLocalStorage(); // Update localStorage
}

// Get the container element where the sorting buttons will be appended
const sortingContainer = document.querySelector(".inputgroup");

// Create the sorting buttons
const sortByCompletionButton = document.createElement("button");
sortByCompletionButton.textContent = "Sort";
sortByCompletionButton.title = "Sort by Status" // set the tooltips
sortByCompletionButton.addEventListener("click", function() {
  sortTasksByCompletion();
  renderTasks();
  saveToLocalStorage(); // Update localStorage
});
sortByCompletionButton.classList.add("sortByCompletion-button");

const sortByNameButton = document.createElement("button");
sortByNameButton.textContent = "Sort";
sortByNameButton.title = "Sort by Name" // set the tooltips
sortByNameButton.addEventListener("click", function() {
  sortTasksByName();
  renderTasks();
  saveToLocalStorage(); // Update localStora
});
sortByNameButton.classList.add("sortByName-button");

// Append the sorting buttons to the container
sortingContainer.appendChild(sortByCompletionButton);
sortingContainer.appendChild(sortByNameButton);

// Implementing the sorting functions

function sortTasksByCompletion() { //This function sorts the tasks based on their completion status.
    tasks.sort(function(a, b) {
      // Sort completed tasks first, then incomplete tasks
        if (a.completed && !b.completed) {
        return -1; //  indicating that a should come before b in the sorted order.
        } else if (!a.completed && b.completed) {
        return 1; //this indicates that a should come after b in the sorted order.
        } else {
        return 0; // this indicates  that their order should not be changed.
        }
    });
    saveToLocalStorage(); // Update localStora
}

function sortTasksByName() {
    tasks.sort(function(a, b) {
      // Convert task names to lowercase for case-insensitive sorting
      const taskA = a.text.toLowerCase();
      const taskB = b.text.toLowerCase();
  
        if (taskA < taskB) {
        return -1;
        } else if (taskA > taskB) {
        return 1;
        } else {
        return 0;
        }
    });
    saveToLocalStorage(); // Update localStorage 
  }
  

// Initial rendering of tasks
// renderTasks();