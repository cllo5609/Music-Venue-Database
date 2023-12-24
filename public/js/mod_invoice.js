/*
    Authors:     Charles D. Maddux
                 Clinton Lohr
    Date:        7 Aug 2022
    Rev Date:    7 Aug 2022
    Description: Modify Invoice page - JavaScript to add functionality to the forms and tables to the Mod Invoice page.
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
let addInvoiceForm = document.getElementById('add-invoice-form');

// Modify the objects we need
addInvoiceForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputPerformance = document.getElementById("input-perf");
    let inputPrice       = document.getElementById("input-price");

    // Get the values from the form fields
    let performanceValue = inputPerformance.value;
    let priceValue       = inputPrice.value;

    // Put our data we want to send in a javascript object
    let data = {
        Performance: performanceValue,
        Price:       priceValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-invoice", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {


            // Clear the input fields for another transaction
            inputPerformance.value = '';
            inputPrice.value       = '';
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

function deleteInvoice(invoiceID) {

    // Put our data we want to send in a javascript object
    let data = {
        id: invoiceID
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-invoice", true);
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
let updateInvoiceForm = document.getElementById('update-invoice-form');

// Modify the objects we need
updateInvoiceForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let invoiceID  = document.getElementById("invoice-id");
    let inputPrice = document.getElementById("update-price");

    // Get the values from the form fields
    let invoiceValue    = invoiceID.value;
    let priceValue = inputPrice.value;

    // Put our data we want to send in a javascript object
    let data = {
        id: invoiceValue,
        Price: priceValue
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-invoice", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, invoiceValue);

            // Clear the input fields for another transaction
            invoiceID.value = "";
            inputPrice.value = "";
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response. Reload page
    xhttp.send(JSON.stringify(data));
});

function updateRow(data, invoiceID){
    let parsedData = JSON.parse(data);

    let table = document.getElementById("invoice-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == invoiceID) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of each value and reassign
            let td1 = updateRowIndex.getElementsByTagName("td")[1];
            let td2 = updateRowIndex.getElementsByTagName("td")[2];
            let td3 = updateRowIndex.getElementsByTagName("td")[3];
            let td4 = updateRowIndex.getElementsByTagName("td")[4];
            let td5 = updateRowIndex.getElementsByTagName("td")[5];

            td1.innerHTML = parsedData[0].Performer;
            td2.innerHTML = parsedData[0].Location;
            td3.innerHTML = parsedData[0].Room;
            td4.innerHTML = parsedData[0].Date;
            td5.innerHTML = parsedData[0].Price;
       }
    }
}