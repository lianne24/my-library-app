// -------------------------
// List Books - retrieves and displays a list of books for a user.
// -------------------------

import { useEffect, useState } from "react"

// Import API functions for retrieving and deleting books
import { retrieveAllBooksForUsernameApi, deleteBookApi } from "./api/BookApiService"
import { useAuth } from "./security/AuthContext"
import { useNavigate } from "react-router-dom"

// Main Component: ListBooks
export default function ListBooks(){

    // Access the authentication context to get current user information
    const authContext = useAuth()

    // Extract the username of the currently authenticated user
    const username = authContext.username

    // React State Hooks
    const [books, setBooks] = useState([]) // books: array holding all books retrieved from the backend API

    const [message, setMessage] = useState(null) // message: string used to show feedback (like successful deletion)

    const navigate = useNavigate() // This allows redirecting the user to another page
    
    // useEffect Hook - calls updateBooks() to fetch the initial list of books from the backend, executes only once after the component mounts
    useEffect ( () => updateBooks(), [])

    // Fetches all books for the username from the backend.
    function updateBooks(){
        
        retrieveAllBooksForUsernameApi(username)
            .then(response => {
                setBooks(response.data) // Save the fetched books in component state
            }
            )
            .catch(error => console.log(error))

    }

    // Deletes a specific book by ID for the same user.
    function deleteBook(id){
        deleteBookApi(username, id)
        .then(
            
            () => {
                setMessage(`Book with id ${id} deleted successfully!`) // Set success message for user feedback
                updateBooks() // Refresh list to reflect the deletion
            }
        )
        .catch(error => console.log(error))
    }

    // Updates a specific book by ID for the same user.
    function updateBook(id){
        navigate(`/book/${id}`) // Route with dynamic id parameter
    }

    // JSX (UI Rendering)
    return (
        <div className="container">
            <h1>Your Books</h1>

            {/* Display feedback message if a book was deleted */}
            {message && <div className="alert alert-warning">{message}</div>}
            <div>
                {/* Renders a dynamic table from the books array */}
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Is completed?</th>
                            <th>Target Date</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                    {   
                        // Loops through books and creates one row per book
                        books.map(
                            book => (
                                <tr key={book.id}>
                                    <td>{book.description}</td>
                                    <td>{book.done.toString()}</td>
                                    <td>{book.targetDate.toString()}</td>
                                    <td> <button className="btn btn-warning" onClick={() => deleteBook(book.id)}>Delete</button></td>
                                    <td> <button className="btn btn-success" onClick={() => updateBook(book.id)}>Update</button></td>
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
