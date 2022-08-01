// Source: Code inherited from https://github.com/osu-cs340-ecampus/nodejs-starter-app

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

// INSERT
let addInstrumentForm = document.getElementById('add-instrument-form');

// Send the POST
addInstrumentForm.addEventListener("submit", function(e){

    e.preventDefault();

    let inputInstrumentName = document.getElementById("add-type");

    let instrumentNameValue = inputInstrumentName.value;

    let data = {
        iname: instrumentNameValue
    }
    // AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-instrument", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Resolve AJAX
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            inputTicketPrice.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("ERROR: There was a problem with the input")
        }
    }

    // Send request
    xhttp.send(JSON.stringify(data));
    location.reload();
})

// DELETE

function deleteInstrument(instrumentID) {

    let data = {
        id: instrumentID
    };

    // AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-instrument", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Resolve request
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }

    xhttp.send(JSON.stringify(data));
    location.reload();
}


// UPDATE

let updateInstrumentForm = document.getElementById('update-instrument-form');

updateInstrumentForm.addEventListener("submit", function (e) {

    e.preventDefault();

    // Get form fields
    let inputID = document.getElementById("ins-id");
    let inputType = document.getElementById("update-type");

    // Get values from fields
    let idValue = inputID.value;
    let typeValue = inputType.value;


    // Create javascript object with values
    let data = {
        iid: idValue,
        itype: typeValue,
    }

    // AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-instrument", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Resolve request
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request
    xhttp.send(JSON.stringify(data));
    location.reload();
})
