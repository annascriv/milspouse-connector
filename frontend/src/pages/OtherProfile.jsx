import { useEffect, useState } from "react";
import { ProfileCard } from "../components/ProfileCard"
import { useParams } from "react-router-dom"
import { api } from "../utilities";
import { OtherUserProfile } from "../components/OtherUserProfile";

export const OtherProfile = () => {

        const { user_id } = useParams();
        const [results, setResults] = useState({})
        let token = localStorage.getItem('token')

        const getUserProfile = async() => {
            console.log(user_id)
            let response = await api.get(`users/${user_id}/`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            }).catch((err)=> {
                console.log(err)
            })
            console.log(response.data)
            setResults(response.data)
            
        }

        useEffect(()=> {
            getUserProfile();
        }, [])

    return (
    <>

    <OtherUserProfile  userProfile={results}/>
    
    </>
    )
}