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
## Architecture Overview

<img width="329" height="413" alt="Architecture Overview" src="https://github.com/user-attachments/assets/3843fc4a-c061-4264-95f3-f109211508af" />

---
## Project Structure

<img width="569" height="422" alt="Project Structure" src="https://github.com/user-attachments/assets/a6c7f834-5f58-42bd-ac2c-1c175e2cc591" />

---
## Tech Stack

| Layer        | Technology                                           | Description                |
| ------------ | ---------------------------------------------------- | -------------------------- |
| Frontend     | React 18, Axios, Formik, React Router, Bootstrap 5   | SPA UI & form handling     |
| Backend      | Spring Boot 3, Spring Security, JWT, Spring Data JPA | REST API & Authentication  |
| Database     | MySQL 8 (Dockerized)                                 | Persistent data storage    |
| DevOps       | Docker, Docker Compose                               | Multi-container deployment |

---
## Authentication Flow (JWT)
1 - User logs in → frontend calls /authenticate
2 - Backend validates credentials and returns a JWT token
3 - React stores the token and attaches it to all API requests: Authorization: Bearer <token>
4 - Spring Boot verifies the token before processing requests

---
## API Endpoints

| Method   | Endpoint                       | Description          |
| -------- | ------------------------------ | -------------------- |
| `POST`   | `/authenticate`                | Generate JWT token   |
| `GET`    | `/users/{username}/books`      | Get all books        |
| `GET`    | `/users/{username}/books/{id}` | Get single book      |
| `POST`   | `/users/{username}/books`      | Create new book      |
| `PUT`    | `/users/{username}/books/{id}` | Update existing book |
| `DELETE` | `/users/{username}/books/{id}` | Delete book          |

---
## Future Enhancements 

- Refresh tokens for JWT
- User registration & roles
- Deploy to AWS / Azure
- Integration tests & GitHub Actions CI/CD
- Dashboard for reading progress


