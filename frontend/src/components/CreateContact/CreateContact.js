import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import "../../cssfile/CreateContact.css";
import ErrorMessage from "../Error/Error";
import Loading from "../Loading/Loading";
import { createContact } from "../../actions/contactActions";

const CreateContact = ({ setcreate }) => {
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => (document.body.style.overflowY = "scroll");
  }, []);
  const [name, setName] = useState("");
  const [number, setNumber] = useState();
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [designation, setDesignation] = useState("");
  const dispatch = useDispatch();
  const { contact } = useSelector((state) => state.contactList);
  const createcontact = useSelector((state) => state.createContact);
  const { error, success, loading } = createcontact;

  const [showMerge, setMerge] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    let isfound = false;
    if (contact) {
      for (let value of contact) {
        if (value.name.toString() === name.toString()) {
          isfound = true;
        }
      }
    }
    if (isfound) {
      // if (
      //   window.confirm(
      //     "You already have contact on this name do you wanna merge them. Also only number will get added in this case and none of the other details get change."
      //   )
      // ) {
      //   dispatch(
      //     createContact(name, number, state, country, city, designation)
      //   );
      //   if (!name || !number) {
      //     return;
      //   } else {
      //     setcreate(false);
      //   }
      // } else {
      //   return;
      // }
      setMerge(true);
      // setcreate(false);
    } else {
      dispatch(createContact(name, number, state, country, city, designation));
      if (!name || !number) {
        return;
      } else {
        setcreate(false);
      }
    }
  };

  const Merge = () => {
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
                This name is already in your use. So this number will get merge
                to that name.
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
            <Button
              variant="success"
              onClick={() => {
                dispatch(
                  createContact(name, number, state, country, city, designation)
                );
                setMerge(false);
                if (!name || !number) {
                  return;
                } else {
                  setcreate(false);
                }
              }}
            >
              Merge
            </Button>
            <Button onClick={() => setMerge(false)}>Close</Button>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {showMerge && <Merge />}
      <div className="blur-background"></div>
      <div className="create-contact-main">
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
          <Form.Group controlId="Phonenumber">
            <Row style={{ marginTop: "2vh" }}>
              <Col md={1}></Col>
              <Col md={2}>
                <Form.Label>
                  <strong>Phone No:</strong>
                </Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="tel"
                  placeholder="Enter 10 digit number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  required
                  pattern="[0-9]{10}"
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
              <Button type="submit">Create Contact</Button>
            </Col>
            <Button onClick={() => setcreate(false)}>close</Button>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default CreateContact;
