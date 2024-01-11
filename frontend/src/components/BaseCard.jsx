import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/esm/Button'
import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/esm/Row'


export const BaseCard = ({BaseProfile}) => {

    const navigate = useNavigate();



    return (
        <>

        <Card style={{width:"18rem", margin:"2vmin"}}>
            <Card.Body>
                <Card.Title>{BaseProfile.site_name}</Card.Title>
                <Card.Subtitle>{BaseProfile.country}</Card.Subtitle>
                <Card.Subtitle style={{marginTop:"1vmin"}}>{BaseProfile.state_terr}</Card.Subtitle>
                <Button style={{marginTop:"2vmin"}} onClick={()=>navigate(`/filter/${BaseProfile.site_name}`)}>Find Milspouses Here</Button>
            </Card.Body>
            
        </Card>

        </>
    )
}