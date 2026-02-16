# Neighbour-Help

**Neighbour** permette di trovare nelle proprie vicinanze persone disponibili a offrire piccoli aiuti pratici, che non richiedono l’intervento di un professionista,
promuovendo così la comunità locale e supportando in particolare persone anziane o che vivono da sole.

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

### ⚙️ Procedura di Avvio

Per eseguire l'intero progetto, segui questi passaggi:

1.  **Clona il repository**:
    ```bash
    git clone <url-del-repo>
    cd neighbour-help
    ```

2.  **Esegui il comando Docker Compose**:
    ```bash
    docker-compose -f docker-compose.yml up -d
    ```

> [!NOTE]
> **Inizializzazione Database**: La prima volta che si esegue il comando `docker-compose`, verrà automaticamente inizializzato il database caricando dei dati di test per testare il funzionamento.
> 
> **Credenziali di Test**: Per facilitare l'accesso, la password predefinita per ogni utente generato nel database di test è **`Ciao1234`** (ovviamente nel database è hashata per una questione di sicurezza).
