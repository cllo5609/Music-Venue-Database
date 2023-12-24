/*
    Authors:     Charles D. Maddux
                 Clinton Lohr
    Date:        7 Aug 2022
    Rev Date:    7 Aug 2022
    Description: Modify Rooms page - JavaScript to add functionality to the forms and tables to the Mod Rooms page.
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
let addRoomForm = document.getElementById('add-room-form');

// Modify the objects we need
addRoomForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputRoomName   = document.getElementById("rNameInput");
    let inputCapacity   = document.getElementById("rCapacityInput");
    let inputVenueName  = document.getElementById("rVenueInput");
    let inputAdultEvent = document.getElementById("rAdultEventInput");

    // Get the values from the form fields
    let roomValue       = inputRoomName.value;
    let capacityValue   = inputCapacity.value;
    let venueNameValue  = inputVenueName.value;
    let adultEventValue = inputAdultEvent.value;

    // Put our data we want to send in a javascript object
    let data = {
        Room: roomValue,
        Capacity: capacityValue,
        Venue: venueNameValue,
        Adult: adultEventValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-room", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {


            // Clear the input fields for another transaction
            inputRoomName.value     = '';
            inputCapacity.value     = '';
            inputVenueName.value    = '';
            inputAdultEvent.value   = '';
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

// ########## Delete ##########

function deleteRoom(roomID) {
    let link = '/delete-room/';

    // Put our data we want to send in a javascript object
    let data = {
      id: roomID
    };

    // Setup our AJAX request
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(roomID);
      }
    });
  };

  function deleteRow(roomID){
      let table = document.getElementById("room-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         if (table.rows[i].getAttribute("data-value") == roomID) {
              table.deleteRow(i);
              break;
         }
      }
  };


// ########## Update ##########

// Get the objects we need to modify
let updateRoomForm = document.getElementById('update-room-form');

// Modify the objects we need
updateRoomForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputID         = document.getElementById("input-id");
    let inputRoom       = document.getElementById("update-room");
    let inputCapacity   = document.getElementById("update-capacity");
    let inputVenue      = document.getElementById("update-venue");
    let inputOver21     = document.getElementById("update-over-21");

    // Get the values from the form fields
    let idValue         = inputID.value;
    let roomValue       = inputRoom.value;
    let capacityValue   = inputCapacity.value;
    let venueValue      = inputVenue.value;
    let over21Value     = inputOver21.value;

    // Put our data we want to send in a javascript object
    let data = {
        id: idValue,
        rNameInput: roomValue,
        rCapacityInput: capacityValue,
        rVenueInput: venueValue,
        rAdultEventInput: over21Value
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-room", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Clear the input fields for another transaction
            inputRoomName.value     = '';
            inputCapacity.value     = '';
            inputVenueName.value    = '';
            inputAdultEvent.value   = '';
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
