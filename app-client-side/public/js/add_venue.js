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
    xhttp.setRequestHeader("Content-type", "application.json");

    // resolve AJAX request
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            addRowToTable(xhttp.response);
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

addRowToTable = (data) => {

    // get current venue table
    let currentTable = document.getElementById("venue-table");

    //
    let newRowIndex = currentTable.rows.length;

    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length -1]

    // create a row and cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let nameCell = document.createElement("TD");
    let addressCell = document.createElement("TD");
    let cityCell = document.createElement("TD");
    let stateCell = document.createElement("TD");
    let zipCell = document.createElement("TD");
    let phoneCell = document.createElement("TD");
    let roomsCell = document.createElement("TD");
    let capacityCell = document.createElement("TD");


    // fill cells with data
    idCell.innerText = newRow.id;
    nameCell.innerText = newRow.nameValue;
    addressCell.innerText = newRow.address;
    cityCell.innerText = newRow.city;
    stateCell.innerText = newRow.state;
    zipCell.innerText = newRow.zip;
    phoneCell.innerText = newRow.phone;
    roomsCell.innerText = newRow.rooms;
    capacityCell.innerText = newRow.capacity;

    // add cells to row
    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(addressCell);
    row.appendChild(cityCell);
    row.appendChild(stateCell);
    row.appendChild(zipCell);
    row.appendChild(phoneCell);
    row.appendChild(roomsCell);
    row.appendChild(capacityCell);

    currentTable.appendChild(row);
}