import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listContacts, deleteContact } from "../../actions/contactActions";
import Loading from "../../components/Loading/Loading";
import ErrorMessage from "../../components/Error/Error";
import { Button } from "react-bootstrap";
import "../../cssfile/ContactComp.css";
import CreateContact from "../../components/CreateContact/CreateContact";

const MyContacts = ({ search }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showcreate, setcreate] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { error, contact, loading } = useSelector((state) => state.contactList);
  if (contact) {
    contact.sort(function (a, b) {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      if (a.name === b.name) {
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

  const deleteHandler = (id) => {
    if (window.confirm("Do you really want to delete this Contact")) {
      dispatch(deleteContact(id));
    }
  };
  const createcontact = useSelector((state) => state.createContact);
  const { success: successCreate } = createcontact;
  // console.log(contact);
  useEffect(() => {
    dispatch(listContacts());
    if (!userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo, dispatch, successDelete, successCreate]);
  return (
    <>
      {showcreate && <CreateContact setcreate={setcreate} />}
      <MainScreen title={userInfo.name}>
        {errorDelete && (
          <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
        )}
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        <Button
          style={{ marginBottom: "4vh" }}
          size="lg"
          onClick={() => {
            if (showcreate) {
              setcreate(false);
            } else {
              setcreate(true);
            }
          }}
        >
          Create New Contact
        </Button>
        {loadingDelete && !loading && <Loading />}
        {loading && !loadingDelete && <Loading />}
        {contact &&
          contact
            .filter((value) =>
              value.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((value) => (
              <>
                <div className="contact-comp-main">
                  <div>
                    <span style={{ marginLeft: "2vw", fontSize: "5vh" }}>
                      <strong>{value.name}</strong>
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
                    <Button style={{ marginLeft: "2vw" }}>Open</Button>
                  </div>
                </div>
                <hr />
              </>
            ))}
      </MainScreen>
    </>
  );
};

export default MyContacts;
