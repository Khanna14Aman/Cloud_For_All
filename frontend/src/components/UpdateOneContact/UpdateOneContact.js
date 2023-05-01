import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import "../../cssfile/UpdateOneContact.css";
import { updateOneContact } from "../../actions/contactActions";

const UpdateOneContact = ({ setedit, id, contactId, number }) => {
  const [contactnumber, setNumber] = useState(number);
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => (document.body.style.overflowY = "scroll");
  }, []);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateOneContact(contactnumber, id, contactId));
    if (!contactnumber) {
      return;
    }
    setedit(false);
  };
  return (
    <>
      <div className="blur-background"></div>
      <Container className="update-one-contact">
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="Phonenumber">
            <Row style={{ marginTop: "2vh" }}>
              <Col md={1} lg={1} sm={1}></Col>
              <Col md={2.5} lg={2.5} sm={2.5}>
                <Form.Label>
                  <h1>Phone:</h1>
                </Form.Label>
              </Col>
              <Col md={8} lg={8} sm={8}>
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
            <Col md={1} lg={1} sm={1}></Col>
            <Col
              md={10}
              lg={10}
              sm={10}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Button type="submit">Update Contact</Button>
              <Button onClick={() => setedit(false)}>close</Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default UpdateOneContact;
