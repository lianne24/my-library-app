// Importing the CSS file for styling the components
import './LibraryApp.css'

// Importing routing dependencies from react-router-dom
// - BrowserRouter: wraps the whole app and enables routing
// - Routes & Route: define the URL paths and the components to render
import {BrowserRouter, Routes, Route} from 'react-router-dom'

// Import components
import Login from './Login'
import Logout from './Logout'
import NavigationBar from './NavigationBar'
import ListBooks from './ListBooks'
import Error from './Error'
import Home from './Home'
 
// The main component of the app — acts as a container for subcomponents
export default function LibraryApp(){
    return (
        <div className="LibraryApp">
            <BrowserRouter>
            <NavigationBar />
                <Routes>
                    {/* Each Route defines a URL path and which component to render */}
                    <Route path='/' element={<Login/> } /> {/* url: / */}
                    <Route path='/login' element={<Login/> } /> {/* url: /login */}

                    {/* Route now passes username dynamically via a route parameter (:username) */}
                    <Route path='/home/:username' element={<Home/> } /> {/* url: /home/username */}
                    <Route path='/books' element={<ListBooks/> } /> {/* url: /books */}
                    <Route path='/logout' element={<Logout/> } /> {/* url: /logout */}
                    <Route path='*' element={<Error/> } /> {/* Added catch-all route for non-existent pages */}
                </Routes>
            </BrowserRouter>        
        </div>
        
    )
}









