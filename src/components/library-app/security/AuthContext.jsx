// Import React hooks needed for creating and using Context
// - createContext: to create a new Context object
// - useContext: to access Context values inside components
// - useState: to hold and update state variables within the provider
import { createContext, useContext, useState } from "react";

// -------------------------
// Create a Context
// -------------------------
// This creates a global data container called AuthContext
export const AuthContext = createContext()

// -------------------------
// Custom Hook: useAuth()
// -------------------------
// This hook provides a simpler and cleaner way for components to access the AuthContext
export const useAuth = () => useContext(AuthContext)

// -------------------------
// AuthProvider Component
// -------------------------
// This component wraps the entire app (or part of it) and provides
// authentication-related data and functions to all child components.
export default function AuthProvider({children}){

    // -------------------------
    // State variables stored in the Context
    // -------------------------

    // Authentication state: indicates whether a user is logged in or not.
    const [isAuthenticated, setAuthenticated] = useState(false)

    // -------------------------
    // New Function: login()
    // -------------------------
    // Validates credentials and updates authentication state.
    // - If username/password match, user is marked as authenticated.
    // - Returns true or false to indicate login success or failure.
    function login(username, password){
        if (username==='lianne24' && password==='lia'){
            setAuthenticated(true) // Set isAuthenticated to true if successful authentication
            return true
        } else {
            setAuthenticated(false) // Set isAuthenticated to false if unsuccessful authentication
            return false
        }
    }

    // -------------------------
    // New Function: logout()
    // -------------------------
    // Resets authentication state to false.
    function logout(){
        setAuthenticated(false)
    }

    // -------------------------
    // Provide Context values to child components
    // -------------------------
    return(
        <AuthContext.Provider value={ {isAuthenticated, setAuthenticated, login, logout} }>
            {children}
        </AuthContext.Provider>
    )
}