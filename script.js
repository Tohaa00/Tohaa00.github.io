// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
        var div = this.parentElement;
        div.style.display = "none";
    }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function (ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
    }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("myInput").value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '') {
        alert("You must write something!");
    } else {
        document.getElementById("myUL").appendChild(li);
    }
    document.getElementById("myInput").value = "";

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    for (i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            var div = this.parentElement;
            div.style.display = "none";
        }
    }
}
// Завантаження списку із LocalStorage
function loadTasks() {
    var savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        var tasks = JSON.parse(savedTasks);
        tasks.forEach(function (task) {
            addTaskToList(task.text, task.checked);
        });
    }
}

// Збереження списку у LocalStorage
function saveTasks() {
    var tasks = [];
    var listItems = document.querySelectorAll("li");
    listItems.forEach(function (item) {
        tasks.push({
            text: item.textContent.replace("×", "").trim(),
            checked: item.classList.contains("checked")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Додавання нового елемента в список
function addTaskToList(text, isChecked) {
    var li = document.createElement("li");
    li.textContent = text;

    if (isChecked) {
        li.classList.add("checked");
    }

    var closeButton = document.createElement("span");
    closeButton.textContent = "×";
    closeButton.className = "close";
    li.appendChild(closeButton);

    closeButton.onclick = function (event) {
        event.stopPropagation(); // Запобігаємо закреслюванню при натисканні на "×"
        li.remove();
        saveTasks();
    };

    li.onclick = function () {
        li.classList.toggle("checked");
        saveTasks();
    };

    document.getElementById("myUL").appendChild(li);
    saveTasks();
}

// Додавання завдання через кнопку
function newElement() {
    var input = document.getElementById("myInput");
    if (input.value === "") {
        alert("You must write something!");
    } else {
        addTaskToList(input.value, false);
        input.value = "";
    }
}

// Завантаження завдань при завантаженні сторінки
loadTasks();
