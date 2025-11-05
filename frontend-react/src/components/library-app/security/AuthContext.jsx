// Import React hooks needed for creating and using Context
import { createContext, useContext, useState } from "react";
import { jwtAuthenticationService } from "../api/AuthenticationApiService";
import { setupAxiosInterceptors } from "../api/BookApiService";

// Create a Context
export const AuthContext = createContext()

// useAuth() provides a simpler and cleaner way for components to access the AuthContext
export const useAuth = () => useContext(AuthContext)

// AuthProvider Component - wraps the entire app (or part of it) and provides authentication-related data and functions to all child components
export default function AuthProvider({children}){

    // Authentication state: indicates whether a user is logged in or not.
    const [isAuthenticated, setAuthenticated] = useState(false)

    // Store the current logged-in user's username
    const [username, setUsername] = useState(null)

    // Store the current JWT token ("Bearer <token>")
    const[token, setToken] = useState(null)

    // Handle authentication using the backend JWT endpoint
    async function login(username, password){

        try {
            // Send login request (username, password) to the backend JWT authentication endpoint to `/authenticate`
            const response = await jwtAuthenticationService(username, password)
                                
            // If server returns HTTP 200, login is successful
            if (response.status==200){

                // Construct the Bearer token format expected by Spring Security
                const jwtToken = 'Bearer ' + response.data.token

                // Update authentication state and store user details
                setAuthenticated(true) // Set isAuthenticated to true if successful authentication
                setUsername(username) // Store username for later use
                setToken(jwtToken) // Save generated token for later use
                setupAxiosInterceptors(jwtToken) //Attach token to every future API call
                return true
            } else {
                logout() // Reset authentication on unexpected status
                return false
            } 
        } catch (error) {
            logout() // Reset authentication if error occurs
            return false
        }
    }

    // Resets authentication state to false.
    function logout(){
        setAuthenticated(false) // Set isAuthenticated to false 
        setUsername(null) // Clear username
        setToken(null) // Clear token
    }

    // Provide Context values to child components
    return(
        <AuthContext.Provider value={ {isAuthenticated, setAuthenticated, login, logout, username, token} }>
            {children}
        </AuthContext.Provider>
    )
}