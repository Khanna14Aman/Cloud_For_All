import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addOneContact } from "../../actions/contactActions";
import "../../cssfile/BlurBackground.css";

const AddOneNumber = ({ setadd, id }) => {
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => (document.body.style.overflowY = "scroll");
  }, []);
  const [addnumber, setNumber] = useState("");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addOneContact(addnumber, id));
    if (!addnumber) {
      return;
    } else {
      setadd(false);
    }
  };
  return (
    <>
      <div className="blur-background"></div>
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
                  type="text"
                  placeholder="Enter 10 digit number"
                  value={addnumber}
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
              <Button type="submit">Add Contact</Button>
            </Col>
            <Button onClick={() => setadd(false)}>close</Button>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default AddOneNumber;
