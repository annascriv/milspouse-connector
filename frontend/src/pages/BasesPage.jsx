import { api } from "../utilities";
import { useEffect, useState } from "react";
import { BaseCard } from "../components/BaseCard";
import Row from "react-bootstrap/esm/Row";


export const BasesPage = () => {

    const [bases, setBases] = useState([])

    let token = localStorage.getItem("token")

        const getBases = async() => {

            let response = await api.get("bases/", {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            console.log(response.data.results)
            setBases(response.data.results)
        }

        useEffect(()=> {
            getBases();
        }, [])




    return (
        <>
        <Row>
        {
            bases.map((base, idx)=> (
                <BaseCard key={idx} BaseProfile={base}/>
            ))
        }
        </Row>
        
        </>
    )
}