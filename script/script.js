const words = "words";

const saveListState = () => {
    const items = [];
    const listItems = document.querySelectorAll('ul#myUL li');

    listItems.forEach(item => {
        items.push({
            text: item.textContent.replace("\u00D7", "").trim(), 
            checked: item.classList.contains('checked'),
            removed: item.style.display === "none" 
        });
    });

    localStorage.setItem(words, JSON.stringify(items));
};

const loadListState = () => {
    const savedItems = JSON.parse(localStorage.getItem(words)) || [];
    const ul = document.getElementById("myUL");
    ul.innerHTML = '';

    savedItems.forEach(item => {
        if (!item.removed) { 
            const li = document.createElement("li");
            li.textContent = item.text; 

            if (item.checked) {
                li.classList.add('checked');
            }

            const span = document.createElement("SPAN");
            const txt = document.createTextNode("\u00D7");
            span.className = "close";
            span.appendChild(txt);
            li.appendChild(span);

            span.onclick = function () {
                const div = this.parentElement;
                div.style.display = "none"; 
                saveListState(); 
            };

            ul.appendChild(li);
        }
    });
};


function newElement() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("myInput").value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);

    if (inputValue === '') {
        alert("You must write something!");
    } else {
        document.getElementById("myUL").appendChild(li);
        saveListState(); 
    }

    document.getElementById("myInput").value = "";

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    span.onclick = function () {
        var div = this.parentElement;
        div.style.display = "none"; 
        saveListState(); 
    };
}

var list = document.querySelector('ul');
list.addEventListener('click', function (ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
        saveListState(); 
    }
}, false);

// Завантажити список при завантаженні сторінки
window.onload = loadListState;

