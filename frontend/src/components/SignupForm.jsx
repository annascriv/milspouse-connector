import Form from 'react-bootstrap/Form'
import { api } from '../utilities'
import { useState, useEffect } from 'react'
import  Button  from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
import { useOutletContext } from 'react-router-dom'

export const SignupForm = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [bio, setBio] = useState("");
    const [base, setBase] = useState("");
    const [dogs, setDogs] = useState(false)
    const [num_kids, setNum_kids] = useState(0)

    const [basechoices, setBaseChoices] = useState([])

    const navigate = useNavigate();

    const getBaseChoices = async() => {
        let response = await api.get('bases/')
        setBaseChoices(response.data.results)
        console.log(response.data.results)
    }
    
    useEffect(()=> {
        getBaseChoices();
        
    }, [])

    const signUp = async(e) => {
        e.preventDefault();
        let data = { email, password, name, age, bio, base, number_of_kids: num_kids }

        let response = await api.post("users/signup/", data)
        .catch((err)=> {
            console.log(err)
        })
        
        let token = response.data.token;

        api.defaults.headers.common["Authorization"] = `Token ${token}`;
        localStorage.setItem("token", token);
        localStorage.setItem("name", name)
        window.location.reload()


    }




    return (
        <>
        <Form style={{width:"50%"}}onSubmit={(e)=>signUp(e)}>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder='Name'onChange={(e)=>setName(e.target.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Age</Form.Label>
                <Form.Control type="int" placeholder='Age' onChange={(e)=>setAge(e.target.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Bio</Form.Label>
                <Form.Control type="text" placeholder='Bio' onChange={(e)=>setBio(e.target.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Base</Form.Label>
                <Form.Select aria-label="Choose Base" onChange={(e)=>setBase(e.target.value)}>
                <option>Choose Base</option>
                {basechoices.map((choice, idx)=>(
                    <option key={idx}>{choice.site_name}</option>
                ))}
                </Form.Select>
            </Form.Group>
            <Form.Group>
                <Form.Label>Kids</Form.Label>
                <Form.Control type="int" placeholder='Number of Kids' onChange={(e)=>setNum_kids(e.target.value)}/>
            </Form.Group>
            <Button type="submit">Submit</Button>


        </Form>
        
        </>
    )
}