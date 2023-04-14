import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { listContacts, deleteContact } from "../../actions/contactActions";
import Loading from "../../components/Loading/Loading";
import ErrorMessage from "../../components/Error/Error";
import { Button } from "react-bootstrap";
import "../../cssfile/ContactComp.css";
import CreateContact from "../../components/CreateContact/CreateContact";
import UpdateContact from "../../components/UpdateContact/UpdateContact";

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

  const deleteHandler = (id) => {
    if (window.confirm("Do you really want to delete this Contact")) {
      dispatch(deleteContact(id));
    }
  };
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
  return (
    <>
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
              <>
                <div className="contact-comp-main">
                  <div>
                    <span style={{ marginLeft: "2vw", fontSize: "5vh" }}>
                      <strong>{value.name}</strong>
                    </span>
                  </div>
                  <div style={{ marginRight: "2vw" }}>
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
                      style={{ marginLeft: "2vw" }}
                      onClick={() => deleteHandler(value._id)}
                    >
                      Delete
                    </Button>
                    <Link to={`/mycontact/${value._id}`}>
                      <Button style={{ marginLeft: "2vw" }}>Open</Button>
                    </Link>
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
