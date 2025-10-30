// Importing routing dependencies from react-router-dom
import {useParams, Link} from 'react-router-dom'

// -------------------------
// Home Component
// -------------------------
export default function Home(){

    // Extracts the "username" from the route (e.g., /home/lianne24)
    const {username} = useParams()

    return (
        <div className="Home">

            {/* Displays the username dynamically in the welcome message */}
            <h1>Welcome {username}</h1>

            {/* Link to navigate to the Books page */}
            <div>
                Your <Link to="/books">Books</Link>
            </div>
        </div>
    )
}