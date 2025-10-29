// Importing React's useState hook for managing component state
import { useState } from 'react'

// Importing the CSS file for styling the components
import './LibraryApp.css'

// Importing routing dependencies from react-router-dom
// - BrowserRouter: wraps the whole app and enables routing
// - Routes & Route: define the URL paths and the components to render
// - useNavigate: hook used to programmatically change routes
// - useParams: used to extract route parameters (e.g., username from /welcome/:username)
// - Link: used to create internal navigation links between routes
import {BrowserRouter, Routes, Route, useNavigate, useParams, Link} from 'react-router-dom'

// The main component of the app — acts as a container for subcomponents
export default function LibraryApp(){
    return (
        <div className="LibraryApp">
            <BrowserRouter>
                <Routes>
                    {/* Each Route defines a URL path and which component to render */}
                    <Route path='/' element={<Login/> } /> {/* url: / */}
                    <Route path='/login' element={<Login/> } /> {/* url: /login */}

                    {/* Route now passes username dynamically via a route parameter (:username) */}
                    <Route path='/welcome/:username' element={<Welcome/> } /> {/* url: /welcome/username */}
                    <Route path='/books' element={<ListBooksComponent/> } /> {/* url: /books */}
                    <Route path='*' element={<Error/> } /> {/* Added catch-all route for non-existent pages */}
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
    // Uses a template literal to navigate dynamically to a personalized route (/welcome/<username>) after successful login
    // Depending on the result, it toggles the visibility of success or error messages.
    function handleSubmitEvent(){
        if (username==='lianne24' && password==='lia'){
            setShowSuccessMessage(true)
            setShowErrorMessage(false)
            navigate(`/welcome/${username}`) // Route with dynamic username parameter
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

    // Extracts the "username" from the route (e.g., /welcome/lianne24)
    const {username} = useParams()

    return (
        <div className="Welcome">

            {/* Displays the username dynamically in the welcome message */}
            <h1>Welcome {username}</h1>

            {/* Link to navigate to the Books page */}
            <div>
                Your <Link to="/books">Books</Link>
            </div>
        </div>
    )
}

// -------------------------
// Error Component
// -------------------------
// Shown for unmatched routes (404 handling)
function Error(){
    return (
        <div className="ErrorComponent">
            <h1>Page Not Available</h1>
            <div>Error 404</div>
        </div>
    )
}

// -------------------------
// ListBooksComponent
// -------------------------
// Displays a list of books with their completion status and target dates
function ListBooksComponent(){

     // Creates target dates for random book deadlines
    const today = new Date()
    const targetDate = new Date(today.getMonth()+2)

    // Sample array of book data to display in a table for initial app version
    const books = [
                    {id:1, name: 'The Lord of the Rings', completed: false, targetDate: targetDate},
                    {id:2, name: 'To Kill a Mockingbird', completed: false, targetDate: targetDate},
                    {id:3, name: 'One Hundred Years of Solitude', completed: false, targetDate: targetDate}
                ]

    return (
        <div className="ListBooksComponent">
            <h1>Your Books:</h1>
            <div>
                {/* Renders a dynamic table from the books array */}
                <table>
                    <thead>
                        <tr>
                            <td>Id</td>
                            <td>Name</td>
                            <td>Is completed?</td>
                            <td>Target Date</td>
                        </tr>
                    </thead>
                    <tbody>
                    {   
                        // Loops through books and creates one row per book
                        books.map(
                            book => (
                                <tr key={book.id}>
                                    <td>{book.id}</td>
                                    <td>{book.name}</td>
                                    <td>{book.completed.toString()}</td>
                                    <td>{book.targetDate.toDateString()}</td>
                                </tr>
                            )
                        )
                    }    
                    </tbody>
                </table>
            </div>
        </div>
    )
}