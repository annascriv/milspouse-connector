import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/esm/Row'
import CardImg from 'react-bootstrap/esm/CardImg'
import Button from 'react-bootstrap/esm/Button'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { api } from '../utilities'



export const ProfileCard = ({ userProfile }) => {

    let profileURL = "http://127.0.0.1:8000/"

    let token = localStorage.getItem("token")

    const [requestStatus, setRequestStatus] = useState(null);

    console.log(userProfile.id)

    const navigate = useNavigate();

    const sendFriendRequest = async(e) => {

        let user_id = userProfile.id
        console.log(user_id)

        

        
            let response = await api.post(`friends/friend-request/${user_id}/`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
        
      
        

        if (response.status === 201) {
            setRequestStatus('Requested')
        } else {
            console.log("Error sending request")
        
    
    }
    
        
    } 

    return (

            <>
        
        <Card id="profile-card" style={{width:"18rem", marginLeft:"5vmin", marginTop:"2vmin"}}>
        <Card.Body>
            <div style={{float:"left", marginRight:"5vmin"}}>
            <CardImg style={{height:"15rem", width:"12rem", borderRadius:"15vmin", border:"2px solid black"}} src={profileURL+userProfile.profile_picture}></CardImg>
            </div>
            <Card.Title style={{marginTop:"5vmin"}}>{userProfile.name ? userProfile.name : userProfile.email}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{userProfile.age}</Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">{userProfile.bio}</Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">{userProfile.base}</Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">Dogs: {userProfile.dogs ? "yes" : "no"}</Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">Kids: {userProfile.number_of_kids ? userProfile.number_of_kids : "no"}</Card.Subtitle>
            
        </Card.Body>
        <Button style={{backgroundColor:"#5DBA9D", borderColor:"white", marginBottom:"1vmin"}} onClick={(e)=>sendFriendRequest()}>Connect</Button>
        </Card>
    

        </>
    )
}