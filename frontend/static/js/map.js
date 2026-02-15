const myOffcanvasElement = document.getElementById('markerMenu');
const bsOffcanvas = new bootstrap.Offcanvas(myOffcanvasElement);
const bsOffcanvas2 = new bootstrap.Offcanvas(document.getElementById('insert-review'));

//Inizializza la mappa su Roma di default 
const map = L.map('map').setView([41.9028, 12.4964], 6);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);


L.Control.Watermark = L.Control.extend({
    onAdd: function () {

        var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');

        container.innerHTML = `
        <div id="controls">
        <button id="refresh">
        <img src="/img/cached_40dp_1F1F1F_FILL0_wght400_GRAD0_opsz40.svg" alt="refresh icon">
        </button>
        <button id="locate_user">
        <img src="/img/location_on_40dp_1F1F1F_FILL0_wght400_GRAD0_opsz40.svg" alt="location icon">
        </button>
        </div>
         `; 
        container.style.backgroundColor = 'white';
        container.style.cursor = 'pointer';

        return container;
    },

    onRemove: function () { }
});

L.control.watermark = function (opts) {
    return new L.Control.Watermark(opts);
}

L.control.watermark({ position: 'topright' }).addTo(map);

document.getElementById('refresh').addEventListener('click', function () {

    loadMarkers();

});

document.getElementById('locate_user').addEventListener('click', function () {

    locateUser();

});


let Marker;

let helper_id;

async function getUserData() {

    try {
        const response = await fetch('/api/auth/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        });

        const user = await response.json();

        if (!response.ok) {

            alert("Error: " + user.error);
        }

        return user;

    } catch (error) {
        console.error(error);
    }
}

function locateUser() {
    if (!navigator.geolocation) {
        alert("your browser don't support gps");
        return;
    }

    // Chiede il permesso e ottiene la posizione
    navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        //Se esiste già un marker gps, lo rimuove prima di aggiungere uno nuovo
        if (Marker) map.removeLayer(Marker);

        //Aggiunge un marker e il pop up
        Marker = L.marker([lat, lon], {
            title: "you are here",
            zIndexOffset: 1000 // Lo mette sopra gli altri marker
        }).addTo(map).bindPopup("<b>you are here!</b>").openPopup();

        //Centra la mappa sulla posizione dell'utente
        map.setView([lat, lon], 13);

    }, (error) => {
        console.error("Error gps:", error);
        alert("Impossibile accedere alla tua posizione. Controlla i permessi del browser.");
    });
}

async function saveReview(helper_id, reviewer_id, rating, review_text) {
    try {
        const response = await fetch('/api/routes/save_review', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            },
            body: JSON.stringify({
                helper_id: helper_id,
                reviewer_id: reviewer_id,
                rating: rating,
                review_text: review_text
            })
        });

        const data = await response.json();

        if (!response.ok) {

            alert("Error: " + data.error);
        }

    } catch (error) {
        console.error(error);
    }

}


async function loadMarkers() {

    let data,data2;

    try {

        const response = await fetch('/api/routes/helpers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        });

        data = await response.json();

        if (!response.ok) {

            alert("Error: " + data.error);
        }

        data2 = await loadReviewsHelpers();

    } catch (error) {
        console.error("Errore nel caricamento punti via POST:", error);
    }

    //Elimino i marker vecchi 
    map.eachLayer((layer) => {
        if (layer instanceof L.Marker && layer !== Marker) {
            map.removeLayer(layer);
        }
    });

    data.forEach(helper => {
        L.marker([helper.location.lat, helper.location.lon])
            .addTo(map) 
            .on('click', function () {

                document.getElementById('markerMenuLabel').innerHTML = `${helper.information.name} ${helper.information.surname} Helper `

                document.getElementById('marker-description').innerHTML = `
                    <div> 
                    <p>Description Helper: </p>
                    <p>${helper.description}</p>
                    <p>Phone Number Helper:</p>
                    <p>${helper.information.phone_number}</p>
                    </div> 
                    <p>Reviews: </p>
                    ` ;

                data2.forEach(review => {
                    if (review.helper_id === helper["_id"]) {

                        document.getElementById('marker-description').insertAdjacentHTML('beforeend', `
                            <div class="review">
                            <p>Review Text: ${review.review_text}</p>
                            <p>Stars: ${"⭐".repeat(review.rating)}</p>
                            </div>
                            `);
                    }
                });

                helper_id = helper["_id"];

                //Mostra il menu
                bsOffcanvas.show();
            });
    });

    let rating;

    const radios = document.querySelectorAll('input[type="radio"]');

    radios.forEach(radio => {
        radio.addEventListener('change', function () {
            if (this.checked) {

                rating = this.value;
            }
        });
    });

    document.getElementById('insert-review-button').addEventListener('click', function () {

        bsOffcanvas2.show();

        document.getElementById("send-review-button").addEventListener('click', async function () {

            const reviewText = document.getElementById("review-description").value;
            const reviewRating = parseInt(rating);
            const reviewer_id = await getUserData().then(user => user["_id"]);

            await saveReview(helper_id, reviewer_id, reviewRating, reviewText);

            radios.forEach(r => {
                r.checked = false;
            });

            document.getElementById("review-description").value="";

            bsOffcanvas2.hide();


        });

    });

}

async function loadReviewsHelpers() {
    try {
        const response = await fetch('/api/routes/reviews_helpers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        });

        const data = await response.json();

        if (!response.ok) {

            alert("Error: " + data.error);
        }

        return data;

    } catch (error) {
        console.error(error);
    }

}


locateUser();
loadMarkers();




