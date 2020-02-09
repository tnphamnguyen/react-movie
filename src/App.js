import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar, Nav } from 'react-bootstrap';
import GenericFilmList from './components/GenericFilmList'
import { THEME_DEF, menu } from './constants/config';


const App = () => {
  // constructor(props){
  //   super(props)
  //   this.state={currentTheme:THEME_DEF, buttonActif: false}
  // }
  

  const [currentTheme, setCurrentTheme] = useState(THEME_DEF)

  function setCurrentLink(link) {
    // this.setState({currentTheme:link})
    setCurrentTheme(link)
  }
useEffect(()=>{
  //console.log('useEffect',currentTheme)
},[currentTheme])

  return (
    <React.Fragment>
      <Container fluid>
        <Navbar expand="lg" bg="dark" variant="dark" className="fixed-top">
          <Navbar.Brand>React-movie</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {
                menu.map((m, idx) => {
                  return (
                    <Nav.Link active={currentTheme===m.theme? true : false} key={idx} onClick={() => setCurrentTheme(m.theme)}>{m.label}</Nav.Link>
                  )
                })
              }
              {/* <Nav.Link onClick={() => setCurrentLink(THEME_DEF)}>Now playing</Nav.Link>
              <Nav.Link onClick={() => setCurrentLink(THEME_POP)}>Popular</Nav.Link>
              <Nav.Link onClick={() => setCurrentLink(THEME_UPCOM)}>Up comming</Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
      <GenericFilmList currentTheme={currentTheme}  />

    </React.Fragment>
  );
}

export default App;
