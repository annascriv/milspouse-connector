import { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { api } from "../utilities";
import { BaseCard } from "../components/BaseCard";



export const BaseResultsPage = () => {

    const { base } = useParams();
    const [results, setResults] = useState([])
    
    let token = localStorage.getItem("token")
    const navigate = useNavigate();



    const getResults = async() => {
        let response = await api.get(`bases/${base}/`, {
            headers: {
                Authorization: `Token ${token}`
            }
        })
   
        setResults(response.data.results[0])
        // console.log(response.data.results[0])
    }

    useEffect(()=> {
        getResults();
    }, [])




    return (
        <>
        <Button onClick={()=>navigate("/allbases/")}>Back to Bases</Button>
        {results ?
        (
        <div>
        <h2>Results: {results.site_name} </h2>
        <BaseCard BaseProfile={results}/>
        </div>)
        :
        <h2>No results for {base}</h2>}
        
        
        </>
    )
}