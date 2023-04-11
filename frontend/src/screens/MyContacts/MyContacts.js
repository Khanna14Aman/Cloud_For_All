import React, { useEffect } from "react";
import MainScreen from "../../components/MainScreen/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listContacts } from "../../actions/contactActions";
import Loading from "../../components/Loading/Loading";
import ErrorMessage from "../../components/Error/Error";

const MyContacts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { error, contact, loading } = useSelector((state) => state.contactList);
  console.log(contact);
  useEffect(() => {
    dispatch(listContacts());
    if (!userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);
  return (
    <>
      <MainScreen title={userInfo.name}>
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}
        {contact &&
          contact.map((value) => (
            <>
              <h1>id {value._id}</h1>
              <h1>name {value.name}</h1>
              <h1>user id {value.user}</h1>
              <h1>country {value.country}</h1>
              <h1>state {value.state}</h1>
              <h1>city {value.city}</h1>
              <>
                {value.phonenumber.map((val) => (
                  <h1>{val.number}</h1>
                ))}
              </>
              <hr />
            </>
          ))}
      </MainScreen>
    </>
  );
};

export default MyContacts;
