
// BookApiService.js - defines helper functions to interact with the Spring Boot REST API (running on port 8080)
// Centralize all backend requests and uses Axios interceptors to include the Basic Authentication token in headers

import axios from "axios";

// Base URL of the Spring Boot backend API (running on port 8080)
const API_BASE_URL = 'http://localhost:8080'

// Create reusable axios instance to attach the authorization header
export const apiClient = axios.create()

// Set up the Axios interceptor to inject the Authorization header dynamically
export const setupAxiosInterceptors = (token) => {
    apiClient.interceptors.request.use(
        (config) => {
            config.headers.Authorization = token
            return config       
        }
    )}

// Send a GET request to a test endpoint (/basicauth) to verify credentials
export const basicAuthenticationService = (token) =>
    apiClient.get(`${API_BASE_URL}/basicauth`, {
        headers: { Authorization: token }
    })

// Retrieve All Books for a User with a GET request to backend endpoint
export const retrieveAllBooksForUsernameApi 
    = (username) => apiClient.get(`${API_BASE_URL}/users/${username}/books`)

// Delete a Specific Book for a User with a DELETE request sent to backend endpoint
export const deleteBookApi 
    = (username, id) => apiClient.delete(`${API_BASE_URL}/users/${username}/books/${id}`)

// Retrieve detailed information for a single book (used for editing)
export const retrieveBookApi 
    = (username, id) => apiClient.get(`${API_BASE_URL}/users/${username}/books/${id}`)

// Update an existing book with new information provided in the request body
export const updateBookApi 
    = (username, id, book) => apiClient.put(`${API_BASE_URL}/users/${username}/books/${id}`, book)

// Create a new book with information provided in the request body
export const createBookApi 
    = (username, book) => apiClient.post(`${API_BASE_URL}/users/${username}/books`, book)
