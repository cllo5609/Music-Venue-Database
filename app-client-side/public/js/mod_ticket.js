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

        if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }

    xhttp.send(JSON.stringify(data));
    location.reload();
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

            inputPrice.value = '';

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request
    xhttp.send(JSON.stringify(data));
    location.reload();
})
