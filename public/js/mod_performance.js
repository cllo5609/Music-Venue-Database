/*
    Authors:     Charles D. Maddux
                 Clinton Lohr
    Date:        7 Aug 2022
    Rev Date:    7 Aug 2022
    Description: Modify Performances page - JavaScript to add functionality to the forms and tables to the Mod Performances page.
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
let addPerfForm = document.getElementById('add-performance-form');

// Modify the objects we need
addPerfForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputArtistID   = document.getElementById("input-artist");
    let inputRoomID     = document.getElementById("input-room");
    let inputPerfDate   = document.getElementById("input-date");
    let inputPrice      = document.getElementById("input-price");
    let inputTickets    = document.getElementById("input-tickets");

    // Get the values from the form fields
    let artistValue     = inputArtistID.value;
    let roomValue       = inputRoomID.value;
    let PerfDateValue   = inputPerfDate.value;
    let priceValue      = inputPrice.value;
    let ticketValue     = inputTickets.value;

    // Put our data we want to send in a javascript object
    let data = {
        Artist: artistValue,
        Room: roomValue,
        Date: PerfDateValue,
        Price: priceValue,
        Available: ticketValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-performance", true);
    xhttp.setRequestHeader("Content-type", "application/json");

        // Tell our AJAX request how to resolve
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {

                // Clear the input fields for another transaction
                inputArtistID.value     = '';
                inputRoomID.value       = '';
                inputPerfDate.value     = '';
                inputPrice.value        = '';
                inputTickets.value      = '';
                location.reload();
            }
            else if (xhttp.readyState == 4 && xhttp.status != 200) {
                console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
    location.reload();
});


// ########## Delete ##########

function deletePerformance(performanceID) {

    // Put our data we want to send in a javascript object
    let data = {
        id: performanceID
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-performance", true);
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
let updatePerformanceForm = document.getElementById('update-performance-form');

// Modify the objects we need
updatePerformanceForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let updateID        = document.getElementById("update-id");
    let updateArtist    = document.getElementById("update-artist");
    let updateRoom      = document.getElementById("update-room");
    let updateDate      = document.getElementById("update-date");
    let updatePrice     = document.getElementById("update-price");
    let updateTickets   = document.getElementById("update-tickets");

    // Get the values from the form fields
    let idValue     = updateID.value;
    let artistValue = updateArtist.value;
    let roomValue   = updateRoom.value;
    let dateValue   = updateDate.value;
    let priceValue  = updatePrice.value;
    let ticketValue = updateTickets.value;

    // Put our data we want to send in a javascript object
    let data = {
        id:         idValue,
        Artist:     artistValue,
        Room:       roomValue,
        Date:       dateValue,
        Price:      priceValue,
        Available:  ticketValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-performance", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            updateID.value = '';
            updateArtist.value = '';
            updateRoom.value = '';
            updateDate.value = '';
            updatePrice.value = '';
            updateTickets.value = '';
            location.reload();

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response. Reload page
    xhttp.send(JSON.stringify(data));
    location.reload();
});

