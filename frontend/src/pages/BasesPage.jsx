import { api } from "../utilities";
import { useEffect, useState } from "react";
import { BaseCard } from "../components/BaseCard";
import Row from "react-bootstrap/esm/Row";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";


export const BasesPage = () => {

    const [bases, setBases] = useState([])

    const [userInput, setUserInput] = useState("")

    const navigate = useNavigate();

    let token = localStorage.getItem("token")

        const getBases = async() => {

            let response = await api.get("bases/", {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            
            setBases(response.data.results)
        }

        useEffect(()=> {
            getBases();
        }, [])




    return (
        <>
        <Row>
            <Form className="searchbar" style={{display:"flex", marginBottom:"5vmin", marginTop:"2vmin", marginLeft:"2vmin"}} onSubmit={(e)=>[e.preventDefault(), navigate(`/results/${userInput.replace(" ","%20")}/`)]}>
                <Form.Control style={{width:"40vmin", marginRight:"1vmin"}} type="text" placeholder="Search by full name (Ex. Vance AFB)" onChange={(e)=>setUserInput(e.target.value)} value={userInput}></Form.Control>
                <Button type="submit">Search</Button>
            </Form>
        </Row>
        <Row style={{textAlign:"center", margin:"2vmin"}}>
        {
            bases.map((base, idx)=> (
                <BaseCard key={idx} BaseProfile={base}/>
            ))
        }
        </Row>
        
        </>
    )
}