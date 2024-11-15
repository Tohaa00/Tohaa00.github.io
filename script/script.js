const SIZE = 9;

var main_section = document.getElementById("tbl");

for (var i = 1; i <= SIZE; i++) {
    var row = document.createElement("div"); //<div></div>
    row.setAttribute("class", "row"); // diw class="row"></div>

    for (var j = 1; j <= SIZE; j++) {
        var cell = document.createElement("div");
        cell.addEventListener("click", function (e) {
            if (e.target.style.opacity == 0.1) {
                e.target.style.opacity = 1.0;
            }
            else {
                e.target.style.opacity = 0.1;
            }
        }, false)

        cell.addEventListener("dblclick", function (e) {
            e.target.remove();
        })

        var prod = i * j;
        if (prod === 1) {
            cell.innerText = "";
        }
        else {
            cell.innerText = prod;
        }

        var $class = "";
        (i == j) ? $class = "cell cell-main" : $class;
        (i > j) ? $class = "cell cell-umain" : $class;
        (i < j) ? $class = "cell cell-omain" : $class;

        cell.setAttribute("class", $class);

        row.appendChild(cell);
    }
    main_section.appendChild(row);
}