// Importing routing dependencies from react-router-dom
import {Link} from 'react-router-dom'

// -------------------------
// Navigation Bar Component
// -------------------------
export default function NavigationBar(){
    return (
        <header className="border-bottom border-light border-5 mb-5 p-2">
            <div className="container">
                <div className="row">
                    <nav className="navbar navbar-expand-lg">
                        <div className="navbar-brand ms-2 fs-2 fw-bold text-black">MyLibrary</div>
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav">
                                <li className="nav-item fs-5"><Link className="nav-link" to="/home/lianne24">Home</Link></li>
                                <li className="nav-item fs-5"><Link className="nav-link" to="/books">Books</Link></li>
                            </ul>
                        </div>
                        <ul className="navbar-nav">
                            <li className="nav-item fs-5"><Link className="nav-link" to="/logout">Logout</Link></li>
                            <li className="nav-item fs-5"><Link className="nav-link" to="/">Login</Link></li>
                        </ul>                       
                    </nav>
                </div>
            </div>
        </header>
    )
}