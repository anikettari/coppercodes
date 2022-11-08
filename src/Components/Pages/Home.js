import Cards from "./Cards";
import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { URL } from "../Consts/const";
import Cookies from "universal-cookie";

const Home = () => {
  const cookies = new Cookies();
  console.log(cookies.get("AuthToken"));
  const [eventDate, setEventDate] = useState("2022-04-06");
  const [eventData, setEventData] = useState([]);

  //convert date from yyyy-mm-dd to dd-mm-yyyy
  function pad2(n) {
    return (n < 10 ? "0" : "") + n;
  }
  var date = new Date(eventDate);
  var month = pad2(date.getMonth() + 1);
  var day = pad2(date.getDate());
  var year = date.getFullYear();

  var formattedDate = day + "-" + month + "-" + year;

  const handleClick = async () => {
    try {
      const resp = await axios.get(
        `${URL}/api/customer/getallpublishedevents?Date=${formattedDate}`,
        {
          headers: {
            AuthToken: localStorage.getItem("dataKey"),
            Authorization: "SEdRYnN6ZFFFRjpuc0oySXQ0NWt5",
            AppVersion: "1.0.0",
          },
        }
      );
      console.log(resp);
      setEventData(resp.data.Details);

      const auth = {};
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  };
  useEffect(() => {
    handleClick();
    console.log(eventDate);
  }, [eventDate]);

  return (
    <div>
      <Row>
        <Col xs={10} lg={10} className="mx-auto">
          <Cards eventData={eventData} setEventDate={setEventDate} />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
