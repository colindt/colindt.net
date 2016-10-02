"use strict";


function reroll() {
    var classes = ["colorW", "color1", "color2", "color3", "color4"];

    if (!document.getElementById("white").checked) {
        classes = classes.slice(1);
    }

    var remaining = [];
    for (var i in classes) {
        for (var j = 0; j < 80 / classes.length; j++) {
            remaining.push(classes[i]);
        }
    }

    var cells = document.getElementsByTagName("td");
    for (var i in cells) {
        var rand = Math.floor(Math.random() * remaining.length);
        cells[i].className = remaining[rand];
        remaining = remaining.slice(0, rand).concat(remaining.slice(rand+1));
    }
}


function toggleLabels() {
    if (document.getElementById("labels").checked) {
        document.getElementsByTagName("body")[0].className = "labels";
    }
    else {
        document.getElementsByTagName("body")[0].className = "";
    }
}


document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById("reroll").addEventListener("click", reroll);
    document.getElementById("labels").addEventListener("click", toggleLabels);

    reroll();
    toggleLabels();
});
