// Import React hooks needed for creating and using Context
import { createContext, useContext, useState } from "react";

// Create a Context
export const AuthContext = createContext()

// useAuth() provides a simpler and cleaner way for components to access the AuthContext
export const useAuth = () => useContext(AuthContext)

// AuthProvider Component - wraps the entire app (or part of it) and provides authentication-related data and functions to all child components
export default function AuthProvider({children}){

    // Authentication state: indicates whether a user is logged in or not.
    const [isAuthenticated, setAuthenticated] = useState(false)

    // username: stores the current logged-in user's username
    const [username, setUsername] = useState(null)

    // Validates credentials and updates authentication state.
    function login(username, password){
        if (username==='lianne24' && password==='lia'){
            setAuthenticated(true) // Set isAuthenticated to true if successful authentication
            setUsername(username) // Store username for later use
            return true
        } else {
            setAuthenticated(false) // Set isAuthenticated to false if unsuccessful authentication
            setUsername(null) // Clear username
            return false
        }
    }

    // Resets authentication state to false.
    function logout(){
        setAuthenticated(false)
        setUsername(null)
    }

    // Provide Context values to child components
    return(
        <AuthContext.Provider value={ {isAuthenticated, setAuthenticated, login, logout, username} }>
            {children}
        </AuthContext.Provider>
    )
}