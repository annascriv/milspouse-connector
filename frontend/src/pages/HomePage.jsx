import { useState } from "react"
import { LoginForm } from "../components/LoginForm"
import { SignupForm } from "../components/SignupForm"
import { LogoutButton } from "../components/LogoutButton"
import Button from "react-bootstrap/esm/Button"

export const HomePage = () => {

    const [showLogin, setShowLogin] = useState(false)
    const [showSignup, setShowSignup] = useState(false)

    return (
        <>
        <div style={{textAlign:"center", marginTop:"2vmin"}}>
        <h1>Spouse Connector Project</h1>
        <Button style={{margin:"5vmin"}} onClick={(e)=>setShowLogin(!showLogin)}>Login</Button>
        <Button onClick={(e)=>setShowSignup(!showSignup)}>Sign Up</Button>
        </div>
        {showLogin ?
        (<div style={{margin:"10vmin"}}>
        <h1>Welcome Back</h1>
        <LoginForm/>
        <Button style={{marginTop:"2vmin"}} onClick={(e)=>setShowLogin(!showLogin)}>Cancel</Button>
        </div>)
        : "" }
                {showSignup ?
        (<div style={{margin:"10vmin"}}>
        <h1>Welcome</h1>
        <SignupForm/>
        <Button style={{marginTop:"2vmin"}} onClick={(e)=>setShowSignup(!showSignup)}>Cancel</Button>
        </div>)
        : "" }
       

        {/* <div>
            {localStorage.getItem("token") ?
            
            <LogoutButton/>
            :
            ""}
        </div> */}
        </>
    )
}