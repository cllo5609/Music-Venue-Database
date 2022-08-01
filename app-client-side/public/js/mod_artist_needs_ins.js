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


let addRequestForm = document.getElementById('add-request-form');

addRequestForm.addEventListener("submit", function (e){

    e.preventDefault();

    // get form fields

    let inputName = document.getElementById("add-name");
    let inputInst = document.getElementById("add-inst");

    // get values
    let nameValue = inputName.value;
    let instValue = inputInst.value;

    // put data in js object
    let data = {
        rname: nameValue,
        rinst: instValue
    }

    // AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-request", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // resolve AJAX request
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // clear input fields
            inputName.value = '';
            inputInst.value = '';

        }
        else if (xhttp.readyState == 4 && xhttp.status != 400) {
            console.log("ERROR: There was a problem with the input")
        }
    }
    xhttp.send(JSON.stringify(data));
    location.reload()
})


// DELETE

function deleteRequest(requestID) {

    let data = {
        id: requestID
    };

    // AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-request", true);
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

let updateRequestForm = document.getElementById('update-request-form');

updateRequestForm.addEventListener("submit", function (e) {

    e.preventDefault();

    // Get form fields
    let inputID = document.getElementById("input-id");
    let inputName = document.getElementById("update-name");
    let inputInst = document.getElementById("update-inst");


    // Get values from fields
    let idValue = inputID.value;
    let nameValue = inputName.value;
    let instValue = inputInst.value;


    // Create javascript object with values
    let data = {
        rid: idValue,
        rname: nameValue,
        rinst: instValue
    }

    // AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-request", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Resolve request
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            inputName.value = '';
            inputInst.value = '';

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request
    xhttp.send(JSON.stringify(data));
    location.reload();
})
