import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";
import { URL } from "../Consts/const";
import Image from "react-bootstrap/Image";
import LoginImage from "../Images/login.jpg";
import "../CSS/Main.css";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const cookies = new Cookies();
  let navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post(
        `${URL}/api/customer/iscustomerpresent`,
        { Phone: phoneNumber },
        {
          headers: {
            Authorization: "SEdRYnN6ZFFFRjpuc0oySXQ0NWt5",
            AppVersion: "1.0.0",
          },
        }
      );
      console.log(resp);
      cookies.set("AuthToken", resp.data.Details.CustomerRef);
      localStorage.setItem(
        "dataKey",
        JSON.stringify(resp.data.Details.CustomerRef)
      );
      navigate("/home");

      const auth = {};
    } catch (err) {
      console.error(err);
    }
  };

  console.log(cookies.get("AuthToken"));

  return (
    <div className="theme_black">
      <Row>
        <Col xs={10} lg={4} className="mx-auto border_test card_float m-5">
          <h1 className="text-center">Hello Welcome back</h1>
          <img className="login_image" src={LoginImage} />
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              {/* <Form.Label>Enter Phone Number</Form.Label> */}
              <Form.Control
                type="number"
                placeholder="Enter your phone number"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </Form.Group>{" "}
            <Button
              variant="dark"
              type="submit"
              style={{ width: "100%" }}
              onClick={handleClick}
            >
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default LoginPage;
