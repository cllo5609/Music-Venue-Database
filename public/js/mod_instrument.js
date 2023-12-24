/*
    Authors:     Charles D. Maddux
                 Clinton Lohr
    Date:        7 Aug 2022
    Rev Date:    7 Aug 2022
    Description: Modify Instruments page - JavaScript to add functionality to the forms and tables to the Mod Instruments page.
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
let addInstrumentForm = document.getElementById('add-instrument-form');

// Modify the objects we need
addInstrumentForm.addEventListener("submit", function(e){

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputInstrumentName = document.getElementById("add-type");

    // Get the values from the form fields
    let instrumentNameValue = inputInstrumentName.value;

    // Put our data we want to send in a javascript object
    let data = {
        iname: instrumentNameValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-instrument", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Clear the input fields for another transaction
            inputTicketPrice.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("ERROR: There was a problem with the input")
        }
    }

    // Send the request and wait for the response. Reload page
    xhttp.send(JSON.stringify(data));
    location.reload();
})

// ########## Delete ##########

function deleteInstrument(instrumentID) {

    // Put our data we want to send in a javascript object
    let data = {
        id: instrumentID
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-instrument", true);
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
let updateInstrumentForm = document.getElementById('update-instrument-form');

// Modify the objects we need
updateInstrumentForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputID = document.getElementById("ins-id");
    let inputType = document.getElementById("update-type");

    // Get the values from the form fields
    let idValue = inputID.value;
    let typeValue = inputType.value;

    // Put our data we want to send in a javascript object
    let data = {
        iid: idValue,
        itype: typeValue,
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-instrument", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response. Reload page
    xhttp.send(JSON.stringify(data));
    location.reload();
})
