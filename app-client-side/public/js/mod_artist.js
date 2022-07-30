let addArtistForm = document.getElementById('add-artist-form');

addArtistForm.addEventListener("submit", function (e){

    e.preventDefault();

    // get form fields

    let inputName = document.getElementById("add-artist");
    let inputEmail = document.getElementById("add-email");
    let inputPhone = document.getElementById("add-phone");
    let inputGenre = document.getElementById("add-genre");

    // get values
    let nameValue = inputName.value;
    let emailValue = inputEmail.value;
    let phoneValue = inputPhone.value;
    let genreValue = inputGenre.value;


    // put data in js object
    let data = {
        aname: nameValue,
        aemail: emailValue,
        aphone: phoneValue,
        agenre: genreValue
    }

    // AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-artist", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // resolve AJAX request
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            //addRowToTable(xhttp.response);

            // clear input fields
            inputName.value = '';
            inputEmail.value = '';
            inputPhone.value = '';
            inputGenre.value = '';

        }
        else if (xhttp.readyState == 4 && xhttp.status != 400) {
            console.log("ERROR: There was a problem with the input")
        }
    }
    xhttp.send(JSON.stringify(data));
    location.reload()
})


// DELETE

function deleteArtist(artistID) {

    let data = {
        id: artistID
    };

    // AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-artist", true);
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

let updateArtistForm = document.getElementById('update-artist-form');

updateArtistForm.addEventListener("submit", function (e) {

    e.preventDefault();

    // Get form fields
    let inputID = document.getElementById("input-id");
    let inputName = document.getElementById("update-name");
    let inputEmail = document.getElementById("update-email");
    let inputPhone = document.getElementById("update-phone");
    let inputGenre = document.getElementById("update-genre");

    // Get values from fields
    let idValue = inputID.value;
    let nameValue = inputName.value;
    let emailValue = inputEmail.value;
    let phoneValue = inputPhone.value;
    let genreValue = inputGenre.value;


    // Create javascript object with values
    let data = {
        aid: idValue,
        aname: nameValue,
        aemail: emailValue,
        aphone: phoneValue,
        agenre: genreValue
    }

    // AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-artist", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Resolve request
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            inputName.value = '';
            inputEmail.value = '';
            inputPhone.value = '';
            inputGenre.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request
    xhttp.send(JSON.stringify(data));
    location.reload();
})
