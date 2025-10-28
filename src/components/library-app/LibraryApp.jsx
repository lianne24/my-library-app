export default function LibraryApp(){
    return (
        <div className="LibraryApp">
            Library App
            <Login/>
            <Welcome/>
        </div>
        
    )
}

function Login(){
    return (
        <div className="Login">
            Login Component
        </div>
    )
}

function Welcome(){
    return (
        <div className="Welcome">
            Welcome Component
        </div>
    )
}