window.addEventListener('load', () => {
    'use strict';

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('./sw.js')
            .then(registration => {
                // Registrazione avvenuta con successo
                console.log('ServiceWorker registrato con scope: ', registration.scope);
            })
            .catch(err => {
                // Errore durante la registrazione
                console.error('Registrazione ServiceWorker fallita: ', err);
            });
    }
});