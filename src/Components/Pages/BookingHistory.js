import React, { useState, useEffect } from "react";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { URL } from "../Consts/const";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";

const BookingHistory = () => {
  const [bookingDetails, setBookingDetails] = useState([]);
  const handleClick = async () => {
    try {
      const resp = await axios.get(`${URL}/api/customer/voucherbookinglist`, {
        headers: {
          AuthToken: "bd8382d5-3adf-11eb-9263-b62d5e046812",
          Authorization: "SEdRYnN6ZFFFRjpuc0oySXQ0NWt5",
          AppVersion: "1.0.0",
        },
      });

      setBookingDetails(resp.data.Details.VoucherBookingList);
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  };
  useEffect(() => {
    handleClick();
  }, []);
  return (
    <div>
      <Row>
        <Col lg={10} className="mt-4 mx-auto">
          <h4>All booking details</h4>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Restaurant Name</th>
                <th>VoucherDetails</th>
                <th>Amount</th>
              </tr>
            </thead>
            {bookingDetails.map((item) => (
              <tbody>
                <tr>
                  <td>{item.CustomerName}</td>
                  <td>{item.RestaurantName}</td>

                  <td>
                    <Dropdown>
                      <Dropdown.Toggle variant="dark" id="dropdown-basic">
                        Voucher Details
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {item.VoucherDetails.map((voucher) => (
                          <Dropdown.Item>{voucher.VoucherName}</Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                  <td>{item.Amount}</td>
                </tr>
              </tbody>
            ))}
          </Table>
        </Col>
      </Row>
    </div>
  );
};

export default BookingHistory;
