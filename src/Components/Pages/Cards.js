import React from "react";
import Card from "react-bootstrap/Card";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import { GrFilter } from "react-icons/gr";

const Cards = ({ eventData, setEventDate }) => {
  return (
    <>
      <Row>
        <Col
          lg={1}
          style={{
            boxShadow: "0 2px 2px #888888",
            borderRadius: "10px",
            padding: "5px",
          }}
        >
          <GrFilter /> Date:
        </Col>
        <Col>
          <input
            style={{
              boxShadow: "0 2px 2px #888888",
              borderRadius: "10px",
              padding: "5px",
            }}
            type="date"
            onChange={(e) => setEventDate(e.target.value)}
            className="datePicker"
          />
        </Col>
      </Row>

      {eventData ? (
        <Row>
          {eventData.map((item) => (
            <Link to="/cardDetails" state={{ data: item.PublishedEventRef }}>
              {" "}
              <Row className="card_float mt-3">
                {" "}
                <Col lg={6}>
                  <Card style={{ border: "none" }}>
                    <Card.Img variant="top" src={item.Thumbnail} />
                  </Card>
                </Col>
                <Col lg={6}>
                  <Card.Body>
                    <Card.Title>{item.ClubName}</Card.Title>
                    <Card.Text>{item.EventName}</Card.Text>

                    {item.VoucherDetails.map((voucher) => (
                      <Card className="mt-3 ">
                        <Card.Body>
                          <Card.Title>
                            {" "}
                            {voucher.Type} Rs-{voucher.Amount}{" "}
                          </Card.Title>
                          <Card.Title> </Card.Title>
                        </Card.Body>
                      </Card>
                    ))}
                  </Card.Body>
                </Col>
              </Row>
            </Link>
          ))}
        </Row>
      ) : (
        "loading..."
      )}
    </>
  );
};

export default Cards;
