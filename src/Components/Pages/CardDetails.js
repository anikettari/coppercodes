import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";

const CardDetails = () => {
  const [clubDetails, setClubDetails] = useState("");
  const [voucherDetails, setVoucherDetails] = useState([]);
  const [eventDetails, setEventDetails] = useState("");
  const [cart, setCart] = useState([]);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const [warning, setWarning] = useState(false);
  const location = useLocation();
  console.log(location.state.data);

  const handleClick = async () => {
    try {
      const resp = await axios.get(
        `http://139.59.63.178:5454/api/customer/getpublishedeventdetails?publishedeventref=${location.state.data}`,
        {
          headers: {
            AuthToken: "bd8382d5-3adf-11eb-9263-b62d5e046812",
            Authorization: "SEdRYnN6ZFFFRjpuc0oySXQ0NWt5",
            AppVersion: "1.0.0",
          },
        }
      );
      console.log(resp);

      setClubDetails(resp.data.Details.ClubDetails);
      setVoucherDetails(resp.data.Details.VoucherDetails.Details);
      setEventDetails(resp.data.Details.EventDetails);
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  };
  useEffect(() => {
    handleClick();
  }, []);

  const handleAddVoucher = (item) => {
    let isPresent = false;
    cart.forEach((product) => {
      if (item.Type === product.Type) isPresent = true;
    });
    if (isPresent) {
      setWarning(true);
      setTimeout(() => {
        setWarning(false);
      }, 2000);
      return;
    }
    setCart([
      ...cart,
      { VoucherName: item.Type, Amount: item.Amount, Quantity: quantity },
    ]);
  };
  console.log(cart);

  const handlePrice = () => {
    let ans = 0;

    cart.map((item) => {
      ans += item.Amount;
    });
    setPrice(ans);
  };

  console.log(price);

  useEffect(() => {
    handlePrice();
  }, [handleClick]);

  return (
    <div>
      <Row xs={1} md={2} lg={8} className="g-4 mx-auto mt-3 mb-5">
        <Col className="g-4 mx-auto">
          <Card
            style={{
              boxShadow: "0 2px 2px #888888",
              borderRadius: "10px",
              padding: "5px",
              border: "none",
            }}
          >
            {warning && <div>Voucher is already added</div>}
            <Card.Img
              variant="top"
              src={eventDetails && eventDetails.Thumbnail}
              alt="image"
            />
            <Card.Body>
              <Card.Text>
                <Row>
                  <Col>{eventDetails && eventDetails.Timings}</Col>
                  <Col>Total price of vouchers- Rs{price}/-</Col>
                </Row>
              </Card.Text>

              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Event Details</Accordion.Header>
                  <Accordion.Body>
                    {eventDetails && eventDetails.Description}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>

              {voucherDetails.map((voucher) => (
                <Card className="mt-3">
                  <Card.Body>
                    <Card.Text>
                      <Row>
                        <Col lg={9}>Voucher - {voucher.Type}</Col>
                        <Col lg={3}>
                          <Button
                            onClick={() => handleAddVoucher(voucher)}
                            variant="dark"
                          >
                            {" "}
                            Add Voucher
                          </Button>
                        </Col>
                      </Row>
                    </Card.Text>
                    <Card.Text>Rs-{voucher.Amount}</Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </Card.Body>
            <Link
              to="/BookinPage"
              state={{
                data: {
                  clubDetails: clubDetails.ClubReference,
                  PublishedEventRef: eventDetails.Reference,
                  cart,
                  price,
                },
              }}
            >
              {" "}
              <Button
                variant="dark"
                className="text-center"
                style={{
                  width: "90%",
                  marginLeft: "5%",
                }}
              >
                Verify Booking - Total Price = Rs{price}
              </Button>
            </Link>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CardDetails;
