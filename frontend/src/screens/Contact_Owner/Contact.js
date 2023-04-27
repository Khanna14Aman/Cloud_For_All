import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MainScreen from "../../components/MainScreen/MainScreen";
import { Container } from "react-bootstrap";

const Contact = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo || userInfo.isAdmin) {
      navigate("/");
    }
  }, [navigate, userInfo]);
  return (
    <div>
      <MainScreen title="ASK ANYTHING">
        <Container
          fluid
          style={{ height: "50vh", backgroundColor: "gray" }}
        ></Container>
        <div></div>
      </MainScreen>
    </div>
  );
};

export default Contact;
