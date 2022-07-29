// Source: Code inherited from https://github.com/osu-cs340-ecampus/nodejs-starter-app

// INSERT
let addTicketForm = document.getElementById('add-ticket-form');

// Send the POST
addTicketForm.addEventListener("submit", function(e){

    e.preventDefault();

    let inputTicketPrice = document.getElementById("add-price");

    let ticketPriceValue = inputTicketPrice.value;

    let data = {
        tprice: ticketPriceValue
    }
    // AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-ticket", true);
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

function deleteTicket(ticketID) {

    let data = {
        id: ticketID
    };

    // AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-ticket", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Resolve request
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            deleteRow(ticketID);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }

    xhttp.send(JSON.stringify(data));

    location.reload();
}


function deleteRow(personID){

    let table = document.getElementById("ticket-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       if (table.rows[i].getAttribute("data-value") == ticketID) {
            table.deleteRow(i);
            break;
       }
    }
}


// UPDATE

let updateTicketForm = document.getElementById('update-ticket-form');

updateTicketForm.addEventListener("submit", function (e) {

    e.preventDefault();

    // Get form fields
    let inputID = document.getElementById("input-id");
    let inputPrice = document.getElementById("update-price");

    // Get values from fields
    let idValue = inputID.value;
    let priceValue = inputPrice.value;


    // Create javascript object with values
    let data = {
        tid: idValue,
        price: priceValue,
    }

    // AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-ticket", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Resolve request
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            updateRow(xhttp.response, priceValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request
    xhttp.send(JSON.stringify(data));
    location.reload();
})


function updateRow(data, ticketID){
    let parsedData = JSON.parse(data);

    let table = document.getElementById("ticket-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       if (table.rows[i].getAttribute("data-value") == ticketID) {


            let updateRowIndex = table.getElementsByTagName("tr")[i];

            let td = updateRowIndex.getElementsByTagName("td")[3];

            td.innerHTML = parsedData[0].name;
       }
    }
}