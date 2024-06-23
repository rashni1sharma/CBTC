// Your JavaScript code goes here
document.addEventListener('DOMContentLoaded', function() {
    var todoForm = document.getElementById('todo-form');
    var todoInput = document.getElementById('todo-input');
    var todoList = document.getElementById('todo-list');
    var todoCount = document.getElementById('todo-count'); // Removed duplicate declaration

    var clearCompleted = document.getElementById('clear-completed');

    // Load the todo list from local storage
    if (localStorage.getItem('todoList')) {
        todoList.innerHTML = localStorage.getItem('todoList');
    }

    // Save the todo list to local storage
    function saveTodoList() {
        localStorage.setItem('todoList', todoList.innerHTML);
    }

    // Update the task count
    function updateCount() {
        todoCount.textContent = todoList.children.length;
    }

    // Add a new task
    todoForm.addEventListener('submit', function(e) {
        e.preventDefault();

        var newTask = document.createElement('li');
        newTask.innerHTML = `
            <span class="todo-item">${todoInput.value}</span>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        `;

        todoList.appendChild(newTask);
        todoInput.value = '';

        updateCount();
        saveTodoList();
    });

    // Edit a task
    todoList.addEventListener('click', function(e) {
        if (e.target && e.target.matches('.edit-btn')) {
            var taskText = e.target.parentElement.querySelector('.todo-item');
            var newTaskText = prompt('Enter the new task text:', taskText.textContent);
            if (newTaskText) {
                taskText.textContent = newTaskText;
            }
        }
    });

    // Delete a task
    todoList.addEventListener('click', function(e) {
        if (e.target && e.target.matches('.delete-btn')) {
            e.target.parentElement.remove();
            updateCount();
            saveTodoList(); // Corrected function name
        }
    });

    // Clear all tasks
    clearCompleted.addEventListener('click', function() {
        while (todoList.firstChild) {
            todoList.removeChild(todoList.firstChild);
        }

        updateCount();
        saveTodoList();
    });

    // Mark a task as completed
    todoList.addEventListener('click', function(e) {
        if (e.target && e.target.matches('.todo-item')) {
            e.target.classList.toggle('completed');
            var todoItem = e.target.parentElement;
            var completedDate = new Date();
            var timestamp = document.createElement('span');
            timestamp.textContent = ' Completed on: ' + completedDate.toLocaleString();
            todoItem.appendChild(timestamp);
            saveTodoList();
        }
    });
});