import React, { useEffect, useState } from "react";
import "../../cssfile/SingleContact.css";
import CopySvg from "../../components/CopySvg/CopySvg";
import MainScreen from "../../components/MainScreen/MainScreen";
import Loading from "../../components/Loading/Loading";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteOneContact, getoneContact } from "../../actions/contactActions";
import ErrorMessage from "../../components/Error/Error";
import { Button, Col, Row } from "react-bootstrap";
import UpdateOneContact from "../../components/UpdateOneContact/UpdateOneContact";
import AddOneNumber from "../../components/AddOneNumber/AddOneNumber";

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
    useEffect(() => {
      document.body.style.overflowY = "hidden";
      return () => (document.body.style.overflowY = "scroll");
    }, []);
    return (
      <>
        <div className="blur-background"></div>
        <div
          style={{
            zIndex: "3",
            borderRadius: "20px",
            height: "30%",
            width: "40%",
            backgroundColor: "red",
            position: "fixed",
            left: "30%",
            top: "35%",
            padding: "2vh",
            textAlign: "center",
            position: "fixed",
          }}
        >
          <div>
            <h2>
              <b>Are You Sure to Delete this number.</b>
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
              onClick={() => {
                dispatch(deleteOneContact(ID.id, deleteid));
                setDelete(false);
              }}
            >
              Delete
            </Button>
            <Button onClick={() => setDelete(false)}>Close</Button>
          </div>
        </div>
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
      <div className="single-contact-head">
        <Row>
          <Col md={1}></Col>
          <Col md={3}>
            <h1>
              <b>Name:</b>
            </h1>
          </Col>
          <Col>
            <h1>{oneContact && oneContact.name}</h1>
          </Col>
        </Row>
        <Row>
          <Col md={1}></Col>
          <Col md={3}>
            <h1>
              <b>Designation:</b>
            </h1>
          </Col>
          <Col>
            <h1>{oneContact && oneContact.designation}</h1>
          </Col>
        </Row>{" "}
        <Row>
          <Col md={1}></Col>
          <Col md={3}>
            <h1>
              <b>Country:</b>
            </h1>
          </Col>
          <Col>
            <h1>{oneContact && oneContact.country}</h1>
          </Col>
        </Row>{" "}
        <Row>
          <Col md={1}></Col>
          <Col md={3}>
            <h1>
              <b>State:</b>
            </h1>
          </Col>
          <Col>
            <h1>{oneContact && oneContact.state}</h1>
          </Col>
        </Row>{" "}
        <Row>
          <Col md={1}></Col>
          <Col md={3}>
            <h1>
              <b>City:</b>
            </h1>
          </Col>
          <Col>
            <h1>{oneContact && oneContact.city}</h1>
          </Col>
        </Row>
      </div>
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
          <div key={value._id}>
            <div className="single-contact-comp">
              <div style={{ display: "flex" }}>
                <span style={{ marginLeft: "2vw", fontSize: "5vh" }}>
                  <strong>{value.number}</strong>
                </span>
                <CopySvg number={value.number} />
              </div>
              <div style={{ marginRight: "2vw" }}>
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
              </div>
            </div>
            <hr />
          </div>
        ))}
    </MainScreen>
  );
};

export default SingleContact;
