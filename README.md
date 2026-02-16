# 🌍 Language / Lingua
[English](#) | [Italiano](./README-it.md)

---

# Neighbour-Help

**Neighbour** is a platform designed to help people find nearby volunteers available for small practical tasks that don't require professional intervention. It aims to foster local community spirit and support elderly people or those living alone.

---

## 🛠 Tech Stack

The project was developed using the following technologies to ensure scalability and ease of deployment:

### Backend & Logic
* **Python**: Core language for application logic.
* **Flask**: Lightweight and flexible micro-framework for route and API management.
* **Gunicorn**: Production-grade WSGI HTTP Server to handle Python requests.

### Frontend
* **HTML5 & Bootstrap**: For a robust structure and responsive design (optimized for both mobile and desktop).
* **JavaScript**: To make the user interface dynamic and interactive.

### Infrastructure & Deployment
* **Docker**: The entire application is containerized to ensure consistency across development and production environments.
* **NGINX**: Used as a Reverse Proxy to manage web traffic, enhance security, and serve static files.

---

## 🏗 System Architecture

1.  **Client**: User's browser (JS/HTML/Bootstrap).
2.  **Web Server**: **NGINX** receives and routes requests.
3.  **Application Server**: **Gunicorn** acts as the interface between NGINX and Flask.
4.  **App**: The **Python/Flask** code processes data and business logic.

---

## 👨‍💻 Author

* **Name and Surname**: Antonio Boiano
* **Student ID**: 0124002905
* **Email**: [antonio.boiano001@studenti.uniparthenope.it](mailto:antonio.boiano001@studenti.uniparthenope.it)
* **University**: University of Naples "Parthenope"

---

## 🚀 Getting Started

### 📋 Prerequisites

Ensure you have the following installed on your system:
* **Docker**
* **Docker Compose**

---

### ⚙️ Startup Procedure

To run the entire project, follow these steps:

1.  **Clone the repository**:
    ```bash
    git clone <your-repo-url>
    cd neighbour-help
    ```

2.  **Run the Docker Compose command**:
    ```bash
    docker-compose -f docker-compose.yml up -d
    ```

> [!NOTE]
> **Database Initialization**: The first time you run `docker-compose`, the system will automatically initialize the database and load sample data to test the application's functionality.
> 
> **Test Credentials**: To simplify access, the default password for every user generated in the test database is **`Ciao1234`** (naturally, passwords are hashed in the database for security reasons).
