"use strict";


function reroll() {
    var classes = ["colorW", "color1", "color2", "color3", "color4"];

    if (!document.getElementById("white").checked) {
        classes = classes.slice(1);
    }

    var cells = document.getElementsByTagName("td");
    for (var i in cells) {
        var rand = Math.floor(Math.random() * classes.length);
        cells[i].className = classes[rand];
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
    toggleLabels();
});
