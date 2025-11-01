// Importing React's useState hook for managing component state
import { useState } from 'react'
import { useAuth } from './security/AuthContext'

// Importing routing dependencies from react-router-dom
// - useNavigate: hook used to programmatically change routes
import {useNavigate} from 'react-router-dom'


// -------------------------
// Login Component
// -------------------------
export default function Login(){

    // State variables for the login form fields
    // useState() initializes state and provides setter functions
    const [username, setUsername] = useState('lianne24')
    const [password, setPassword] = useState('lia')
    
    // These state variables manage to show error messages
    const [showErrorMessage, setShowErrorMessage] = useState(false)

    // useNavigate hook gives access to navigation control
    // This allows redirecting the user to another page programmatically
    const navigate = useNavigate()

    // Access the authentication context
    const authContext = useAuth()

    // Event handler for username input changes
    // Updates state when the user types in the username field
    function handleUsernameChange(event) {
        setUsername(event.target.value)
    }

    // Event handler for password input changes
    // Updates state when the user types in the password field
    function handlePasswordChange(event){
        setPassword(event.target.value)
    }

    // Called when the Login button is clicked - It validates whether the entered username and password match
    // Uses a template literal to navigate dynamically to a personalized route (/home/<username>) after successful login
    // Depending on the result, it toggles the visibility of success or error messages.
    function handleSubmitEvent(){
        if (authContext.login(username, password)){
            navigate(`/home/${username}`) // Route with dynamic username parameter
        } else {
            setShowErrorMessage(true)
        }
    }

    return (
        <div className="Login">
            <h1>Enter your credentials to login</h1>       
            {showErrorMessage && <div className="errorAuthenticationMessage">Authentication Failed!</div>}
            <div className="LoginForm">
                <div>
                    <label>Username</label>
                    <input 
                        type="text" 
                        name="username" 
                        value={username} 
                        onChange={handleUsernameChange} // Updates username state
                    /> 
                </div>
                <div>
                    <label>Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        alue={password} 
                        onChange={handlePasswordChange} // Updates password state
                    />
                </div>
                
                <div>
                    <button type="button" name="login" onClick={handleSubmitEvent}>Login</button>
                </div>
            </div>
        </div>
    )
}
