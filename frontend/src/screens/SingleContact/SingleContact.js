import React, { useEffect } from "react";
import "../../cssfile/SingleContact.css";
import MainScreen from "../../components/MainScreen/MainScreen";
import Loading from "../../components/Loading/Loading";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteOneContact, getoneContact } from "../../actions/contactActions";
import ErrorMessage from "../../components/Error/Error";
import { Button, Col, Row } from "react-bootstrap";

const SingleContact = () => {
  const ID = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

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

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
    dispatch(getoneContact(ID.id));
  }, [userInfo, ID.id, successDeleteOne, successUpdateOne]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure to delete this Contact?")) {
      dispatch(deleteOneContact(ID.id, id));
    } else {
      return;
    }
  };
  return (
    <MainScreen title="SingleContact">
      {(loading || loadingDeleteOne || loadingUpdateOne) && (
        <div style={{ height: "20vh" }}>
          <Loading />
        </div>
      )}
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
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
      {oneContact &&
        oneContact.phonenumber.map((value) => (
          <>
            <div className="single-contact-comp">
              <div>
                <span style={{ marginLeft: "2vw", fontSize: "5vh" }}>
                  <strong>{value.number}</strong>
                </span>
              </div>
              <div style={{ marginRight: "2vw" }}>
                <Button style={{ marginLeft: "2vw" }}>Edit</Button>
                <Button
                  variant="danger"
                  style={{ marginLeft: "2vw" }}
                  onClick={() => deleteHandler(value._id)}
                >
                  Delete
                </Button>
              </div>
            </div>
            <hr />
          </>
        ))}
    </MainScreen>
  );
};

export default SingleContact;
