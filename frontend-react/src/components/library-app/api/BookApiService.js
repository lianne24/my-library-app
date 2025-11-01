// -------------------------
// BookApiService.js
// -------------------------
// This file defines helper functions to interact with the Spring Boot REST API.
// It uses Axios to send HTTP requests to retrieve and delete books for a user.

import axios from "axios";

// Base URL of the Spring Boot backend API (running on port 8080)
const API_BASE_URL = 'http://localhost:8080'

// -------------------------
// Retrieve All Books for a User
// -------------------------
// Sends a GET request to the backend endpoint:
//    GET http://localhost:8080/users/{username}/books
// Returns a Promise that resolves with the list of books for the given username.
export const retrieveAllBooksForUsernameApi 
    = (username) => axios.get(`${API_BASE_URL}/users/${username}/books`)

// -------------------------
// Delete a Specific Book for a User
// -------------------------
// Sends a DELETE request to the backend endpoint:
// DELETE http://localhost:8080/users/{username}/books/{id}
// Returns a Promise that resolves when the book is successfully deleted.
export const deleteBookApi 
    = (username, id) => axios.delete(`${API_BASE_URL}/users/${username}/books/${id}`)