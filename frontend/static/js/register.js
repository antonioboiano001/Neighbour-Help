let pos = [];

let toogle_helper = false;

addEventListener('submit', async function (event) {

    event.preventDefault();

    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const phone_number = document.getElementById('phone_number').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    let helper_is;
    let body_fetch;

    if (pos.length == 0) {

        helper_is = false;

        body_fetch = JSON.stringify({
            email: email,
            password: password,
            information: {
                name: name,
                surname: surname,
                phone_number: phone_number
            },
            helper_is: helper_is,
        });

    } else {

        helper_is = true;

        let description = document.getElementById('description').value;

        if (!description) {

            description = "Hi, I'm a helper!";
        }

        body_fetch = JSON.stringify({
            email: email,
            password: password,
            information: {
                name: name,
                surname: surname,
                phone_number: phone_number
            },
            helper_is: helper_is,
            location: {
                lat: pos[0],
                lon: pos[1]
            },
            description: description
        });

    }


    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body_fetch
        });

        const data = await response.json();
        
        if (response.ok) {
            alert("Registration successful! You can now log in.");
            window.location.href = "login.html";
        } else {
            alert("Error: " + data.error);
        }
    } catch (error) {
        console.error(error);
    }

});

document.getElementById('helper-toggle').addEventListener('click', function () {

    if (toogle_helper === false) {

        toogle_helper = true;

        document.querySelectorAll('.helper-box').forEach(el => {
            el.style.display = 'block';
        });
    } else {

        toogle_helper = false;

        document.querySelectorAll('.helper-box').forEach(el => {
            el.style.display = 'none';
        });
    }

});

document.getElementById('locate-button').addEventListener('click', async function () {

    locateUser();

    if (pos[0] !== undefined && pos[1] !== undefined) {

        document.getElementById('position-text').value = "Acquired";

    } else {
        alert("Press confirm to allow the position to be acquired, then click the button again.");
        locateUser();
    }


});


function locateUser() {

    try {

        if (!navigator.geolocation) {
            alert("Il tuo browser non supporta la geolocalizzazione.");
            return;
        }

        // Chiede il permesso e ottiene la posizione
        navigator.geolocation.getCurrentPosition((position) => {
            pos[0] = position.coords.latitude;
            pos[1] = position.coords.longitude;

        }, (error) => {
            console.error("Errore GPS:", error);
            alert("Impossibile accedere alla tua posizione. Controlla i permessi del browser.");
        });

    } catch (error) {
        console.error(error);
    }

}



