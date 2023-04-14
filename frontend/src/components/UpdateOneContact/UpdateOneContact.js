import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import "../../cssfile/UpdateOneContact.css";
import { updateOneContact } from "../../actions/contactActions";

const UpdateOneContact = ({ setedit, id, contactId, number }) => {
  const [contactnumber, setNumber] = useState(number);
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateOneContact(contactnumber, id, contactId));
    if (!contactnumber) {
      return;
    }
    setedit(false);
  };
  return (
    <div className="update-one-contact">
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="Phonenumber">
          <Row style={{ marginTop: "2vh" }}>
            <Col md={1}></Col>
            <Col md={2}>
              <Form.Label>
                <h1>Phone:</h1>
              </Form.Label>
            </Col>
            <Col md={8}>
              <Form.Control
                type="tel"
                placeholder="Enter 10 digit number"
                value={contactnumber}
                onChange={(e) => setNumber(e.target.value)}
                required
                pattern="[0-9]{10}"
              ></Form.Control>
            </Col>
          </Row>
        </Form.Group>
        <Row style={{ marginTop: "2vh" }}>
          <Col md={1}></Col>
          <Col md={8}>
            <Button type="submit">Update Contact</Button>
          </Col>
          <Button onClick={() => setedit(false)}>close</Button>
        </Row>
      </Form>
    </div>
  );
};

export default UpdateOneContact;
