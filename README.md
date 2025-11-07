# My Library App  
*A full-stack web application built with React, Spring Boot, and MySQL (Dockerized deployment)*  

---
## Quick Start

### Prerequisites
Make sure you have:
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
- (Optional) [Maven](https://maven.apache.org/) & [Node.js](https://nodejs.org/) if you want to run locally

### Run the App
From the project root:

bash> docker compose up --build

Then open:
- Frontend: http://localhost:3000/
- Backend API: http://localhost:8080/ 

To stop:
bash> docker compose down

---
## Demo Credentials

| Username  | Password |
|------------|-----------|
| `lianne24` | `lia`     |

Use these credentials to log in and test the full application flow (frontend + backend + database).
---
# Architecture Overview
┌──────────────────────────────────────┐
│              FRONTEND                │
│ React + Nginx (port 3000)            │
│ → Talks to Spring Boot REST API       │
└──────────────┬───────────────────────┘
               │  JSON / JWT Auth
┌──────────────┴───────────────────────┐
│              BACKEND                 │
│ Spring Boot 3 + JPA + JWT Security   │
│ Exposes /users/{username}/books APIs │
└──────────────┬───────────────────────┘
               │  JDBC
┌──────────────┴───────────────────────┐
│               MySQL                  │
│ Dockerized DB (port 3306)            │
│ Persists books & user data           │
└──────────────────────────────────────┘

---
# Project Structure

my-library-app/
├── backend-springboot/       # Spring Boot REST API
│   ├── src/main/java/com/rest/webservices/restfulwebservices/
│   │   ├── book/             # Entity, repository, service, controller
│   │   ├── jwt/              # JWT auth configuration
│   │   ├── authentication/   # Spring Security setup
│   │   └── RestfulWebServicesApplication.java
│   ├── Dockerfile
│   └── pom.xml
│
├── frontend-react/           # React frontend (Node + Nginx)
│   ├── src/                  # Components, context, pages
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml        # Orchestrates all 3 services
└── README.md

---
Tech Stack

| Layer        | Technology                                           | Description                |
| ------------ | ---------------------------------------------------- | -------------------------- |
| Frontend     | React 18, Axios, Formik, React Router, Bootstrap 5   | SPA UI & form handling     |
| Backend      | Spring Boot 3, Spring Security, JWT, Spring Data JPA | REST API & Authentication  |
| Database     | MySQL 8 (Dockerized)                                 | Persistent data storage    |
| DevOps       | Docker, Docker Compose                               | Multi-container deployment |

---
Authentication Flow (JWT)
1 - User logs in → frontend calls /authenticate
2 - Backend validates credentials and returns a JWT token
3 - React stores the token and attaches it to all API requests: Authorization: Bearer <token>
4 - Spring Boot verifies the token before processing requests

---
API Endpoints

| Method   | Endpoint                       | Description          |
| -------- | ------------------------------ | -------------------- |
| `POST`   | `/authenticate`                | Generate JWT token   |
| `GET`    | `/users/{username}/books`      | Get all books        |
| `GET`    | `/users/{username}/books/{id}` | Get single book      |
| `POST`   | `/users/{username}/books`      | Create new book      |
| `PUT`    | `/users/{username}/books/{id}` | Update existing book |
| `DELETE` | `/users/{username}/books/{id}` | Delete book          |

---
Future Enhancements 

- Refresh tokens for JWT
- User registration & roles
- Deploy to AWS / Azure
- Integration tests & GitHub Actions CI/CD
- Dashboard for reading progress

