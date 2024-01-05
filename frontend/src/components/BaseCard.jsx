import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/esm/Button'
import { useNavigate } from 'react-router-dom'


export const BaseCard = ({BaseProfile}) => {

    const navigate = useNavigate();



    return (
        <>
        <Card style={{width:"18rem", margin:"2vmin"}}>
            <Card.Body>
                <Card.Title>{BaseProfile.site_name}</Card.Title>
                <Card.Subtitle>{BaseProfile.country}</Card.Subtitle>
                <Button style={{marginTop:"2vmin"}} onClick={()=>navigate(`/filter/${BaseProfile.site_name}`)}>Find Milspouses Here</Button>
            </Card.Body>
            
        </Card>
        </>
    )
}