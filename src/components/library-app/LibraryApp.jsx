// Importing React's useState hook for managing component state
import { useState } from 'react'

// Importing the CSS file for styling the components
import './LibraryApp.css'

// Importing routing dependencies from react-router-dom
// - BrowserRouter: wraps the whole app and enables routing
// - Routes & Route: define the URL paths and the components to render
// - useNavigate: hook used to programmatically change routes
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom'

// The main component of the app — acts as a container for subcomponents
export default function LibraryApp(){
    return (
        <div className="LibraryApp">
            <BrowserRouter>
                <Routes>
                    {/* Each Route defines a URL path and which component to render */}
                    <Route path='/' element={<Login/> }></Route> {/* url: / */}
                    <Route path='/login' element={<Login/> }></Route> {/* url: /login */}
                    <Route path='/welcome' element={<Welcome/> }></Route> {/* url: /welcome */}
                    <Route path='*' element={<Error/> }></Route> {/* url: any url that does not match the previous */}
                </Routes>
            </BrowserRouter>
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

    // useNavigate hook gives access to navigation control
    // This allows redirecting the user to another page programmatically
    const navigate = useNavigate()

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
            navigate('/welcome') //Navigate to /welcome route after successful authentication
        } else {
            setShowSuccessMessage(false)
            setShowErrorMessage(true)
        }
    }

    return (
        <div className="Login">
            <h1>Enter your credentials to login</h1>       
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
            <h1>Welcome to Your Library</h1>
            <div>
                Welcome Component
            </div>
        </div>
    )
}

// -------------------------
// Error Component
// -------------------------
function Error(){
    return (
        <div className="ErrorComponent">
            <h1>Page Not Available</h1>
            <div>Error 404</div>
        </div>
    )
}