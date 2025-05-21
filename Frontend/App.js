// -------------------- DOM Elements --------------------
const inputField = document.getElementById("INPUT");
const textArea = document.getElementById("description");
const item = document.getElementById("TaskItem");
const Categories = document.getElementById("Categories");
const categoryFilters = document.querySelectorAll(".cat");
const submitBtn = document.querySelector(".btn");

// -------------------- Global Variables --------------------
let taskList = []; // Array to store all tasks

// -------------------- Load Tasks from Backend --------------------
document.addEventListener("DOMContentLoaded", async function () {
    await fetchTasksFromBackend(); // Get data from backend
    renderAllTasks();

    gsap.registerPlugin(ScrollTrigger);
    let tl = gsap.timeline();

    tl.from(".heading", {
        y: -50,
        duration: 0.6,
        opacity: 0,
        ease: "power3.out",
    });

    tl.from(".quote", {
        x: 250,
        duration: 0.8,
        opacity: 0,
        ease: "back.out(1.7)",
    });

    tl.from(".input", {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
    });

    tl.add("cat");

    tl.from(".left", {
        x: -100,
        opacity: 0,
        duration: 0.7,
        stagger: 0.3,
        ease: "power3.out"
    }, "cat");

    tl.from(".right", {
        x: 100,
        opacity: 0,
        duration: 0.7,
        stagger: 0.3,
        ease: "power3.out"
    }, "cat");

    let tl2 = gsap.timeline({
        delay: 3.7
    });

    tl2.from("#TaskItem", {
        y: 35,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out"
    })

    tl2.from(".TitleTask", {
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 0.7,
        ease: "power3.out"
    }, "-=0.7")
});

// -------------------- Fetch Tasks from Backend --------------------
async function fetchTasksFromBackend() {
    try {
        const response = await fetch("http://localhost:5000/tasks");
        if (!response.ok) throw new Error("Failed to fetch tasks");
        taskList = await response.json();
    } catch (error) {
        console.error("Error fetching tasks:", error);
    }
}

// -------------------- Send Task to Backend --------------------
async function sendTaskToBackend(task) {
    try {
        const response = await fetch("http://localhost:5000/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        });
        if (!response.ok) throw new Error("Failed to save task");
    } catch (error) {
        console.error("Error sending task:", error);
    }
}

// -------------------- Render All Tasks --------------------
function renderAllTasks() {
    item.innerHTML = ""; // Clear the task container
    taskList.forEach((task, index) => {
        renderTask(task, index);
    });
}

// -------------------- Create Task Handler --------------------
async function CreateTask(event) {
    event.preventDefault();
    submitBtn.textContent = "Add Task";

    const Title = inputField.value.trim();
    const descriptions = textArea.value.trim();
    const Categorie = Categories.value;

    if (!Title || !descriptions || !Categorie) {
        alert("Please fill in all fields");
        return;
    }

    const newTask = {
        id: Date.now(),
        title: Title,
        description: descriptions,
        category: Categorie,
        completed: false
    };

    taskList.push(newTask);
    await sendTaskToBackend(newTask); // Send to backend
    renderAllTasks();

    inputField.value = "";
    textArea.value = "";
    Categories.value = "";
}

// -------------------- Render Individual Task --------------------
function renderTask(task, index) {
    const taskCard = document.createElement("div");
    taskCard.className = `TaskCard ${task.category}`;
    taskCard.setAttribute("data-id", task.id);

    const titleEl = document.createElement("p");
    titleEl.className = "TitleTask";
    titleEl.textContent = `${index + 1}. ${task.title}`;
    titleEl.style.fontSize = "1.3rem";
    titleEl.style.fontWeight = "700";

    const categoryEl = document.createElement("p");
    categoryEl.className = "list2 TitleTask";
    categoryEl.textContent = task.category;

    const descEl = document.createElement("p");
    descEl.className = "list3 TitleTask";
    descEl.textContent = task.description;
    descEl.style.paddingTop = "2.5rem";
    descEl.style.fontSize = "0.9rem";

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "BtnCard";

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "deletebtn TitleTask";
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = async function () {
        taskList = taskList.filter(t => t.id !== task.id);
        await deleteTaskFromBackend(task.id);
        renderAllTasks();
    };

    const completeBtn = document.createElement("button");
    completeBtn.className = "completebtn TitleTask";
    completeBtn.textContent = "Complete";
    completeBtn.onclick = function () {
        task.completed = true;
        taskCard.style.opacity = "0.6";
        titleEl.style.textDecoration = "line-through";
    };

    const editBtn = document.createElement("button");
    editBtn.className = "editbtn TitleTask";
    editBtn.textContent = "Edit";
    editBtn.onclick = function () {
        inputField.value = task.title;
        Categories.value = task.category;
        textArea.value = task.description;
        submitBtn.textContent = "Update Task";
    };

    buttonContainer.appendChild(completeBtn);
    buttonContainer.appendChild(editBtn);
    buttonContainer.appendChild(deleteBtn);

    taskCard.appendChild(titleEl);
    taskCard.appendChild(categoryEl);
    taskCard.appendChild(descEl);
    taskCard.appendChild(buttonContainer);

    item.appendChild(taskCard);
}

// -------------------- Delete Task from Backend --------------------
async function deleteTaskFromBackend(id) {
    try {
        const response = await fetch(`http://localhost:5000/tasks/${id}`, {
            method: "DELETE"
        });
        if (!response.ok) throw new Error("Failed to delete task");
    } catch (error) {
        console.error("Error deleting task:", error);
    }
}

// -------------------- Category Filter Logic --------------------
categoryFilters.forEach(button => {
    button.addEventListener("click", () => {
        const selectedCategory = button.id;
        const allTasks = document.querySelectorAll(".TaskCard");

        allTasks.forEach(task => {
            if (selectedCategory === "All" || task.classList.contains(selectedCategory)) {
                task.style.display = "block";
            } else {
                task.style.display = "none";
            }
        });
    });
});