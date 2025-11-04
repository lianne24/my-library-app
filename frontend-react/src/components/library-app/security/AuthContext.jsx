// Import React hooks needed for creating and using Context
import { createContext, useContext, useState } from "react";
import { basicAuthenticationService } from "../api/BookApiService";
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

    // Store the Basic Authentication token (Base64 encoded credentials)
    const[token, setToken] = useState(null)

    // Validates credentials by sending a Basic Auth request to backend (/basicauth)
    async function login(username, password){

        // Generate a Basic Authentication header value using "Basic <base64(username:password)>"
        const basicToken = 'Basic ' + window.btoa(username + ":" + password)

        try {
            // Call the backend authentication endpoint
            const response = await basicAuthenticationService(basicToken)
                                
            // If server returns HTTP 200, login is successful
            if (response.status==200){
                setAuthenticated(true) // Set isAuthenticated to true if successful authentication
                setUsername(username) // Store username for later use
                setToken(basicToken) // Save generated token for later use
                setupAxiosInterceptors(basicToken) //Attach token to every future API call
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