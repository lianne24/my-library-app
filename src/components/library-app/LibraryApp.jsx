// Importing the CSS file for styling the components
import './LibraryApp.css'

// Importing routing dependencies from react-router-dom
// - BrowserRouter: wraps the whole app and enables routing
// - Routes & Route: define the URL paths and the components to render
// - Navigate: used to redirect users programmatically
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

// Import application components
import Login from './Login'
import Logout from './Logout'
import NavigationBar from './NavigationBar'
import ListBooks from './ListBooks'
import Error from './Error'
import Home from './Home'

// Import authentication provider and hook
import AuthProvider, { useAuth } from './security/AuthContext'

// -------------------------
// AuthenticatedRoute Component
// -------------------------
// This helper component protects specific routes so they can only be accessed
// if the user is authenticated. Otherwise, it redirects to the login page.
function AuthenticatedRoute({children}){

    // Access the authentication context
    const authContext = useAuth()

    // If the user is authenticated, render the requested component (children)
    if(authContext.isAuthenticated)
        return children

    // If not authenticated, redirect to the login page ("/")
    return <Navigate to="/" />
}
 
// The main component of the app — acts as a container for subcomponents
export default function LibraryApp(){
    return (
        <div className="LibraryApp">
            <AuthProvider>
                <BrowserRouter>
                <NavigationBar />
                    <Routes>
                        {/* Each Route defines a URL path and which component to render */}
                        <Route path='/' element={<Login/> } /> {/* url: / */}
                        <Route path='/login' element={<Login/> } /> {/* url: /login */}

                        {/* Protected routes (require authentication) */}
                        {/* Uses <AuthenticatedRoute> to guard access */}
                        <Route path='/home/:username' element={
                            <AuthenticatedRoute>
                                <Home/> 
                            </AuthenticatedRoute>
                        } /> {/* url: /home/username */}

                        <Route path='/books' element={
                            <AuthenticatedRoute>
                                <ListBooks/> 
                            </AuthenticatedRoute>
                        } /> {/* url: /books */}
                        <Route path='/logout' element={
                            <AuthenticatedRoute>
                                <Logout/>
                            </AuthenticatedRoute> 
                        } /> {/* url: /logout */}

                        {/* Catch-all route for invalid or undefined URLs */}
                        <Route path='*' element={<Error/> } /> 
                    </Routes>
                </BrowserRouter>   
            </AuthProvider>     
        </div>
        
    )
}









