# Neighbour-Help

**Neighbour** è una pwa progettata per facilitare l'aiuto tra persone nelle vicinanze.

---

## 🛠 Stack Tecnologico

Il progetto è stato sviluppato utilizzando le seguenti tecnologie, garantendo scalabilità e facilità di deployment:

### Backend & Logica
* **Python**: Linguaggio core per la logica applicativa.
* **Flask**: Micro-framework leggero e flessibile per la gestione delle rotte e delle API.
* **Gunicorn**: WSGI HTTP Server di produzione per gestire le richieste Python.

### Frontend
* **HTML5 & Bootstrap**: Per una struttura solida e un design responsive (adatto a dispositivi mobile e desktop).
* **JavaScript**: Per rendere l'interfaccia utente dinamica e interattiva.

### Infrastruttura & Deployment
* **Docker**: L'intera applicazione è containerizzata per garantire coerenza tra i diversi ambienti di sviluppo e produzione.
* **NGINX**: Utilizzato come Reverse Proxy per gestire il traffico web, migliorare la sicurezza e servire i file statici.

---

## 🏗 Architettura del Sistema

L'applicazione segue un modello di deployment standard del settore:

1.  **Client**: Browser dell'utente (JS/HTML/Bootstrap).
2.  **Web Server**: **NGINX** riceve le richieste e le smista.
3.  **Application Server**: **Gunicorn** funge da interfaccia tra NGINX e Flask.
4.  **App**: Il codice **Python/Flask** elabora i dati e la logica di business.


## 👨‍💻 Autore

* **Nome e Cognome**: Antonio Boiano
* **Matricola**: 0124002905
* **Email**: [antonio.boiano001@studenti.uniparthenope.it](mailto:antonio.boiano001@studenti.uniparthenope.it)
* **Università**: Università degli Studi di Napoli "Parthenope"

---

## 🚀 Come avviare il progetto

## 📋 Prerequisiti

Assicurati di avere installato sul tuo sistema:
* **Docker**
* **Docker Compose**

---
Per eseguire l'intero progetto:

1. **Clona il repository**:
2. **Esegui il commando**: ```bash docker-compose -f docker-compose.yml up -d
