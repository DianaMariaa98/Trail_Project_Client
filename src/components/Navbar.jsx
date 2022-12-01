import {Link, NavLink} from 'react-router-dom';
import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import mountain_logo from '../images/mountain_logo.png';
import { AuthContext } from '../contexts/auth.context';
import searchIcon from '../images/search_icon_izaovq.png';



function NavScrollExample({filterMountains}) {
    const [query, setQuery] = useState('');

    const {loggedIn, logout} = useContext(AuthContext);

    const handleQuery = (e) => {
      setQuery(e.target.value)
      filterMountains(e.target.value)
    }
    

    return (
      <Navbar className ="navigation_bar" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/"><img src={mountain_logo} alt ="" style={{height: '14vh'}}/></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="/">Home</Nav.Link>
              {!loggedIn && <Nav.Link href="/login">Login</Nav.Link>}
              {!loggedIn && <Nav.Link href="/signup">Signup</Nav.Link>}
              {loggedIn && <Nav.Link href="/profile">Profile</Nav.Link>}
              <NavDropdown title="Hikes" id="navbarScrollingDropdown">
                <NavDropdown.Item href="/asiaMountains">Asia</NavDropdown.Item>
                <NavDropdown.Item href="/europeMountains">
                  Europe
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/mountains">
                  All Hikes
                </NavDropdown.Item>
              </NavDropdown>
              {loggedIn && <Nav.Link href="/trails">Post your trail</Nav.Link>}
              {loggedIn && <NavLink onClick={logout} style={{alignSelf:'center', textDecoration:'none', color:'rgba(94, 89, 89, 0.86)'}}>Logout</NavLink>}
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2 searchNav"
                aria-label="Search"
                onChange={handleQuery}
                value={query}
              />
              <Button variant="outline-success" style={{backgroundColor:'#7a726cbd', border:'none'}}><Link className='searchNav' to="/mountains"><img className="searchIcon" src={searchIcon} alt=""></img></Link></Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }

 export default NavScrollExample;
 
    
 


