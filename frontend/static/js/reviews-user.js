if (!localStorage.getItem('access_token')) {

    alert("You are not logged in !");
    window.location.href = 'login.html';

}

document.getElementById('logout-button').addEventListener('click', function () {
    localStorage.removeItem('access_token');
    alert("Logout successful !");
    window.location.href = 'login.html';
});

async function getUserData() {

    try {
        const response = await fetch('/api/routes/user', {
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



async function loadReviewsUser() {

    let data;

    try {
        const response = await fetch('/api/routes/reviews_helpers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        });


        data = await response.json();

        if (!response.ok) {

            alert("Error: " + user.error);
        }

        user = await getUserData();


    } catch (error) {
        console.error(error);
    }
    user_id = user["_id"];
    empty = true;

    data.forEach(review => {
        if (review.reviewer_id === user_id) {

            document.getElementById('reviews-user').insertAdjacentHTML('beforeend', `<div class="review"><p>Recensione: ${review.review_text}</p><p>Star: ${"⭐".repeat(review.rating)}</p></div>`);
            empty = false;
        }

    });

    if (empty) {
        document.getElementById('reviews-user').insertAdjacentHTML('beforeend', `<div class="review"><p>You haven't left any reviews yet!</p></div>`);
    }


}

loadReviewsUser();
