const words = "words";

// Функція для збереження стану списку в localStorage
const saveListState = () => {
    const items = [];
    const listItems = document.querySelectorAll('ul#myUL li');

    listItems.forEach(item => {
        // Зберігаємо текст елемента та інформацію про його статус
        items.push({
            text: item.textContent.replace("\u00D7", "").trim(), // Беремо текст без хрестика
            checked: item.classList.contains('checked'),
            removed: item.style.display === "none" // Чи був елемент видалений
        });
    });

    // Зберігаємо в localStorage
    localStorage.setItem(words, JSON.stringify(items));
};

// Функція для завантаження стану списку з localStorage
const loadListState = () => {
    const savedItems = JSON.parse(localStorage.getItem(words)) || [];
    const ul = document.getElementById("myUL");
    ul.innerHTML = ''; // Очищаємо поточний список

    savedItems.forEach(item => {
        if (!item.removed) { // Якщо елемент не видалений, додаємо його
            const li = document.createElement("li");
            li.textContent = item.text; // Встановлюємо текст елемента

            if (item.checked) {
                li.classList.add('checked');
            }

            // Додаємо хрестик до кожного елемента
            const span = document.createElement("SPAN");
            const txt = document.createTextNode("\u00D7");
            span.className = "close";
            span.appendChild(txt);
            li.appendChild(span);

            // Прив'язуємо подію для хрестика
            span.onclick = function () {
                const div = this.parentElement;
                div.style.display = "none"; // Сховати елемент
                saveListState(); // Оновити стан після видалення
            };

            ul.appendChild(li);
        }
    });
};

// Функція для створення нового елемента
function newElement() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("myInput").value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);

    if (inputValue === '') {
        alert("You must write something!");
    } else {
        document.getElementById("myUL").appendChild(li);
        saveListState(); // Оновлюємо список після додавання
    }

    document.getElementById("myInput").value = "";

    // Додаємо хрестик до нового елемента
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    // Прив'язуємо подію для хрестика
    span.onclick = function () {
        var div = this.parentElement;
        div.style.display = "none"; // Сховати елемент
        saveListState(); // Оновити список після видалення
    };
}

// Клік по елементу списку (відмітка як виконано/не виконано)
var list = document.querySelector('ul');
list.addEventListener('click', function (ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
        saveListState(); // Оновлюємо список після зміни статусу елемента
    }
}, false);

// Завантажити список при завантаженні сторінки
window.onload = loadListState;

