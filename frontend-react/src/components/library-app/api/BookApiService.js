
// BookApiService.js - defines helper functions to interact with the Spring Boot REST API

import axios from "axios";

// Base URL of the Spring Boot backend API (running on port 8080)
const API_BASE_URL = 'http://localhost:8080'

// Retrieve All Books for a User with a GET request to backend endpoint
export const retrieveAllBooksForUsernameApi 
    = (username) => axios.get(`${API_BASE_URL}/users/${username}/books`)

// Delete a Specific Book for a User with a DELETE request sent to backend endpoint
export const deleteBookApi 
    = (username, id) => axios.delete(`${API_BASE_URL}/users/${username}/books/${id}`)

// Retrieve detailed information for a single book (used for editing)
export const retrieveBookApi 
    = (username, id) => axios.get(`${API_BASE_URL}/users/${username}/books/${id}`)

// Update an existing book with new information provided in the request body
export const updateBookApi 
    = (username, id, book) => axios.put(`${API_BASE_URL}/users/${username}/books/${id}`, book)

// Create a new book with information provided in the request body
export const createBookApi 
    = (username, book) => axios.post(`${API_BASE_URL}/users/${username}/books`, book)