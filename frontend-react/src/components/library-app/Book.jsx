// Importing routing dependencies from react-router-dom
import {useNavigate, useParams} from 'react-router-dom'

// Import API function for retrieving a single book by username and ID
import { retrieveBookApi, updateBookApi } from './api/BookApiService'

// Import authentication context to access the logged-in user's username
import { useAuth } from './security/AuthContext'

// Import React hooks for state management and side effects
import { useEffect, useState } from 'react'

// Import Formik library components for the form to update book information
import {Formik, Form, Field, ErrorMessage} from 'formik'

// This component displays and edits the details of a specific book retrieved from REST API using the book id
export default function Book(){

    // Extracts the "id" from the route
    const {id} = useParams()

    // description: stores the book title/description fetched from backend
    const [description, setDescription] = useState('')

    // Extract the username of the authenticated user
    const [targetDate, settargetDate] = useState('')

    // Extract the username of the authenticated user
    const [done, setDone] = useState(false)

    // Access the authentication context to get current user information
    const authContext = useAuth()

    // Extract the username of the currently authenticated user
    const username = authContext.username

    // This allows redirecting the user to another page
    const navigate = useNavigate()

    // Run when the component mounts or when the "id" changes
    useEffect(
        () => retrieveBook, [id]
    )

    // Call the backend REST API to get book details for the given username and ID
    function retrieveBook(){
        retrieveBookApi(username, id)
            .then(response => {
                setDescription(response.data.description) // Updates local state variable description
                settargetDate(response.data.targetDate) // Updates local state variable targetDate
                setDone(response.data.done)
            })
            .catch(error => console.log(error))
    }

    // Build a "book" object from the form values and sends it to the backend
    function onSubmit(values){

        // Build the updated book object the way the backend expects it
        const book = {
            id: id,
            username: username,
            description: values.description,
            targetDate: values.targetDate, 
            done: values.done
        }

        // Send PUT request to update the book on the backend
        updateBookApi(username, id, book)
            .then(response => {
                navigate('/books') // After saving, go back to the main books list
            })
            .catch(error => console.log(error))       
    }

    // Perform form validation to ensure all required fields have valid data
    function validate(values){
        let errors = {}

        // Validate description: must be at least 3 characters
        if(values.description.length<3)
            errors.description = 'Enter at least 3 characters'

        // Validate target date: ensure it's not empty or invalid
        if(values.targetDate==null)
            errors.targetDate = 'Enter a valid target date'

        // Validate completion status: ensure it's true or false
        if(values.done==null)
            errors.done = 'Done must be either "true" or "false"'

        return errors
    }

    // JSX (UI Rendering) - Render a form to edit the book details
    return(
        <div className="container">
            <h1>Enter Book Details</h1>
            <div>
                <Formik initialValues={{description, targetDate, done:done.toString()}} // Initial values are populated from the component state
                    enableReinitialize={true} // Reinitializes the form when the state updates     
                    onSubmit={onSubmit} // Form submission handler
                    validate={validate} // Validation logic
                    validateOnChange={false}  // Disables validation on field change for smoother UX
                    validateOnBlur={false}    // Disables validation on field blur for smoother UX
                >
                {
                    (props) => (
                        <Form>
                            {/* Displays validation error for description */}
                            <ErrorMessage 
                                name="description"
                                component="div"
                                className="alert alert-warning"
                            />

                            {/* Input field for book description */}
                            <fieldset className="form-group">
                                <label>Description</label>
                                <Field type="text" className="form-control" name="description"/>
                            </fieldset>

                            {/* Input field for target completion date */}
                             <fieldset className="form-group">
                                <label>Target Date</label>
                                <Field type="date" className="form-control" name="targetDate"/>
                            </fieldset>

                            {/* Input field for completion status */}
                             <fieldset className="form-group">
                                <label>Done</label>
                                <Field as="select" className="form-control" name="done"> 
                                    <option value="true">true</option>
                                    <option value="false">false</option>
                                </Field>
                            </fieldset>

                            {/* Submit button for saving book details */}
                            <div>
                                <button className="btn btn-success m-5" type="submit">Save</button>
                            </div>
                        </Form>
                    )
                }
                </Formik>
            </div>
        </div>
    )
}