/*
    Authors:     Charles D. Maddux
                 Clinton Lohr
    Date:        7 Aug 2022
    Rev Date:    7 Aug 2022
    Description: Modify Venues page - JavaScript to add functionality to the forms and tables to the Mod Venues page.
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
let addVenueForm = document.getElementById('add-venue-form');

// Modify the objects we need
addVenueForm.addEventListener("submit", function (e){

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputName = document.getElementById("add-name");
    let inputAddress = document.getElementById("add-address");
    let inputCity = document.getElementById("add-city");
    let inputState = document.getElementById("add-state");
    let inputZip = document.getElementById("add-zip");
    let inputPhone = document.getElementById("add-phone");
    let inputRooms = document.getElementById("add-num-rooms");
    let inputCapacity = document.getElementById("add-cap");

    // Get the values from the form fields
    let nameValue = inputName.value;
    let addressValue = inputAddress.value;
    let cityValue = inputCity.value;
    let stateValue = inputState.value;
    let zipValue = inputZip.value;
    let phoneValue = inputPhone.value;
    let roomsValue = inputRooms.value;
    let capValue = inputCapacity.value;

    // Put our data we want to send in a javascript object
    let data = {
        vname: nameValue,
        vaddress: addressValue,
        vcity: cityValue,
        vstate: stateValue,
        vzip: zipValue,
        vphone: phoneValue,
        vrooms: roomsValue,
        vcapacity: capValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-venue", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Clear the input fields for another transaction
            inputName.value = '';
            inputAddress.value = '';
            inputCity.value = '';
            inputState.value = '';
            inputZip.value = '';
            inputPhone.value = '';
            inputRooms.value = '';
            inputCapacity.value = '';
            location.reload();
        }
        else if (xhttp.readyState == 4 && xhttp.status != 400) {
            console.log("ERROR: There was a problem with the input")
        }
    }

    // Send the request and wait for the response. Reload page
    xhttp.send(JSON.stringify(data));
    location.reload()
})


// ########## Delete ##########

function deleteVenue(venueID) {

    // Put our data we want to send in a javascript object
    let data = {
        id: venueID
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-venue", true);
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
let updateVenueForm = document.getElementById('update-venue-form');

// Modify the objects we need
updateVenueForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputID = document.getElementById("input-id");
    let inputName = document.getElementById("update-name");
    let inputAddress = document.getElementById("update-address");
    let inputCity = document.getElementById("update-city");
    let inputState = document.getElementById("update-state");
    let inputZip = document.getElementById("update-zip");
    let inputPhone = document.getElementById("update-phone");
    let inputRooms = document.getElementById("update-num-rooms");
    let inputCapacity = document.getElementById("update-cap");

    // Get the values from the form fields
    let idValue = inputID.value;
    let nameValue = inputName.value;
    let addressValue = inputAddress.value;
    let cityValue = inputCity.value;
    let stateValue = inputState.value;
    let zipValue = inputZip.value;
    let phoneValue = inputPhone.value;
    let roomsValue = inputRooms.value;
    let capValue = inputCapacity.value;

    // Put our data we want to send in a javascript object
    let data = {
        vid: idValue,
        vname: nameValue,
        vaddress: addressValue,
        vcity: cityValue,
        vstate: stateValue,
        vzip: zipValue,
        vphone: phoneValue,
        vrooms: roomsValue,
        vcapacity: capValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-venue", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Clear the input fields for another transaction
            inputName.value = '';
            inputAddress.value = '';
            inputCity.value = '';
            inputState.value = '';
            inputZip.value = '';
            inputPhone.value = '';
            inputRooms.value = '';
            inputCapacity.value = '';
            location.reload();
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response. Reload page
    xhttp.send(JSON.stringify(data));
    location.reload();
})
