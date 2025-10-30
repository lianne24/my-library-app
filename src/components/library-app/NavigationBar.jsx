// Importing routing dependencies from react-router-dom
import {Link} from 'react-router-dom'

// Importing the custom authentication context hook
// - useAuth provides access to global authentication state and functions
import { useAuth } from './security/AuthContext'


// -------------------------
// Navigation Bar Component
// -------------------------
// This component renders the top navigation bar.
// It conditionally displays links based on whether the user is logged in.
export default function NavigationBar(){

    // Access the authentication context
    const authContext = useAuth()

    // Extract authentication state for easier reference
    const isAuthenticated = authContext.isAuthenticated

    // Function called when the user clicks "Logout"
    // - Updates authentication state to false
    // - This will cause the navigation bar to re-render,
    //   hiding authenticated-only links and showing the Login link
    function logout(){
        authContext.setAuthenticated(false)
    }

    // -------------------------
    // UI layout
    // -------------------------
    return (
        <header className="border-bottom border-light border-5 mb-5 p-2">
            <div className="container">
                <div className="row">
                    <nav className="navbar navbar-expand-lg">
                        <div className="navbar-brand ms-2 fs-2 fw-bold text-black">MyLibrary</div>
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav">
                                <li className="nav-item fs-5">
                                    {isAuthenticated && <Link className="nav-link" to="/home/lianne24">Home</Link>}
                                </li>
                                <li className="nav-item fs-5">
                                    {isAuthenticated && <Link className="nav-link" to="/books">Books</Link>}                                   
                                </li>
                            </ul>
                        </div>
                        <ul className="navbar-nav">
                            <li className="nav-item fs-5">
                                {isAuthenticated && <Link className="nav-link" to="/logout" onClick={logout}>Logout</Link>}
                            </li>
                            <li className="nav-item fs-5">
                                {!isAuthenticated && <Link className="nav-link" to="/">Login</Link>}
                            </li>
                        </ul>                       
                    </nav>
                </div>
            </div>
        </header>
    )
}