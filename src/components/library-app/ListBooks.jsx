// -------------------------
// List Books 
// -------------------------
// This component retrieves and displays a list of books for a user.
// It also allows deleting books and automatically refreshes the table after deletion.

import { useEffect, useState } from "react"

// Import API functions for retrieving and deleting books
import { retrieveAllBooksForUsernameApi, deleteBookApi } from "./api/BookApiService"

// -------------------------
// Main Component: ListBooks
// -------------------------
export default function ListBooks(){

    // -------------------------
    // React State Hooks
    // -------------------------
    const [books, setBooks] = useState([]) // books: array holding all books retrieved from the backend API

    const [message, setMessage] = useState(null) // message: string used to show feedback (like successful deletion)

    // -------------------------
    // useEffect Hook
    // -------------------------
    // Calls updateBooks() to fetch the initial list of books from the backend, executes only once after the component mounts
    useEffect ( () => updateBooks(), [])

    // -------------------------
    // Function: updateBooks
    // -------------------------
    // Fetches all books for the hardcoded user 'lianne24' from the backend.
    // If successful → stores the list of books in state.
    // If there's an error → logs it to the console.
    function updateBooks(){
        
        retrieveAllBooksForUsernameApi('lianne24')
            .then(response => {
                setBooks(response.data) // Save the fetched books in component state
            }
            )
            .catch(error => console.log(error))

    }

    // -------------------------
    // Function: deleteBook
    // -------------------------
    // Deletes a specific book by ID for the same user.
    // After deletion → shows a message and refreshes the book list.
    function deleteBook(id){
        deleteBookApi('lianne24', id)
        .then(
            
            () => {
                setMessage(`Book with id ${id} deleted successfully!`) // Set success message for user feedback
                updateBooks() // Refresh list to reflect the deletion
            }
        )
        .catch(error => console.log(error))
    }

    // -------------------------
    // JSX (UI Rendering)
    // -------------------------
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
