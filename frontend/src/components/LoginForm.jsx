import Form from 'react-bootstrap/Form'
import { api } from '../utilities'
import { useEffect, useState } from 'react'
import  Button  from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'


export const LoginForm = () => {

        const [email, setEmail] = useState("")
        const [password, setPassword] = useState("")

        const [user, setUser] = useState(null)
        const navigate = useNavigate()

        const logIn = async(e) => {
            e.preventDefault();
            let response = await api.post("users/login/", {
                "email": email,
                "password":password
            }).catch(err => console.log("Something went wrong logging in", err))

            console.log(response)

            let user = response.data.email;
            let token = response.data.token;

            if (token !== undefined) {
                localStorage.setItem("token", token)
                api.defaults.headers.common["Authorization"] = `Token ${token}`;
                setUser(user)
                console.log(`Successfully logged in ${email}`)
                
                // navigate("/")
            }

            else {
                alert("No user with matching credentials.")
                localStorage.clear()
                // navigate("/")
            }
        }


    return (
        <>
        
        <Form onSubmit={(e)=>logIn(e)}>
            <Form.Group>
                <Form.Label>Email Address</Form.Label>
                <Form.Control style={{width:"30vmin"}} placeholder='Enter Email' onChange={(e)=>setEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control style={{width:"30vmin"}} type="password" placeholder='Enter Password' onChange={(e)=>setPassword(e.target.value)}/>
            </Form.Group>
            <Button style={{marginTop:"2vmin"}} variant="primary" type="submit">Submit</Button>

        </Form>
        </>
    )
}