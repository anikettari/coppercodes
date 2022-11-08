import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const BookinPage = () => {
  const location = useLocation();

  const [cartDetails, setCartDetails] = useState([]);
  const [bookingRef, setBookingRef] = useState("");
  const [filteredCart, setFilteredCart] = useState([]);

  const handleClick = async () => {
    try {
      const resp = await axios.post(
        `http://139.59.63.178:5454/api/customer/validateeventbooking`,
        {
          ClubReference: location.state.data.clubDetails,
          PublishedEventRef: location.state.data.PublishedEventRef,
          VoucherDetails: location.state.data.cart,
          PromoRef: null,
        },
        {
          headers: {
            AuthToken: "bd8382d5-3adf-11eb-9263-b62d5e046812",
            Authorization: "SEdRYnN6ZFFFRjpuc0oySXQ0NWt5",
            AppVersion: "1.0.0",
          },
        }
      );
      console.log(resp);
      setBookingRef(resp.data.Details.BookingReference);

      const auth = {};
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  };
  useEffect(() => {
    handleClick();
  }, []);

  useEffect(() => {
    handleClick();
    setCartDetails(location.state.data.cart);
    const jobGroup = location.state.data.cart.reduce((field, curr) => {
      if (!field[curr.VoucherName]) field[curr.VoucherName] = [];
      field[curr.VoucherName].push(curr);
      return field;
    }, {});
    console.log("Job List", jobGroup);
    setFilteredCart(jobGroup);
  }, []);

  const bookEvent = async () => {
    try {
      const resp = await axios.post(
        `http://139.59.63.178:5454/api/customer/placebooking`,
        {
          BookingRef: bookingRef,
          Status: 2,
          Payment: {
            PaymentOption: 1,
            ExternalTransactionRef: "rzp-test-for-failure",
          },
        },
        {
          headers: {
            AuthToken: "bd8382d5-3adf-11eb-9263-b62d5e046812",
            Authorization: "SEdRYnN6ZFFFRjpuc0oySXQ0NWt5",
            AppVersion: "1.0.0",
          },
        }
      );
      console.log("booked", resp);

      const auth = {};
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  };
  return (
    <div>
      <Row>
        <Col lg={8} className="mt-3 mx-auto">
          <h1>Your Cart</h1>

          <Card
            className="mt-3"
            style={{
              boxShadow: "0 2px 2px #888888",
              borderRadius: "10px",
              padding: "5px",
              border: "none",
            }}
          >
            {Object.keys(filteredCart).map((cart) => {
              return (
                <Card className="mt-3">
                  {" "}
                  <Card.Body>
                    <Card.Text>
                      <Row>
                        <Col lg={10}>Voucher -{cart}</Col>

                        {filteredCart[cart].map((item) => {
                          <p>{item.length}</p>;
                        })}
                      </Row>
                    </Card.Text>
                  </Card.Body>
                </Card>
              );
            })}
            <Link to="/home">
              {" "}
              <Button
                onClick={bookEvent}
                variant="dark"
                className="text-center mt-3"
                style={{
                  width: "90%",
                  marginLeft: "5%",
                }}
              >
                Book Event - Total Price -{">"} {location.state.data.price}
              </Button>
            </Link>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default BookinPage;
