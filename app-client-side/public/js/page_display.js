
function showform(dowhat) {
    /*
    * four DIVS: browse, insert, update, delete
    * this function sets one visible the others not
    */
    if (dowhat == 'add'){
        //document.getElementById('browse').style.display = 'none';
        document.getElementById('add').style.display = 'block';
        document.getElementById('update').style.display = 'none';
        document.getElementById('delete').style.display = 'none';
        document.getElementById('browse').style.display = 'none';
    }
    else if (dowhat == 'update'){
        //document.getElementById('browse').style.display = 'none';
        document.getElementById('add').style.display = 'none';
        document.getElementById('update').style.display = 'block';
        document.getElementById('delete').style.display = 'none';
        document.getElementById('browse').style.display = 'none';
    }
    else if (dowhat == 'delete'){
        //document.getElementById('browse').style.display = 'none';
        document.getElementById('add').style.display = 'none';
        document.getElementById('update').style.display = 'none';
        document.getElementById('delete').style.display = 'block';
        document.getElementById('browse').style.display = 'none';
    }

    else { //by default display browse
        //document.getElementById('browse').style.display = 'block';

        document.getElementById('add').style.display = 'none';
        document.getElementById('update').style.display = 'none';
        document.getElementById('delete').style.display = 'none';
        document.getElementById('browse').style.display = 'block';
    }
}

function newPerson() { showform('add'); }
function updatePerson(pid) { showform('update'); }
function deletePerson(pid) { showform ('delete'); }
function browsePeople() { showform ('browse'); }


