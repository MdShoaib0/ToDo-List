// -------------------- DOM Elements --------------------
const inputField = document.getElementById("INPUT");
const textArea = document.getElementById("description");
const taskContainer = document.getElementById("TaskItem");
const categorySelect = document.getElementById("Categories");
const categoryFilters = document.querySelectorAll(".cat");
const submitBtn = document.querySelector(".btn");
const form = document.querySelector("form"); // Assuming you have a form element

// -------------------- Configuration --------------------
const URL_ServerSide = "https://todo-list-backend-n5kz.onrender.com/tasks";

// -------------------- Global Variables --------------------
let taskList = []; // Array to store all tasks
let isEditing = false;
let currentEditId = null;

// -------------------- Event Listeners --------------------
document.addEventListener("DOMContentLoaded", initializeApp);
form.addEventListener("submit", handleTaskSubmission);
categoryFilters.forEach(button => {
    button.addEventListener("click", () => filterTasksByCategory(button.id));
});

// -------------------- Initialization --------------------
async function initializeApp() {
    await fetchTasksFromBackend();
    renderAllTasks();
    setupAnimations();
}

// -------------------- Animation Setup --------------------
function setupAnimations() {
    gsap.registerPlugin(ScrollTrigger);
    
    const tl = gsap.timeline();
    
    tl.from(".heading", {
        y: -50,
        duration: 0.6,
        opacity: 0,
        ease: "power3.out",
    })
    .from(".quote", {
        x: 250,
        duration: 0.8,
        opacity: 0,
        ease: "back.out(1.7)",
    })
    .from(".input", {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
    })
    .add("cat")
    .from(".left", {
        x: -100,
        opacity: 0,
        duration: 0.7,
        stagger: 0.3,
        ease: "power3.out"
    }, "cat")
    .from(".right", {
        x: 100,
        opacity: 0,
        duration: 0.7,
        stagger: 0.3,
        ease: "power3.out"
    }, "cat");

    const tl2 = gsap.timeline({ delay: 3.7 });
    tl2.from("#TaskItem", {
        y: 35,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out"
    })
    .from(".TitleTask", {
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 0.7,
        ease: "power3.out"
    }, "-=0.7");
}

// -------------------- API Functions --------------------
async function fetchTasksFromBackend() {
    try {
        const response = await fetch(URL_ServerSide);
        if (!response.ok) throw new Error("Failed to fetch tasks");
        taskList = await response.json();
    } catch (error) {
        console.error("Error fetching tasks:", error);
        showAlert("Failed to load tasks. Please try again later.", "error");
    }
}

async function sendTaskToBackend(task) {
    try {
        const response = await fetch(URL_ServerSide, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        });
        
        if (!response.ok) throw new Error("Failed to save task");
        return await response.json();
    } catch (error) {
        console.error("Error sending task:", error);
        showAlert("Failed to save task. Please try again.", "error");
        throw error;
    }
}

