// -------------------------
// List Books 
// -------------------------
// Displays a list of books with their completion status and target dates
export default function ListBooks(){

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
        <div className="container">
            <h1>Your Books:</h1>
            <div>
                {/* Renders a dynamic table from the books array */}
                <table className="table">
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
