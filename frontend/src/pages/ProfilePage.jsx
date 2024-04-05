import { api } from "../utilities";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card'
import Container from "react-bootstrap/esm/Container";
import { ProfileCard } from "../components/ProfileCard";
import Button from "react-bootstrap/esm/Button";
import Form from 'react-bootstrap/Form';
import CardImg from "react-bootstrap/esm/CardImg";
import Row from "react-bootstrap/esm/Row";
import '/src/App.css'



export const ProfilePage = () => {

    const [userProfile, setUserProfile] = useState({})
    const [showEditForm, setShowEditForm] = useState(false)

    ///update fields for user for editing profile
    const [newName, setNewName] = useState(userProfile.name)
    const [newAge, setNewAge] = useState(userProfile.age)
    const [newBio, setNewBio] = useState(userProfile.bio)
    const [newBase, setNewBase] = useState(userProfile.base)
    const [newDogs, setNewDogs] = useState(userProfile.dogs)
    const [newKids, setNewKids] = useState(userProfile.kids)
    const [friendsList, setFriendsList] = useState([])

    const [friendRequest, setFriendRequests] = useState([])
    const [showRequests, setShowRequests] = useState(false)
    

    let profileURL = "http://127.0.0.1:8000/"

    const [profilepic, setProfilePic] = useState(null)
    
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
            setFriendsList(response.data.friends)
            console.log(response.data.friends)
        }
    }
    useEffect(()=> {
        getUserInfo();
    }, [])

    const updateProfile = async(e) => {
        e.preventDefault();

        let token = localStorage.getItem("token")

        let data = {
            name: newName,
            age: newAge,
            bio: newBio,
            base: newBase,
            kids: newKids,
            dogs: newDogs
        };

        let response = await api.put('users/info/', data, {
            headers: {
                Authorization: `Token ${token}`
            }
        }).catch((err)=> {
            console.log(err.response)
        });

        if (response.status === 200) {
            window.location.reload();
        }
        setShowEditForm(!showEditForm)
    }

    const handlePicUpload = (e) => {
        setProfilePic(e.target.files[0])
    }

    const handlePicSubmit = async() => {
        const data = new FormData();

        data.append("profile_picture", profilepic)

        let response = await api.post('users/profile-picture/', data, {
            headers: {
                Authorization: `Token ${token}`,
                "Content-Type": 'multipart/form-data'
            }
        })

        if (response.status === 201) {
            window.location.reload()
        }
        else {
            console.log("something went wrong uploading profile picture")
        }
    }

    const getFriendRequests = async(e) => {
        e.preventDefault();

        let response = await api.get('friends/all-requests/', {
            headers: {
                Authorization: `Token ${token}`
            }

        });



        if (response.status === 200) {

            setFriendRequests(response.data)
            console.log(response.data)
            setShowRequests(!showRequests)

        }
        else {
            console.log("Something went wrong fetching the requests.")
        }
    }

    const AcceptRequest = async(userId) => {

        
        let response = await api.post(`friends/request-approval/${userId}/`, null, {
            headers: {
                Authorization: `Token ${token}`
            }
        });

        if (response.status === 201) {
            window.location.reload()
        }
        else {
            console.log("Something went wrong accepting the request.")
        }


    }

     
    const DeleteFriend = async(user_name) => {

        user_name = user_name.replace(" ", "%20")

        let response = await api.delete(`friends/delete-friend/${user_name}/`, {
            headers: {
                Authorization: `Token ${token}`
            }
        });

        if (response.status === 200) {
            window.location.reload()
        }
        else {
            alert("There was an error removing your friend.")
        }

    }


    return (
        <>
        <div className='home-container' style={{margin:0, display:"flex", justifyContent:"center"}}>
        <h1>Profile</h1>
        <Card style={{width:"90vmin", backgroundColor:"whitesmoke", marginTop:"20vmin"}}>
        <CardImg style={{height:"15rem", width:"12rem", borderRadius:"15vmin", border:"2px solid black", marginLeft:"2vmin", marginTop:"2vmin"}} src={userProfile.profile_picture ? profileURL+userProfile.profile_picture : null}></CardImg>
            <Card.Body>
                <Card.Title>{userProfile.name}</Card.Title>
                
                    <ul>
                        <li>Age: {userProfile.age}</li>
                        <li>Bio: {userProfile.bio}</li>
                        <li>Base: {userProfile.base}</li>
                        <li>Dogs: {userProfile.dogs? "yes" : "no"}</li>
                        <li>Kids: {userProfile.number_of_kids ? userProfile.number_of_kids : "no"}</li>
                        {/* <li>Friends: {userProfile.friends}</li> */}

                    </ul>
                    <ul>
                        <h3>Friends</h3>
                        {friendsList.map((friend, idx) => (
                            friend ? (
                            <>
                            
                            <li key={idx}>{friend}</li>
                            <Button style={{fontSize:"small"}} onClick={()=>DeleteFriend(friend)}>Remove {friend} from friends</Button>    
                            </>) : ""
                        ))}
                    </ul>
                

            <Row >
            <Button style={{width:"20vmin", margin:"2vmin"}} onClick={()=>setShowEditForm(!showEditForm)}>Edit Profile</Button>
            <Button style={{margin:"2vmin", width:"30vmin"}} onClick={(e)=>getFriendRequests(e)}>View Friend Requests</Button>
            </Row>
            </Card.Body>
        </Card>
        {showEditForm ? 
        <div>
        <Form onSubmit={(e)=>updateProfile(e)} style={{border:"2px solid black", borderRadius:"1vmin"}}>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder={userProfile.name} onChange={(e)=>setNewName(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Age</Form.Label>
                <Form.Control type="text" placeholder={userProfile.age} onChange={(e)=>setNewAge(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Bio</Form.Label>
                <Form.Control type="text" placeholder={userProfile.bio} onChange={(e)=>setNewBio(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Base</Form.Label>
                <Form.Control type="text" placeholder={userProfile.base} onChange={(e)=>setNewBase(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Dogs</Form.Label>
                <input type="checkbox" checked={newDogs} onChange={()=>setNewDogs(!newDogs)}></input>
            </Form.Group>
            <Form.Group>
                <Form.Label>Kids</Form.Label>
                <Form.Control type="int" placeholder={userProfile.number_of_kids} onChange={(e)=>setNewKids(e.target.value)}></Form.Control>
            </Form.Group>
            <Button type="submit">Submit</Button>
            <Button style={{marginLeft:"2vmin"}} onClick={()=>setShowEditForm(!showEditForm)}>Cancel</Button>
        </Form>
        {/* form for picture upload */}
        <Form>
            <Form.Control id="form-button" style={{width:"40vmin"}} type="file" accept="image/*" onChange={(e)=>handlePicUpload(e)}/>
                <Button id="form-button" onClick={()=>handlePicSubmit()}>upload</Button>
        </Form>

        </div>
    :
    ""}
        {/* <Button style={{marginTop:"2vmin"}} onClick={(e)=>getFriendRequests(e)}>View Friend Requests</Button> */}
        <Row>
        {showRequests ? (friendRequest.map((request, idx)=>(
            <div key={idx}>
            <label>{request.user_name} wants to connect</label>
            <Button style={{margin:"2vmin"}} key={idx} onClick={()=>AcceptRequest(request.user)}>Accept</Button>
            </div>
        ))
            
        ) : ""}
        </Row>
        </div>
        </>
    )
}