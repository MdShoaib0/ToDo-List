const inputField = document.getElementById("INPUT");
const textArea = document.getElementById("description");
const item = document.getElementById("TaskItem");
const Categories = document.getElementById("Categories");
const btn = document.getElementById("btn");

const arr = [];


function CreateTask(event) {
    event.preventDefault();
    const Title = inputField.value;
    const descriptions = textArea.value;
    const Categorie = Categories.value;
    arr.push(Categorie)

    const div = document.createElement("div");
    div.className = "TaskListItem";

    const div2 = document.createElement("div");
    div2.className = "TaskListItem2";

    const list1 = document.createElement("p");
    list1.className = "TitleTask";
    list1.textContent = Title;
    list1.style.fontSize = "1.4rem"
    arr.push(list1)

    const list2 = document.createElement("p");
    list2.textContent = Categorie;
    list2.className = "list2"
    arr.push(list2)

    const list3 = document.createElement("p");
    list3.className = "list3"
    list3.textContent = descriptions;
    list3.style.paddingTop = "1.5rem"
    arr.push(list3)

    const delet = document.createElement("button");
    delet.className = "deletebtn";
    delet.textContent = "delete";

    const complete = document.createElement("button");
    complete.className = "completebtn";
    complete.textContent = "Complete";

    div2.appendChild(delet);
    div2.appendChild(complete);

    div.appendChild(div2);

    div.appendChild(list1);
    div.appendChild(list2);
    div.appendChild(list3);

    item.appendChild(div);
    // item.appendChild(div2)

}
