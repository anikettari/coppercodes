import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import axios from "axios";
import { URL } from "../Consts/const";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import logo from "../Images/logo.jpg";

const TopNavbar = () => {
  const cookies = new Cookies();

  const SignOutFn = async () => {
    localStorage.setItem("dataKey", JSON.stringify(""));

    try {
      const resp = await axios.post(
        `${URL}/api/device/userlogout`,
        { userRef: "f7f47550-5d0b-11ed-9234-010812182330" },
        {
          headers: {
            Authorization: "SEdRYnN6ZFFFRjpuc0oySXQ0NWt5",
            AppVersion: "1.0.1",
            AuthToken: localStorage.getItem("dataKey"),
          },
        }
      );
      console.log(resp);

      const auth = {};
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="light"
        variant="light"
        style={{ boxShadow: "0 3px 3px #888888" }}
        className="mb-3"
      >
        <Container>
          <Link to={"/home"}>
            {" "}
            <Navbar.Brand>
              <img
                src={logo}
                style={{ heigh: "50px", width: "50px", borderRadius: "10px" }}
              />
            </Navbar.Brand>
          </Link>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav className="me-right">
              <Nav.Link>
                <Link to={"/home"}>Home </Link>
              </Nav.Link>

              <Nav.Link>
                {" "}
                <Link to={"/BookingHistory"}>Bookings </Link>
              </Nav.Link>

              <Nav.Link onClick={SignOutFn}>
                <Link to={"/"}>SignOut</Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default TopNavbar;
