import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { LogoutButton } from './LogoutButton';

function NavBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Milspouse Match</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link style={{marginRight:"2vmin", marginTop:"1vmin"}} to="/">Home</Link>
            <Link style={{marginRight:"2vmin", marginTop:"1vmin"}} to="profile">My Profile</Link>
            <Link style={{marginRight:"2vmin", marginTop:"1vmin"}} to="allusers">Find Milspouses</Link>
            <Link style={{marginRight:"2vmin", marginTop:"1vmin"}} to="allbases">Bases</Link>
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown"> */}
              {/* <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
              Another action
              </NavDropdown.Item> */}

            {/* </NavDropdown> */}
            
          </Nav>
        
        
            {localStorage.getItem("token") ?
            
            <LogoutButton/>
            :
            ""}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;