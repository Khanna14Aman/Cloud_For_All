import React, { useEffect, useState } from "react";
import "../../cssfile/SingleContact.css";
import CopySvg from "../../components/CopySvg/CopySvg";
import MainScreen from "../../components/MainScreen/MainScreen";
import Loading from "../../components/Loading/Loading";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteOneContact, getoneContact } from "../../actions/contactActions";
import ErrorMessage from "../../components/Error/Error";
import { Button, Col, Container, Row } from "react-bootstrap";
import UpdateOneContact from "../../components/UpdateOneContact/UpdateOneContact";
import AddOneNumber from "../../components/AddOneNumber/AddOneNumber";
import useMediaQuery from "@mui/material/useMediaQuery";

const SingleContact = () => {
  const ID = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [showadd, setadd] = useState(false);
  const [showedit, setedit] = useState(false);
  const [prevnumber, setprevnumber] = useState("");
  const [oneid, setid] = useState("");

  const { loading, error, oneContact } = useSelector(
    (state) => state.getOneContact
  );

  const updateonecontact = useSelector((state) => state.updateOneContact);
  const {
    loading: loadingUpdateOne,
    error: errorUpdateOne,
    success: successUpdateOne,
  } = updateonecontact;

  const deleteonecontact = useSelector((state) => state.deleteOneContact);
  const {
    loading: loadingDeleteOne,
    error: errorDeleteOne,
    success: successDeleteOne,
  } = deleteonecontact;

  const addonecontact = useSelector((state) => state.addOneContact);
  const {
    loading: loadingAddOneContact,
    error: errorAddOneContact,
    success: successAddOneContact,
  } = addonecontact;

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
    dispatch(getoneContact(ID.id));
  }, [
    userInfo,
    ID.id,
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
            <Col sm={1} lg={1} md={1}></Col>
            <Col sm={10} lg={10} md={10} style={{ textAlign: "center" }}>
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
                  dispatch(deleteOneContact(ID.id, deleteid));
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
  // const deleteHandler = (id) => {
  //   if (window.confirm("Are you sure to delete this Contact?")) {
  //     dispatch(deleteOneContact(ID.id, id));
  //   } else {
  //     return;
  //   }
  // };
  return (
    <MainScreen title="SingleContact">
      {showDelete && <DeleteModal />}
      {showedit && (
        <UpdateOneContact
          setedit={setedit}
          id={ID.id}
          contactId={oneid}
          number={prevnumber}
        />
      )}
      {showadd && <AddOneNumber setadd={setadd} id={ID.id} />}
      {(loading ||
        loadingDeleteOne ||
        loadingUpdateOne ||
        loadingAddOneContact) && (
        <div style={{ height: "20vh" }}>
          <Loading />
        </div>
      )}
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {errorAddOneContact && (
        <ErrorMessage variant="danger">{errorAddOneContact}</ErrorMessage>
      )}
      {errorDeleteOne && (
        <ErrorMessage variant="danger">{errorDeleteOne}</ErrorMessage>
      )}
      {errorUpdateOne && (
        <ErrorMessage variant="danger">{errorUpdateOne}</ErrorMessage>
      )}
      <Container className="single-contact-head">
        <Row>
          <Col md={1} lg={1}></Col>
          <Col md={3} lg={3}>
            <h1>
              <b>Name:</b>
            </h1>
          </Col>
          <Col>
            <h1>{oneContact && oneContact.name}</h1>
          </Col>
        </Row>
        <Row>
          <Col md={1} lg={1}></Col>
          <Col md={3} lg={3}>
            <h1>
              <b>Designation:</b>
            </h1>
          </Col>
          <Col>
            <h1>{oneContact && oneContact.designation}</h1>
          </Col>
        </Row>{" "}
        <Row>
          <Col md={1} lg={1}></Col>
          <Col md={3} lg={3}>
            <h1>
              <b>Country:</b>
            </h1>
          </Col>
          <Col>
            <h1>{oneContact && oneContact.country}</h1>
          </Col>
        </Row>{" "}
        <Row>
          <Col md={1} lg={1}></Col>
          <Col md={3} lg={3}>
            <h1>
              <b>State:</b>
            </h1>
          </Col>
          <Col>
            <h1>{oneContact && oneContact.state}</h1>
          </Col>
        </Row>{" "}
        <Row>
          <Col md={1} lg={1}></Col>
          <Col md={3} lg={3}>
            <h1>
              <b>City:</b>
            </h1>
          </Col>
          <Col>
            <h1>{oneContact && oneContact.city}</h1>
          </Col>
        </Row>
      </Container>
      <Button
        style={{ marginTop: "1vh" }}
        onClick={() => {
          setadd(true);
          setedit(false);
        }}
      >
        Add More Number
      </Button>
      {oneContact &&
        oneContact.phonenumber.map((value) => (
          <Container key={value._id}>
            <Row className="single-contact-comp">
              <Col md={8} lg={9} sm={12} style={{ display: "flex" }}>
                <span style={{ marginLeft: "2vw", fontSize: "5vh" }}>
                  <strong>{value.number}</strong>
                </span>
                <CopySvg number={value.number} />
              </Col>
              <Col style={{ marginRight: "2vw" }}>
                <Button
                  style={{ marginLeft: "2vw" }}
                  onClick={() => {
                    setadd(false);
                    if (showedit) {
                      setedit(false);
                      setprevnumber("");
                      setid("");
                    } else {
                      setedit(true);
                      setprevnumber(value.number);
                      setid(value._id);
                    }
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  style={{ marginLeft: "2vw" }}
                  onClick={() => {
                    setDelete(true);
                    setdeleteid(value._id);
                    // deleteHandler(value._id);
                  }}
                >
                  Delete
                </Button>
              </Col>
            </Row>
            <hr />
          </Container>
        ))}
    </MainScreen>
  );
};

export default SingleContact;
