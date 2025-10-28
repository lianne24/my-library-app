export default function LibraryApp(){
    return (
        <div className="LibraryApp">
            {/* Library App */}
            <Login/>
            {/* <Welcome/> */}
        </div>
        
    )
}

function Login(){
    return (
        <div className="Login">
            <div className="LoginForm">
                <div>
                    <label>Username</label>
                    <input type="text" name="username" />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" />
                </div>
                <div>
                    <button type="button" name="login">Login</button>
                </div>
            </div>
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