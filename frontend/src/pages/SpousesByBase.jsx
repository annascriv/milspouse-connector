import { api } from "../utilities.jsx";
import { ProfileCard } from "../components/ProfileCard.jsx";
import { useState, useEffect } from "react";
import Row from "react-bootstrap/esm/Row.js";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/esm/Button.js";


export const FilterSpousesPage = () => {

    const navigate = useNavigate();

    const [users, setUsers] = useState([])

    const { base } = useParams(); 

    let token = localStorage.getItem("token")


    const getAllUsers = async()=> {

        // filter = filter.replace(" ", "%20")
        console.log(base)
        let response = await api.get(`users/filter/${base}/`, {
            headers: {
                Authorization: `Token ${token}`,
            }
        })

        setUsers(response.data)
    }

    useEffect(()=> {
        getAllUsers();
    }, [])


    return (
        <>
        <Button onClick={()=>navigate('/allbases/')}>Back to Bases</Button>
        <Row>
        {users.length ? 
        (users.map((user, idx)=> (
            <ProfileCard key={idx} userProfile={user}/>
        )))
        :
        <h1>No Milspouses at this base</h1>}
        </Row>
        
        

        </>
    )
}