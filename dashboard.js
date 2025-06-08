function allowDrop(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("text/plain");
    const task = document.getElementById(taskId);
    const dropZone = e.target.closest(".card-list");
    if (dropZone && dropZone !== task.parentElement) {
        dropZone.appendChild(task);
        if (!task.querySelector('.tag-menu-btn')) {
            addTagMenu(task);
        }
    }
}

function drag(e) {
    e.dataTransfer.setData("text/plain", e.target.id);
}

let taskCounter = 0;

const form = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskContainer = document.getElementById("new-tasks");

form.addEventListener("submit", function (e) {
    e.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        const task = createTaskCard(taskText);
        taskContainer.appendChild(task);
        taskInput.value = "";
    }
});

function createTaskCard(text) {
    const card = document.createElement("div");
    card.className = "task-card";
    card.id = `task-${taskCounter++}`;
    card.setAttribute("draggable", "true");
    card.addEventListener("dragstart", drag);

    const content = document.createElement("div");
    content.className = "task-content";
    content.textContent = text;
    card.appendChild(content);

    addTagMenu(card);
    return card;
}

function addTagMenu(task) {
    const menuBtn = document.createElement("button");
    menuBtn.className = "tag-menu-btn";
    menuBtn.innerHTML = "&#8942;"; // ⋯

    const menu = document.createElement("div");
    menu.className = "tag-menu"; // ✅ Classe corrigée ici

    const tags = [
        { letter: "L", class: "red" },
        { letter: "T", class: "blue" },
        { letter: "Q", class: "yellow" }
    ];

    const labelsContainer = document.createElement("div");
    labelsContainer.className = "task-labels";
    task.appendChild(labelsContainer);

    tags.forEach(tag => {
        const icon = document.createElement("div");
        icon.className = `option-icon ${tag.class}`;
        icon.textContent = tag.letter;

        icon.addEventListener("click", (e) => {
    e.stopPropagation();
    if ([...labelsContainer.children].some(child => child.textContent === tag.letter)) return;

    const tagClone = document.createElement("div");
    tagClone.className = `task-label ${tag.class}`;
    tagClone.textContent = tag.letter;

    tagClone.addEventListener("click", () => {
        labelsContainer.removeChild(tagClone);
        icon.style.display = 'flex';
    });

    labelsContainer.appendChild(tagClone);
    icon.style.display = 'none';

    // ✅ Fermer le menu après avoir cliqué
    menu.classList.remove("show");
});


        menu.appendChild(icon);
    });

    menuBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        document.querySelectorAll(".tag-menu").forEach(m => m.classList.remove("show"));
        menu.classList.toggle("show");
    });

    document.addEventListener("click", () => {
        document.querySelectorAll(".tag-menu").forEach(m => m.classList.remove("show"));
    });

    task.appendChild(menuBtn);
    task.appendChild(menu);
}
