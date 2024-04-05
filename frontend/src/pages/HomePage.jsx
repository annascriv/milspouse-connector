import { useState } from "react"
import { LoginForm } from "../components/LoginForm"
import { SignupForm } from "../components/SignupForm"
import { LogoutButton } from "../components/LogoutButton"
import Button from "react-bootstrap/esm/Button"
import '/src/App.css'


export const HomePage = () => {

    const [showLogin, setShowLogin] = useState(false)
    const [showSignup, setShowSignup] = useState(false)
    const [showLoginButton, setShowLoginButton] = useState(false)
    const [showSignupButton, setShowSignupButton] = useState(false)

    return (
        <>
        <div className="home-container" style={{marginTop:"0vmin"}}>
            <div style={{textAlign:"center"}}>
        <h1 style = {{marginTop:"2vmin"}}>Spouse Connector Project</h1>
        </div>
        {localStorage.getItem("token") ? "" :
        (
        <div style={{textAlign:"center"}}>
        <Button style={{margin:"5vmin"}} onClick={(e)=>setShowLogin(!showLogin)}>Login</Button> 
        <Button onClick={(e)=>setShowSignup(!showSignup)}>Sign Up</Button>
        </div>) }
        
        
        {showLogin ?
        (<div  style={{margin:"10vmin"}}>
        <h1>Welcome Back</h1>
        <LoginForm/>
        <Button style={{marginTop:"2vmin"}} onClick={(e)=>setShowLogin(!showLogin)}>Cancel</Button>
        </div>)
        : "" }
                {showSignup ?
        (<div style={{marginTop:"0vmin", marginLeft:"5vmin", marginRight:"5vmin"}}>
        <h1>Welcome</h1>
        <SignupForm/>
        <Button style={{marginTop:"2vmin"}} onClick={(e)=>setShowSignup(!showSignup)}>Cancel</Button>
        </div>)
        : "" }
       
        </div>
        {/* <div>
            {localStorage.getItem("token") ?
            
            <LogoutButton/>
            :
            ""}
        </div> */}
        </>
    )
}