// Importing React's useState hook for managing component state
import { useState } from 'react'

// Importing the CSS file for styling the components
import './LibraryApp.css'

// The main component of the app — acts as a container for subcomponents
export default function LibraryApp(){
    return (
        <div className="LibraryApp">
            
            {/* Render the Login component (currently active) */}
            <Login/>

            {/* <Welcome/> */}
        </div>
        
    )
}

// -------------------------
// Login Component
// -------------------------
function Login(){

    // State variables for the login form fields
    // useState() initializes state and provides setter functions
    const [username, setUsername] = useState('lianne24')
    const [password, setPassword] = useState('lia')
    
    // These state variables manage whether to show success or error messages
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const [showErrorMessage, setShowErrorMessage] = useState(false)

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
    // predefined correct values ("lianne24" and "lia").
    // Depending on the result, it toggles the visibility of success or error messages.
    function handleSubmitEvent(){
        if (username==='lianne24' && password==='lia'){
            setShowSuccessMessage(true)
            setShowErrorMessage(false)
        } else {
            setShowSuccessMessage(false)
            setShowErrorMessage(true)
        }
    }

    return (
        <div className="Login">       
            {showSuccessMessage && <div className="successAuthenticationMessage">Authentication Successfully!</div>}    
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

// -------------------------
// Welcome Component
// -------------------------
function Welcome(){
    return (
        <div className="Welcome">
            Welcome Component
        </div>
    )
}