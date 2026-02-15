
addEventListener('submit', async function (event) {

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    //Blocca il caricamento della pagina,altrimenti la pagina si ricarica e il fetch non viene eseguito
    event.preventDefault();

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const data = await response.json();

        if (response.ok) {

            localStorage.setItem('access_token', data.access_token);
            window.location.href = "map.html";

        } else {

            alert("Errore: " + data.error);
        }


    } catch (error) {
        console.error(error);
    }


});

