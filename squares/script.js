"use strict";


function getClasses() {
    var classes = ["colorW", "color1", "color2", "color3", "color4"];
    if (document.getElementById("white").checked) {
        return classes.slice();
    }
    else {
        return classes.slice(1);
    }
}


function reroll() {
    var classes = getClasses();

    var remaining = [];
    for (var i = 0; i < classes.length; i++) {
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


function cycleColor(elem) {
    var classes = getClasses();
    var next = {};
    for (var i = 0; i < classes.length-1; i++) {
        next[classes[i]] = classes[i+1];
    }
    next[classes[classes.length-1]] = classes[0];

    elem.className = next[elem.className];
}


document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById("reroll").addEventListener("click", reroll);
    document.getElementById("labels").addEventListener("click", toggleLabels);

    var cells = document.getElementsByTagName("td");
    function click(elem) {return function () {cycleColor(elem);}}
    for (var i = 0; i < cells.length; i++) {
        cells[i].addEventListener("click", click(cells[i]));
    }

    reroll();
    toggleLabels();
});
