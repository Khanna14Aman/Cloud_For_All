import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import ErrorMessage from "../Error/Error";
import Loading from "../Loading/Loading";
import "../../cssfile/UpdateContact.css";
import { useDispatch, useSelector } from "react-redux";
import { updateContact } from "../../actions/contactActions";

const UpdateContact = ({
  setedit,
  Name,
  City,
  State,
  Country,
  Designation,
  id,
}) => {
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => (document.body.style.overflowY = "scroll");
  }, []);
  const { contact } = useSelector((state) => state.contactList);
  const updatecontact = useSelector((state) => state.updateContact);
  const { loading, error, success } = updatecontact;
  const [name, setName] = useState(Name);
  const [city, setCity] = useState(City);
  const [state, setState] = useState(State);
  const [country, setCountry] = useState(Country);
  const [designation, setDesignation] = useState(Designation);

  const dispatch = useDispatch();

  const [showalert, setalert] = useState(false);
  const Alert = () => {
    // useEffect(() => {
    //   document.body.style.overflowY = "hidden";
    //   return () => (document.body.style.overflowY = "scroll");
    // }, []);
    return (
      <>
        <div className="blur-background"></div>
        <div
          style={{
            zIndex: "37",
            borderRadius: "20px",
            height: "40%",
            width: "50%",
            backgroundColor: "red",
            position: "fixed",
            left: "25%",
            top: "30%",
            padding: "2vh",
            textAlign: "center",
            position: "fixed",
          }}
        >
          <div>
            <h2>
              <b>
                This name is already in use. We cannot perform this Operation.
              </b>
            </h2>
          </div>
          <div
            style={{
              marginTop: "12vh",
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <Button style={{ width: "5vw" }} onClick={() => setalert(false)}>
              OK
            </Button>
          </div>
        </div>
      </>
    );
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let isallowed = true;
    for (let value of contact) {
      if (
        value.name.toString() === name.toString() &&
        name.toString() !== Name.toString()
      ) {
        isallowed = false;
        break;
      }
    }
    if (!isallowed) {
      // window.alert(
      //   "Already you are using this name.Can't perform this operation"
      // );
      setalert(true);
      return;
    } else {
      dispatch(updateContact(id, name, country, state, city, designation));
      if (!name) {
        return;
      }
      setedit(false);
    }
  };

  return (
    <>
      <div className="blur-background"></div>
      {showalert && <Alert />}
      <div className="update-contact-main">
        {loading && <Loading></Loading>}
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Row style={{ marginTop: "2vh" }}>
              <Col md={1}></Col>
              <Col md={2}>
                <Form.Label>
                  <strong>Name:</strong>
                </Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                ></Form.Control>
              </Col>
            </Row>
          </Form.Group>
          <Form.Group controlId="Country">
            <Row style={{ marginTop: "2vh" }}>
              <Col md={1}></Col>
              <Col md={2}>
                <Form.Label>
                  <strong>Country:</strong>
                </Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="text"
                  placeholder="Enter Country Name"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                ></Form.Control>
              </Col>
            </Row>
          </Form.Group>
          <Form.Group controlId="State">
            <Row style={{ marginTop: "2vh" }}>
              <Col md={1}></Col>
              <Col md={2}>
                <Form.Label>
                  <strong>State:</strong>
                </Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="text"
                  placeholder="Enter State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                ></Form.Control>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group controlId="City">
            <Row style={{ marginTop: "2vh" }}>
              <Col md={1}></Col>
              <Col md={2}>
                <Form.Label>
                  <strong>City:</strong>
                </Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="text"
                  placeholder="Enter City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                ></Form.Control>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group controlId="Designation">
            <Row style={{ marginTop: "2vh" }}>
              <Col md={1}></Col>
              <Col md={2}>
                <Form.Label>
                  <strong>Designation:</strong>
                </Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="text"
                  placeholder="Enter Designation"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                ></Form.Control>
              </Col>
            </Row>
          </Form.Group>
          <Row style={{ marginTop: "2vh" }}>
            <Col md={1}></Col>
            <Col md={9}>
              <Button type="submit">Update ContactDetails</Button>
            </Col>
            <Button onClick={() => setedit(false)}>close</Button>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default UpdateContact;
