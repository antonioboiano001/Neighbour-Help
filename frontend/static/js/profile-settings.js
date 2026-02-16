let cont = false;
let helper_is;
let pos = [];


document.getElementById('logout-button').addEventListener('click', function () {
    localStorage.removeItem('access_token');
    window.location.href = 'login.html';
});

function locateUser() {


    try {
        if (!navigator.geolocation) {
            alert("your browser don't support gps");
            return;
        }

        // Chiede il permesso e ottiene la posizione
        navigator.geolocation.getCurrentPosition((position) => {
            pos[0] = position.coords.latitude;
            pos[1] = position.coords.longitude;

        }, (error) => {
            console.error("Error gps:", error);
            alert("Unable to access your location. Check your browser permissions.");
        });

    } catch (err) {
        console.error(err);
    }

}

document.getElementById('locate-button').addEventListener('click', async function () {

    if (pos[0] !== undefined && pos[1] !== undefined) {

        document.getElementById('position-text').value = "Acquired";

    } else {
        alert("Press confirm to allow the position to be acquired, then click the button again.");
        locateUser();
    }


});

async function updateUserData(event, name, surname, email, phone_number, description) {

    event.preventDefault();

    let body_fetch;

    if (helper_is) {

        body_fetch = JSON.stringify({
            email: email,
            information: {
                name: name,
                surname: surname,
                phone_number: phone_number
            },
            location: {
                lat: pos[0],
                lon: pos[1]
            },
            helper_is: helper_is,
            description: description
        });


    } else {
        body_fetch = JSON.stringify({
            email: email,
            information: {
                name: name,
                surname: surname,
                phone_number: phone_number
            },
            helper_is: helper_is
        })

    }


    try {
        const response = await fetch('/api/auth/update_data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            },
            body: body_fetch
        });

        const data = await response.json();
        if (response.ok) {

            alert("Data Updated! ");

            window.location.href = "map.html";

        } else {
            alert("Error: " + data.error);
        }
    } catch (error) {
        console.error(error);
    }

}

document.getElementById('save-change-button').addEventListener('click', function (e) {

    name = document.getElementById('name').value;
    surname = document.getElementById('surname').value;
    email = document.getElementById('email').value;
    phone_number = document.getElementById('phone_number').value;
    description = document.getElementById("description").value;

    updateUserData(e, name, surname, email, phone_number, description);


});

document.getElementById('helper-toggle').addEventListener('click', function () {

    if (cont === false) {

        cont = true;

        document.querySelectorAll('.helper-box').forEach(el => {
            el.style.display = 'block';
        });

    } else {

        cont = false;

        document.querySelectorAll('.helper-box').forEach(el => {
            el.style.display = 'none';
        });
    }

});



async function getUserData() {

    try {
        const response = await fetch('/api/auth/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        });

        user = await response.json();

        if (!response.ok) {

            alert("Error: " + user.error);
        }

        return user;

    } catch (error) {
        console.error(error);
    }

}

async function getHelperData() {

    try {
        const response = await fetch('/api/auth/helper', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        });

        const helper = await response.json();

        if (!response.ok) {

            alert("Error: " + user.error);
        }

        return helper;

    } catch (error) {
        console.error(error);
    }
}


async function loadData() {

    let user, helper;

    try {

        user = await getUserData();

        if (user["helper_is"]) {

            helper = await getHelperData();
        }

    } catch (error) {
        console.error(error);
    }


    document.getElementById('name').value = user.information.name;
    document.getElementById('surname').value = user.information.surname;
    document.getElementById('email').value = user.email;
    document.getElementById('phone_number').value = user.information.phone_number;
    helper_is = user["helper_is"];

    if (helper_is) {

        document.querySelectorAll('.helper').forEach(el => {
            el.style.display = 'block';
        });

        document.getElementById('description').value = helper.description;

    } else {

        document.querySelectorAll('.helper').forEach(el => {
            el.style.display = 'none';
        });


    }
}

loadData();