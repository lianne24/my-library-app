// Importing routing dependencies from react-router-dom
import {useParams} from 'react-router-dom'

// Import API function for retrieving a single book by username and ID
import { retrieveBookApi } from './api/BookApiService'

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

    // Access the authentication context to get current user information
    const authContext = useAuth()

    // Extract the username of the currently authenticated user
    const username = authContext.username

    // Runs when the component mounts or when the "id" changes
    useEffect(
        () => retrieveBook, [id]
    )

    // Calls the backend REST API to get book details for the given username and ID
    function retrieveBook(){
        retrieveBookApi(username, id)
            .then(response => {
                setDescription(response.data.description) // Updates local state variable description
                settargetDate(response.data.targetDate) // Updates local state variable targetDate
            })
            .catch(error => console.log(error))
    }

    // This will later call an API endpoint to save changes.
    function onSubmit(values){

    }

    // Performs form validation to ensure all required fields have valid data
    function validate(values){
        let errors = {}

        // Validate description: must be at least 3 characters
        if(values.description.length<3)
            errors.description = 'Enter at least 3 characters'

        // Validate target date: ensure it's not empty or invalid
        if(values.targetDate.length==null)
            errors.targetDate = 'Enter a valid target date'

        return errors
    }

    // JSX (UI Rendering) - Renders a form to edit the book details
    return(
        <div className="container">
            <h1>Enter Book Details</h1>
            <div>
                <Formik initialValues={{description, targetDate}} // Initial values are populated from the component state
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