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
        document.getElementById('reviews-user').insertAdjacentHTML('beforeend', `<div class="review"><p>Non hai ancora fatto recensioni!</p></div>`);
    }


}

loadReviewsUser();
