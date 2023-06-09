import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import "../../cssfile/CreateContact.css";
import ErrorMessage from "../Error/Error";
import Loading from "../Loading/Loading";
import { createContact } from "../../actions/contactActions";
import useMediaQuery from "@mui/material/useMediaQuery";

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
    const widthMatch = useMediaQuery("(min-width:580px)");
    const widthMatch2 = useMediaQuery("(max-width:910px)");
    // useEffect(() => {
    //   document.body.style.overflowY = "hidden";
    //   return () => (document.body.style.overflowY = "scroll");
    // }, []);
    return (
      <>
        <div className="blur-background"></div>
        <Container
          style={{
            zIndex: "37",
            borderRadius: "20px",
            minHeight: "40%",
            width:
              widthMatch && widthMatch2 ? "80%" : widthMatch ? "50%" : "100%",
            backgroundColor: "red",
            position: "fixed",
            left: widthMatch && widthMatch2 ? "10%" : widthMatch ? "25%" : "0%",
            top: "30%",
            padding: "2vh",
            position: "fixed",
          }}
        >
          <Row>
            <Col md={1} lg={1} sm={1}></Col>
            <Col md={10} lg={10} sm={10} style={{ textAlign: "center" }}>
              <h2>
                <b>
                  This name is already in your use. So this number will get
                  merge to that name.
                </b>
              </h2>
            </Col>
          </Row>
          <Row>
            <Col md={1} lg={1} sm={1}></Col>
            <Col
              md={10}
              lg={10}
              sm={10}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Button
                variant="success"
                onClick={() => {
                  dispatch(
                    createContact(
                      name,
                      number,
                      state,
                      country,
                      city,
                      designation
                    )
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
            </Col>
          </Row>
        </Container>
      </>
    );
  };

  return (
    <>
      {showMerge && <Merge />}
      <div className="blur-background"></div>
      <Container className="create-contact-main">
        {loading && <Loading></Loading>}
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Row style={{ marginTop: "2vh" }}>
              <Col md={1} lg={1} sm={1}></Col>
              <Col md={2} lg={2} sm={2}>
                <Form.Label>
                  <strong>Name:</strong>
                </Form.Label>
              </Col>
              <Col md={8} lg={8} sm={8}>
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
              <Col md={1} lg={1} sm={1}></Col>
              <Col md={2} lg={2} sm={2}>
                <Form.Label>
                  <strong>Phone No:</strong>
                </Form.Label>
              </Col>
              <Col md={8} lg={8} sm={8}>
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
              <Col md={1} sm={1} lg={1}></Col>
              <Col md={2} sm={2} lg={2}>
                <Form.Label>
                  <strong>Country:</strong>
                </Form.Label>
              </Col>
              <Col md={8} lg={8} sm={8}>
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
              <Col md={1} lg={1} sm={1}></Col>
              <Col md={2} lg={2} sm={2}>
                <Form.Label>
                  <strong>State:</strong>
                </Form.Label>
              </Col>
              <Col md={8} lg={8} sm={8}>
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
              <Col md={1} lg={1} sm={1}></Col>
              <Col md={2} lg={2} sm={2}>
                <Form.Label>
                  <strong>City:</strong>
                </Form.Label>
              </Col>
              <Col md={8} lg={8} sm={8}>
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
              <Col md={1} lg={1} sm={1}></Col>
              <Col md={2} lg={2} sm={2}>
                <Form.Label>
                  <strong>Designation:</strong>
                </Form.Label>
              </Col>
              <Col md={8} lg={8} sm={8}>
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
            <Col md={1} lg={1} sm={1}></Col>
            <Col
              md={10}
              lg={10}
              sm={10}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Button type="submit">Create Contact</Button>
              <Button onClick={() => setcreate(false)}>close</Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default CreateContact;
