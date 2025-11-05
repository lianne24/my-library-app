import axios from "axios";

// Base URL of the Spring Boot backend API (running on port 8080)
const API_BASE_URL = 'http://localhost:8080'

// Create reusable axios instance to attach the authorization header
export const apiClient = axios.create()

// JWT Authentication Service - send a POST request to the backend `/authenticate` endpoint with username and password
// If authentication is successful, the backend responds with a signed JWT token in the response body
export const jwtAuthenticationService = (username, password) =>
    apiClient.post(`${API_BASE_URL}/authenticate`, {username, password})

