// -------------------- DOM Elements --------------------
const inputField = document.getElementById("INPUT");
const textArea = document.getElementById("description");
const item = document.getElementById("TaskItem");
const Categories = document.getElementById("Categories");
const categoryFilters = document.querySelectorAll(".cat");

// -------------------- Global Variables --------------------
let taskList = []; // Array to store all tasks

// -------------------- Load Tasks from localStorage --------------------
document.addEventListener("DOMContentLoaded", function () {
    // Load tasks from localStorage
    const storedTasks = localStorage.getItem("taskList");
    if (storedTasks) {
        taskList = JSON.parse(storedTasks);
        renderAllTasks();
    }

    // GSAP animations...
    gsap.registerPlugin(ScrollTrigger);

    // Create a Timeline for smoother animation
    const tl = gsap.timeline({
        defaults: {
            duration: 1,
            ease: "power1.out",  // Added ease for smoothness
        }
    });

    // Animate ".input"
    gsap.utils.toArray(".input").forEach(el => {
        tl.from(el, {
            y: 50,
            scrollTrigger: {
                trigger: el,
                start: "top 40%",
                end: "bottom top",
                scrub: 1,
                toggleActions: "play reverse play reverse", // Enable reverse and forward toggle
            }
        });
    });

    // Animate ".quote"
    gsap.utils.toArray(".quote").forEach(el => {
        tl.to(el, {
            x: 70,
            scrollTrigger: {
                trigger: el,
                start: "top 10%",
                end: "bottom 5%",
                scrub: 1,
                toggleActions: "play reverse play reverse",
            }
        });
    });

    // Animate "h1"
    gsap.utils.toArray("h1").forEach(el => {
        tl.to(el, {
            y: -35,
            scrollTrigger: {
                trigger: el,
                start: "top top",
                end: "bottom 10%",
                scrub: 1,
                toggleActions: "play reverse play reverse",
            }
        });
    });

    // Animate ".cat"
    gsap.utils.toArray(".cat").forEach(el => {
        tl.from(el, {
            y: 50,
            scrollTrigger: {
                trigger: el,
                start: "top 70%",
                end: "bottom 30%",
                scrub: 1,
                toggleActions: "play reverse play reverse",
            }
        });
    });

    // Animate "a"
    gsap.utils.toArray("a").forEach(el => {
        tl.from(el, {
            y: 50,
            scrollTrigger: {
                trigger: el,
                start: "top 80%",
                end: "bottom top",
                scrub: 1,
                toggleActions: "play reverse play reverse",
            }
        });
    });

    // Animate "#TaskItem"
    gsap.from("#TaskItem", {
        y: 50,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
            trigger: "#TaskItem",
            start: "top 100%",
            end: "bottom 80%",
            scrub: 1,
            toggleActions: "play reverse play reverse", // Forward and reverse toggle
        }
    });

    // Animate ".btn"
    gsap.utils.toArray(".btn").forEach(el => {
        tl.from(el, {
            y: 50,
            scrollTrigger: {
                trigger: el,
                start: "top 60%",
                end: "bottom 30%",
                scrub: 1,
                toggleActions: "play reverse play reverse", // Forward and reverse toggle
            }
        });
    });
});


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
    localStorage.setItem("taskList", JSON.stringify(taskList)); // Save to localStorage
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

    const titleEl = document.createElement("p");
    titleEl.className = "TitleTask";
    titleEl.textContent = `${index + 1}. ${task.title}`;
    titleEl.style.fontSize = "1.3rem";
    titleEl.style.fontWeight = "700";

    const categoryEl = document.createElement("p");
    categoryEl.className = "list2";
    categoryEl.textContent = task.category;

    const descEl = document.createElement("p");
    descEl.className = "list3";
    descEl.textContent = task.description;
    descEl.style.paddingTop = "1.4rem";
    descEl.style.fontSize = "0.9rem";
    descEl.style.opacity = "0.8";

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "BtnCard";

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "deletebtn";
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = function () {
        taskList = taskList.filter(t => t.id !== task.id);
        localStorage.setItem("taskList", JSON.stringify(taskList)); // Save to localStorage
        renderAllTasks();
    };

    const completeBtn = document.createElement("button");
    completeBtn.className = "completebtn";
    completeBtn.textContent = "Complete";
    completeBtn.onclick = function () {
        task.completed = true;
        localStorage.setItem("taskList", JSON.stringify(taskList)); // Save to localStorage
        taskCard.style.opacity = "0.6";
        titleEl.style.textDecoration = "line-through";
    };

    buttonContainer.appendChild(deleteBtn);
    buttonContainer.appendChild(completeBtn);

    taskCard.appendChild(titleEl);
    taskCard.appendChild(categoryEl);
    taskCard.appendChild(descEl);
    taskCard.appendChild(buttonContainer);

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
