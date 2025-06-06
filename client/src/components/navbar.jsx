import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { BsSearch } from "react-icons/bs";
import InputGroup from "react-bootstrap/InputGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./Icon.svg";
import "../styles/style.css";
// import SignIn from "./SignIn";
// import SignUp from "./SignUp";
import DropdownLogin from "./Dropdown";

function NavbarProject(props) {
  const [modalSignIn, setModalSignIn] = React.useState(false);
  const [modalSignUp, setModalSignUp] = React.useState(false);

  const handleSignup = () => {
    setModalSignUp(true);
  };

  const handleSignin = () => {
    setModalSignIn(true);
  };
  const handleChange = (e) => {
    props.setFilter({ ...props.filter, [e.target.name]: e.target.value });
  };

  return (
    <Navbar bg="white" expand="lg" className="fixed-top px-4">
      <Container fluid>
        <Navbar.Brand href="/" style={{ marginRight: "31%" }}>
          <img src="" alt="" width={120} />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="justify-content-between">
          <Form onSubmit={props.handleOnSubmit}>
            <InputGroup style={{ width: "300px" }}>
              <Form.Control type="search" placeholder="Search Name House" onChange={handleChange} className="bg" name="name" aria-label="Search" />
              <Button type="submit" className="bg" variant="outline-secondary">
                <BsSearch />
              </Button>
            </InputGroup>
          </Form>

          <Nav style={{ maxHeight: "100px" }} className="my-2 my-lg-0 gap-3" navbarScroll>
            {!localStorage.getItem("token") ? (
              <>
                <Button className="shadow-sm bg" variant="light" onClick={() => setModalSignIn(true)}>
                  Sign In
                </Button>
                <Button className="shadow-sm bg" onClick={() => setModalSignUp(true)} variant="light">
                  Sign Up
                </Button>
              </>
            ) : (
              <>
                <DropdownLogin userSignIn={props.userSignIn} setUserSignIn={props.setUserSignIn} />
              </>
            )}

            <SignIn openSignup={handleSignup} show={modalSignIn} onHide={() => setModalSignIn(false)} />
            <SignUp openSignin={handleSignin} show={modalSignUp} onHide={() => setModalSignUp(false)} />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarProject;