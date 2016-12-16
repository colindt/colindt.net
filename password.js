"use strict";


var this_script = document.currentScript;


function download_pwcontent() {
    return new Promise(function(resolve, reject) {
        var url = this_script.dataset.pwcontent;

        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);

        xhr.onload = function() {
            if (xhr.status === 200) {
                resolve(xhr.responseText);
            }
            else {
                reject("Network Error");
            }
        };

        xhr.onerror = function() {reject("Network Error");};
        xhr.onabort = function() {reject("Network Error");};

        xhr.send();
    });
}

var pwcontent_ciphertext = download_pwcontent();


function submit_password() {
    pwcontent_ciphertext.then(
        function(value) { //download resolved
            openpgp.decrypt({
                message: openpgp.message.readArmored(value),
                password: document.getElementById("pwentry-password").value
            }).then(
                function(value) { //decrypt resolved
                    var pwentry = document.getElementById("pwentry").innerHTML = "";
                    var pwentry = document.getElementById("pwentry").hidden = true;

                    document.getElementById("pwcontent").innerHTML = value.data;
                },
                function(reason) { //decrypt rejected
                    document.getElementById("pwentry-error").textContent = "An error occured. The password you entered may be incorrect.";
                    document.getElementById("pwentry-error").hidden = false;
                }
            );
        },
        function(reason) { //download rejected
            document.getElementById("pwentry-error").textContent = reason;
            document.getElementById("pwentry-error").hidden = false;
        }
    );
}


function add_pwentry() {
    document.getElementById("pwentry").innerHTML = `
        <h2>This page is password protected</h2>
        <form name="pwentry" id="pwentry-form" onsubmit="return false">
            <label for="pwentry-password">Password:</label>
            <input type="password" id="pwentry-password" name="pwentry-password" autofocus>
            <input type="button" id="pwentry-submit" value="Submit">
        </form>
        <div id="pwentry-error" hidden></div>
    `;
}


function attach_events() {
    document.getElementById("pwentry-submit").addEventListener("click", submit_password);

    document.getElementById("pwentry-password").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            submit_password();
        }
    });
}


document.addEventListener("DOMContentLoaded", function(event) {
    add_pwentry();
    attach_events();
});
