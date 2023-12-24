/*
    Authors:     Charles D. Maddux
                 Clinton Lohr
    Date:        7 Aug 2022
    Rev Date:    7 Aug 2022
    Description: Modify Instrument Request page - JavaScript to add functionality to the forms and tables to the Mod Instrument Request page.
    Sources:     https://github.com/osu-cs340-ecampus/nodejs-starter-app // Code for the add, update and delete functionality
                 was derived from this source.
*/

// SHOW ADD FORM
function displayAddForm() {
    let x = document.getElementById("show-add");
    if (x.style.display === "none") {
        x.style.display = "block";
    }
    else
    {
        x.style.display = "none";
    }
}

// SHOW UPDATE FORM
function displayUpdateForm() {
    let x = document.getElementById("show-update");
    if (x.style.display === "none") {
        x.style.display = "block";
    }
    else
    {
        x.style.display = "none";
    }
}

// ########## ADD ##########

// Get the objects we need to modify
let addRequestForm = document.getElementById('add-request-form');

// Modify the objects we need
addRequestForm.addEventListener("submit", function (e){

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputName = document.getElementById("add-name");
    let inputInst = document.getElementById("add-inst");

    // Get the values from the form fields
    let nameValue = inputName.value;
    let instValue = inputInst.value;

    // Put our data we want to send in a javascript object
    let data = {
        rname: nameValue,
        rinst: instValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-request", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Clear the input fields for another transaction
            inputName.value = '';
            inputInst.value = '';
            location.reload();
        }
        else if (xhttp.readyState == 4 && xhttp.status != 400) {
            console.log("ERROR: There was a problem with the input")
        }
    }
    // Send the request and wait for the response. Reload page
    xhttp.send(JSON.stringify(data));
    location.reload();

})


// ########## Delete ##########

function deleteRequest(requestID) {

    // Put our data we want to send in a javascript object
    let data = {
        id: requestID
    };

   // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-request", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response. Reload page
    xhttp.send(JSON.stringify(data));
    location.reload();
}


// ########## Update ##########

// Get the objects we need to modify
let updateRequestForm = document.getElementById('update-request-form');

// Modify the objects we need
updateRequestForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputID = document.getElementById("input-id");
    let inputName = document.getElementById("update-name");
    let inputInst = document.getElementById("update-inst");

    // Get the values from the form fields
    let idValue = inputID.value;
    let nameValue = inputName.value;
    let instValue = inputInst.value;

    // Put our data we want to send in a javascript object
    let data = {
        rid: idValue,
        rname: nameValue,
        rinst: instValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-request", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Clear the input fields for another transaction
            inputName.value = '';
            inputInst.value = '';

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response. Reload page
    xhttp.send(JSON.stringify(data));
    location.reload();
})