async function updateTaskInBackend(task, id) {
    try {
        const response = await fetch(`${URL_ServerSide}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        });
        
        if (!response.ok) throw new Error("Failed to update task");
        return await response.json();
    } catch (error) {
        console.error("Error updating task:", error);
        showAlert("Failed to update task. Please try again.", "error");
        throw error;
    }
}

async function deleteTaskFromBackend(id) {
    try {
        const response = await fetch(`${URL_ServerSide}/${id}`, {
            method: "DELETE"
        });
        
        if (!response.ok) throw new Error("Failed to delete task");
    } catch (error) {
        console.error("Error deleting task:", error);
        showAlert("Failed to delete task. Please try again.", "error");
        throw error;
    }
}

// -------------------- Task Management --------------------
async function handleTaskSubmission(event) {
    event.preventDefault();
    
    const title = inputField.value.trim();
    const description = textArea.value.trim();
    const category = categorySelect.value;

    if (!title || !description || !category) {
        showAlert("Please fill in all fields", "warning");
        return;
    }

    const taskData = {
        title,
        description,
        category,
        completed: false
    };

    try {
        if (isEditing) {
            taskData.id = currentEditId;
            const updatedTask = await updateTaskInBackend(taskData, currentEditId);
            taskList = taskList.map(task => task.id === currentEditId ? updatedTask : task);
            showAlert("Task updated successfully!", "success");
        } else {
            taskData.id = Date.now();
            const newTask = await sendTaskToBackend(taskData);
            taskList.push(newTask);
            showAlert("Task added successfully!", "success");
        }

        resetForm();
        renderAllTasks();
    } catch (error) {
        // Error handling already done in API functions
    }
}

function resetForm() {
    inputField.value = "";
    textArea.value = "";
    categorySelect.value = "";
    submitBtn.textContent = "Add Task";
    isEditing = false;
    currentEditId = null;
}

function renderAllTasks() {
    taskContainer.innerHTML = "";
    
    if (taskList.length === 0) {
        taskContainer.innerHTML = '<p class="empty-message">No tasks found. Add a new task!</p>';
        return;
    }

    taskList.forEach((task, index) => {
        renderTask(task, index);
    });
}

function renderTask(task, index) {
    const taskCard = document.createElement("div");
    taskCard.className = `TaskCard ${task.category}`;
    taskCard.dataset.id = task.id;
    if (task.completed) {
        taskCard.classList.add("completed");
    }

    taskCard.innerHTML = `
        <p class="TitleTask" style="font-size: 1.3rem; font-weight: 700;">
            ${index + 1}. ${task.title}
        </p>
        <p class="list2 TitleTask">${task.category}</p>
        <p class="list3 TitleTask" style="padding-top: 3rem; font-size: 0.9rem;">
            ${task.description}
        </p>
        <div class="BtnCard">
            <button class="completebtn TitleTask">Complete</button>
            <button class="editbtn TitleTask">Edit</button>
            <button class="deletebtn TitleTask">Delete</button>
        </div>
    `;

    const completeBtn = taskCard.querySelector(".completebtn");
    const editBtn = taskCard.querySelector(".editbtn");
    const deleteBtn = taskCard.querySelector(".deletebtn");

    completeBtn.addEventListener("click", () => toggleTaskCompletion(task.id));
    editBtn.addEventListener("click", () => prepareTaskEdit(task));
    deleteBtn.addEventListener("click", () => deleteTask(task.id));

    taskContainer.appendChild(taskCard);
}

async function toggleTaskCompletion(taskId) {
    try {
        const task = taskList.find(t => t.id === taskId);
        if (!task) return;

        const updatedTask = { ...task, completed: !task.completed };
        const result = await updateTaskInBackend(updatedTask, taskId);
        
        taskList = taskList.map(t => t.id === taskId ? result : t);
        renderAllTasks();
    } catch (error) {
        console.error("Error toggling task completion:", error);
    }
}

function prepareTaskEdit(task) {
    inputField.value = task.title;
    categorySelect.value = task.category;
    textArea.value = task.description;
    submitBtn.textContent = "Update Task";
    isEditing = true;
    currentEditId = task.id;
    inputField.focus();
}

async function deleteTask(taskId) {
    if (!confirm("Are you sure you want to delete this task?")) return;
    
    try {
        await deleteTaskFromBackend(taskId);
        taskList = taskList.filter(t => t.id !== taskId);
        renderAllTasks();
        showAlert("Task deleted successfully!", "success");
    } catch (error) {
        console.error("Error deleting task:", error);
    }
}

// -------------------- Utility Functions --------------------
function filterTasksByCategory(selectedCategory) {
    const taskCards = document.querySelectorAll(".TaskCard");
    
    taskCards.forEach(task => {
        if (selectedCategory === "All" || task.classList.contains(selectedCategory)) {
            task.style.display = "block";
        } else {
            task.style.display = "none";
        }
    });
}

function showAlert(message, type) {
    // Implement your alert system here
    // Could be a toast notification, modal, or simple alert
    alert(`${type.toUpperCase()}: ${message}`);
}