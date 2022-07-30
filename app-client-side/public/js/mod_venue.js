let addVenueForm = document.getElementById('add-venue-form');

addVenueForm.addEventListener("submit", function (e){

    e.preventDefault();

    // get form fields

    let inputName = document.getElementById("add-name");
    let inputAddress = document.getElementById("add-address");
    let inputCity = document.getElementById("add-city");
    let inputState = document.getElementById("add-state");
    let inputZip = document.getElementById("add-zip");
    let inputPhone = document.getElementById("add-phone");
    let inputRooms = document.getElementById("add-num-rooms");
    let inputCapacity = document.getElementById("add-cap");

    // get values
    let nameValue = inputName.value;
    let addressValue = inputAddress.value;
    let cityValue = inputCity.value;
    let stateValue = inputState.value;
    let zipValue = inputZip.value;
    let phoneValue = inputPhone.value;
    let roomsValue = inputRooms.value;
    let capValue = inputCapacity.value;

    // put data in js object
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

    // AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-venue", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // resolve AJAX request
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            //addRowToTable(xhttp.response);

            // clear input fields
            inputName.value = '';
            inputAddress.value = '';
            inputCity.value = '';
            inputState.value = '';
            inputZip.value = '';
            inputPhone.value = '';
            inputRooms.value = '';
            inputCapacity.value = '';

        }
        else if (xhttp.readyState == 4 && xhttp.status != 400) {
            console.log("ERROR: There was a problem with the input")
        }
    }
    xhttp.send(JSON.stringify(data));
    location.reload()
})


// DELETE

function deleteVenue(venueID) {

    let data = {
        id: venueID
    };

    // AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-venue", true);
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

let updateVenueForm = document.getElementById('update-venue-form');

updateVenueForm.addEventListener("submit", function (e) {

    e.preventDefault();

    // get form fields
    let inputID = document.getElementById("input-id");
    let inputName = document.getElementById("update-name");
    let inputAddress = document.getElementById("update-address");
    let inputCity = document.getElementById("update-city");
    let inputState = document.getElementById("update-state");
    let inputZip = document.getElementById("update-zip");
    let inputPhone = document.getElementById("update-phone");
    let inputRooms = document.getElementById("update-num-rooms");
    let inputCapacity = document.getElementById("update-cap");

    // get values
    let idValue = inputID.value;
    let nameValue = inputName.value;
    let addressValue = inputAddress.value;
    let cityValue = inputCity.value;
    let stateValue = inputState.value;
    let zipValue = inputZip.value;
    let phoneValue = inputPhone.value;
    let roomsValue = inputRooms.value;
    let capValue = inputCapacity.value;

    // put data in js object
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

    // AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-venue", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Resolve request
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            //updateRow(xhttp.response, idValue);

            // clear input fields
            inputName.value = '';
            inputAddress.value = '';
            inputCity.value = '';
            inputState.value = '';
            inputZip.value = '';
            inputPhone.value = '';
            inputRooms.value = '';
            inputCapacity.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request
    xhttp.send(JSON.stringify(data));
    location.reload();
})
