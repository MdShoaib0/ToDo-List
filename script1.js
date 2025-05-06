// -------------------- DOM Elements --------------------
const inputField = document.getElementById("INPUT");
const textArea = document.getElementById("description");
const item = document.getElementById("TaskItem");
const Categories = document.getElementById("Categories");
const categoryFilters = document.querySelectorAll(".cat");

// -------------------- Global Variables --------------------
let taskList = []; // Array to store all tasks

// -------------------- Load Tasks from localStorage on Page Load --------------------
window.onload = function () {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        taskList = JSON.parse(savedTasks);
        renderAllTasks(); // Render all tasks with correct numbering
    }
};

// -------------------- Save Tasks to localStorage --------------------
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(taskList));
}

// -------------------- Render All Tasks with Dynamic Index --------------------
function renderAllTasks() {
    item.innerHTML = ""; // Clear the task container
    taskList.forEach((task, index) => {
        renderTask(task, index);
    });
}

// -------------------- Create Task Handler --------------------
function CreateTask(event) {
    event.preventDefault();

    const Title = inputField.value.trim();
    const descriptions = textArea.value.trim();
    const Categorie = Categories.value;

    if (!Title || !descriptions || !Categorie) {
        alert("Please fill in all fields");
        return;
    }

    const newTask = {
        id: Date.now(), // Unique identifier
        title: Title,
        description: descriptions,
        category: Categorie,
        completed: false
    };

    taskList.push(newTask);
    saveTasks();
    renderAllTasks(); // Re-render all to update numbering

    // Clear the form fields
    inputField.value = "";
    textArea.value = "";
    Categories.value = "";
}

// -------------------- Render Individual Task --------------------
function renderTask(task, index) {
    const taskCard = document.createElement("div");
    taskCard.className = `TaskCard ${task.category}`;
    taskCard.setAttribute("data-id", task.id);

    // Task Title
    const titleEl = document.createElement("p");
    titleEl.className = "TitleTask";
    titleEl.textContent = `${index + 1}. ${task.title}`;
    titleEl.style.fontSize = "1.3rem";
    titleEl.style.fontWeight = "600";

    // Task Category
    const categoryEl = document.createElement("p");
    categoryEl.className = "list2";
    categoryEl.textContent = task.category;

    // Task Description
    const descEl = document.createElement("p");
    descEl.className = "list3";
    descEl.textContent = task.description;
    descEl.style.paddingTop = "1.4rem";
    descEl.style.fontSize = "0.9rem";
    descEl.style.opacity = "0.8";

    // Button Container
    const buttonContainer = document.createElement("div");
    buttonContainer.className = "BtnCard";

    // Delete Button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "deletebtn";
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = function () {
        taskList = taskList.filter(t => t.id !== task.id);
        saveTasks();
        renderAllTasks(); // Refresh all tasks to maintain numbering
    };

    // Complete Button
    const completeBtn = document.createElement("button");
    completeBtn.className = "completebtn";
    completeBtn.textContent = "Complete";
    completeBtn.onclick = function () {
        task.completed = true;
        taskCard.style.opacity = "0.6";
        titleEl.style.textDecoration = "line-through";
        saveTasks();
    };

    // Append buttons to container
    buttonContainer.appendChild(deleteBtn);
    buttonContainer.appendChild(completeBtn);

    // Assemble task card
    taskCard.appendChild(titleEl);
    taskCard.appendChild(categoryEl);
    taskCard.appendChild(descEl);
    taskCard.appendChild(buttonContainer);

    // Add task to task list container
    item.appendChild(taskCard);
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


// Input elements animation with stagger
gsap.from(".input", {
    y: 35,
    duration: 1,
    stagger: -0.1,
    scrollTrigger: {
        trigger: ".input",   // Trigger on elements with the class "input"
        scroller: "body",    // Scrolling the whole page
        // markers: true,       // Show markers for debugging
        start: "top 80%",    // Start the animation when the top of the element hits 80% of the viewport
        end: "bottom top",   // End when the bottom of the element hits the top of the viewport
        scrub: 2             // Smooth scroll animation
    }
});

// Quote element animation
gsap.from(".quote", {
    x: 100,
    duration: 1,
    scrollTrigger: {
        trigger: ".quote",   // Trigger on elements with the class "quote"
        scroller: "body",    // Scrolling the whole page
        // markers: true,       // Show markers for debugging
        start: "top 80%",    // Start the animation when the top of the element hits 80% of the viewport
        end: "bottom top",   // End when the bottom of the element hits the top of the viewport
        scrub: 2             // Smooth scroll animation
    }
});

// H1 element animation (fading in from above)
gsap.from("h1", {
    y: -35,
    duration: 1,
    opacity: 0,
    scrollTrigger: {
        trigger: "h1",      // Trigger on the h1 element
        scroller: "body",   // Scrolling the whole page
        // markers: true,      // Show markers for debugging
        start: "top 80%",   // Start the animation when the top of the element hits 80% of the viewport
        end: "bottom top",  // End when the bottom of the element hits the top of the viewport
        scrub: 2            // Smooth scroll animation
    }
});

// Cat element animation
gsap.from(".cat", {
    y: 35,
    duration: 1,
    scrollTrigger: {
        trigger: ".cat",    // Trigger on elements with the class "cat"
        scroller: "body",   // Scrolling the whole page
        // markers: true,      // Show markers for debugging
        start: "top 80%",   // Start the animation when the top of the element hits 80% of the viewport
        end: "bottom top",  // End when the bottom of the element hits the top of the viewport
        scrub: 2            // Smooth scroll animation
    }
});

// Anchor (link) animation
gsap.from("a", {
    y: -35,
    duration: 1,
    scrollTrigger: {
        trigger: "a",       // Trigger on all anchor tags
        scroller: "body",   // Scrolling the whole page
        // markers: true,      // Show markers for debugging
        start: "top 80%",   // Start the animation when the top of the element hits 80% of the viewport
        end: "bottom top",  // End when the bottom of the element hits the top of the viewport
        scrub: 2            // Smooth scroll animation
    }
});

// Task Item animation
gsap.from("#TaskItem", {
    y: 35,
    duration: 1,
    scrollTrigger: {
        trigger: "#TaskItem",   // Trigger on element with the ID "TaskItem"
        scroller: "body",       // Scrolling the whole page
        // markers: true,          // Show markers for debugging
        start: "top 80%",       // Start the animation when the top of the element hits 80% of the viewport
        end: "bottom top",      // End when the bottom of the element hits the top of the viewport
        scrub: 2                // Smooth scroll animation
    }
});

// Button animation
gsap.from(".btn", {
    y: 35,
    duration: 1,
    scrollTrigger: {
        trigger: ".btn",     // Trigger on elements with the class "btn"
        scroller: "body",    // Scrolling the whole page
        // markers: true,       // Show markers for debugging
        start: "top 80%",    // Start the animation when the top of the element hits 80% of the viewport
        end: "bottom top",   // End when the bottom of the element hits the top of the viewport
        scrub: 2             // Smooth scroll animation
    }
});
