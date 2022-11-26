import {Link} from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/auth.context';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import mountain_logo from '../images/mountain_logo.png';


function NavScrollExample({filterMountains}) {
    const [query, setQuery] = useState('')

    const handleQuery = (e) => {
      setQuery(e.target.value)
      filterMountains(e.target.value)
    }

    return (
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/"><img src={mountain_logo} style={{height: '10vh'}}/></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/signup">Signup</Nav.Link>
              <NavDropdown title="Hikes" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Asia</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Europe
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/mountains">
                  All Hikes
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/trails">Post your trail</Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={handleQuery}
                value={query}
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }

 export default NavScrollExample;
 
    
 


