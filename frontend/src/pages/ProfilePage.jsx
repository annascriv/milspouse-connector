import { api } from "../utilities";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card'
import Container from "react-bootstrap/esm/Container";


export const ProfilePage = () => {

    const [userProfile, setUserProfile] = useState({})
    
    let token = localStorage.getItem("token")

    const navigate = useNavigate();

    const getUserInfo = async() => {
        
        if (token) {
            let response = await api.get("users/info/", {
                headers: {
                    Authorization: `Token ${token}`
                }

            })
            setUserProfile(response.data)
        }
    }
    useEffect(()=> {
        getUserInfo();
    }, [])


    return (
        <>
        <Container style={{alignContent:"center"}}>
        <h1>Profile</h1>
        <Card style={{width:"90vmin"}}>
            <Card.Body>
                <Card.Title>{userProfile.name}</Card.Title>
                
                    <ul>
                        <li>Age: {userProfile.age}</li>
                        <li>Bio: {userProfile.bio}</li>
                        <li>Base: {userProfile.base}</li>
                        <li>Dogs: {userProfile.dogs? "yes" : "no"}</li>
                        <li>Kids: {userProfile.number_of_kids ? "yes" : "no"}</li>
                        <li>Friends: {userProfile.friends}</li>

                    </ul>
                
            </Card.Body>


        </Card>
        </Container>
        </>
    )
}