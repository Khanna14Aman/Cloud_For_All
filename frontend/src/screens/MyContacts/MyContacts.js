import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { listContacts, deleteContact } from "../../actions/contactActions";
import Loading from "../../components/Loading/Loading";
import ErrorMessage from "../../components/Error/Error";
import { Button, Col, Container, Row } from "react-bootstrap";
import "../../cssfile/ContactComp.css";
import CreateContact from "../../components/CreateContact/CreateContact";
import UpdateContact from "../../components/UpdateContact/UpdateContact";
import useMediaQuery from "@mui/material/useMediaQuery";

const MyContacts = ({ search }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showcreate, setcreate] = useState(false);
  const [showedit, setedit] = useState(false);
  const [_id, setId] = useState("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [designation, setDesignation] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const { error, contact, loading } = useSelector((state) => state.contactList);
  if (contact) {
    contact.sort(function (a, b) {
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      }
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      }
      if (a.name.toLowerCase() === b.name.toLowerCase()) {
        return 0;
      }
    });
  }
  const deletecontact = useSelector((state) => state.deleteContact);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = deletecontact;

  // const deleteHandler = (id) => {
  //   if (window.confirm("Do you really want to delete this Contact")) {
  //     dispatch(deleteContact(id));
  //   }
  // };
  const createcontact = useSelector((state) => state.createContact);
  const { success: successCreate } = createcontact;

  const updatecontact = useSelector((state) => state.updateContact);
  const { success: successUpdate } = updatecontact;

  const updateonecontact = useSelector((state) => state.updateOneContact);
  const { success: successUpdateOne } = updateonecontact;

  const deleteonecontact = useSelector((state) => state.deleteOneContact);
  const { success: successDeleteOne } = deleteonecontact;

  const addonecontact = useSelector((state) => state.addOneContact);
  const { success: successAddOneContact } = addonecontact;

  // console.log(contact);
  useEffect(() => {
    dispatch(listContacts());
    if (!userInfo) {
      navigate("/");
    }
  }, [
    navigate,
    userInfo,
    dispatch,
    successDelete,
    successCreate,
    successUpdate,
    successDeleteOne,
    successUpdateOne,
    successAddOneContact,
  ]);

  const [deleteid, setdeleteid] = useState("");
  const [showDelete, setDelete] = useState(false);
  const DeleteModal = () => {
    const widthMatch = useMediaQuery("(min-width:570px)");
    const widthMatch2 = useMediaQuery("(max-width:800px)");
    useEffect(() => {
      document.body.style.overflowY = "hidden";
      return () => (document.body.style.overflowY = "scroll");
    }, []);
    return (
      <>
        <div className="blur-background"></div>
        <Container
          style={{
            zIndex: "3",
            borderRadius: "20px",
            minHeight: "30%",
            width:
              widthMatch2 && widthMatch ? "80%" : widthMatch ? "40%" : "100%",
            backgroundColor: "red",
            position: "fixed",
            left: widthMatch2 && widthMatch ? "10%" : widthMatch ? "30%" : "0%",
            top: "35%",
            padding: "2vh",
            position: "fixed",
          }}
        >
          <Row>
            <Col lg={1} md={1} sm={1}></Col>
            <Col lg={10} md={10} sm={10} style={{ textAlign: "center" }}>
              <h2>
                <b>Are You Sure to Delete this number.</b>
              </h2>
            </Col>
          </Row>
          <Row>
            <Col sm={1} lg={1} md={1}></Col>
            <Col
              sm={10}
              lg={10}
              md={10}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Button
                onClick={() => {
                  dispatch(deleteContact(deleteid));
                  setDelete(false);
                }}
              >
                Delete
              </Button>
              <Button onClick={() => setDelete(false)}>Close</Button>
            </Col>
          </Row>
        </Container>
      </>
    );
  };
  return (
    <>
      {showDelete && <DeleteModal />}
      {showcreate && <CreateContact setcreate={setcreate} />}
      {showedit && (
        <UpdateContact
          setedit={setedit}
          Name={name}
          Country={country}
          State={state}
          City={city}
          Designation={designation}
          id={_id}
        />
      )}
      <MainScreen title={userInfo.name}>
        {errorDelete && (
          <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
        )}
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        <Button
          style={{ marginBottom: "4vh" }}
          size="lg"
          onClick={() => {
            setedit(false);
            if (showcreate) {
              setcreate(false);
            } else {
              setcreate(true);
            }
          }}
        >
          Create New Contact
        </Button>
        {(loading || loadingDelete) && (
          <div style={{ height: "5vh" }}>
            <Loading />
          </div>
        )}
        {contact &&
          contact
            .filter((value) =>
              value.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((value) => (
              <Container key={value._id}>
                <Row className="contact-comp-main" key={value._id}>
                  <Col md={7} lg={9} sm={12}>
                    <span style={{ marginLeft: "1vw", fontSize: "5vh" }}>
                      <strong>{value.name}</strong>
                    </span>
                  </Col>
                  <Col>
                    <Button
                      style={{ marginLeft: "2vw" }}
                      onClick={() => {
                        setcreate(false);
                        if (showedit) {
                          setedit(false);
                        } else {
                          setId(value._id);
                          setedit(true);
                          setName(value.name);
                          setCountry(value.country);
                          setState(value.state);
                          setCity(value.city);
                          setDesignation(value.designation);
                        }
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      style={{ marginLeft: "1vw" }}
                      onClick={() => {
                        // deleteHandler(value._id);
                        setdeleteid(value._id);
                        setDelete(true);
                      }}
                    >
                      Delete
                    </Button>
                    <Link to={`/mycontact/${value._id}`}>
                      <Button style={{ marginLeft: "1vw" }}>Open</Button>
                    </Link>
                  </Col>
                </Row>
                <hr />
              </Container>
            ))}
      </MainScreen>
    </>
  );
};

export default MyContacts;
