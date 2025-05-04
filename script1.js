// Get DOM elements
const inputField = document.getElementById("INPUT");
const textArea = document.getElementById("description");
const item = document.getElementById("TaskItem");
const Categories = document.getElementById("Categories");

let taskNumber = 0;
let arr = [];

// Main function to create a task card
function CreateTask(event) {
    event.preventDefault();

    taskNumber++;
    console.log(taskNumber);

    // Get input values
    const Title = inputField.value.trim();
    const descriptions = textArea.value.trim();
    const Categorie = Categories.value;

    // Input validation
    if (!Title || !descriptions || !Categorie) {
        alert("Please fill in all fields");
        return;
    }

    // -------------------- Create Elements --------------------

    // Parent Task Card
    const taskCard = document.createElement("div");
    taskCard.className = "TaskCard";

    // Task Title
    const titleEl = document.createElement("p");
    titleEl.className = "TitleTask";
    titleEl.textContent = `${taskNumber}. ${Title}`;
    titleEl.style.fontSize = "1.3rem";
    titleEl.style.fontWeight = "600";

    // Task Category
    const categoryEl = document.createElement("p");
    categoryEl.className = "list2";
    categoryEl.textContent = Categorie;

    // Task Description
    const descEl = document.createElement("p");
    descEl.className = "list3";
    descEl.textContent = descriptions;
    descEl.style.paddingTop = "1.4rem";
    descEl.style.fontSize = "0.8rem"
    descEl.style.opacity = "0.7";

    // -------------------- Buttons Section --------------------

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "BtnCard";

    // Delete Button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "deletebtn";
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = function () {
        item.removeChild(taskCard);
        taskNumber--;
    };

    // Complete Button
    const completeBtn = document.createElement("button");
    completeBtn.className = "completebtn";
    completeBtn.textContent = "Complete";
    completeBtn.onclick = function () {
        taskCard.style.opacity = "0.6";
        titleEl.style.textDecoration = "line-through";
    };

    // Append buttons to their container
    buttonContainer.appendChild(deleteBtn);
    buttonContainer.appendChild(completeBtn);

    // -------------------- Append All Elements --------------------

    taskCard.appendChild(titleEl);
    taskCard.appendChild(categoryEl);
    taskCard.appendChild(descEl);
    taskCard.appendChild(buttonContainer);
    item.appendChild(taskCard);

    // -------------------- Reset Form --------------------

    inputField.value = "";
    textArea.value = "";
    Categories.value = "";
}
