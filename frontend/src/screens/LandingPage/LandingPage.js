import React, { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "../../cssfile/LandingPage.css";

const LandingPage = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate("/home");
    }
  }, [navigate, userInfo]);

  return (
    <div className="main">
      <Container fluid>
        <Row>
          <div className="intro-text">
            <div>
              <p className="title">Welcome to Cloud_For_All</p>
              <p className="subtitle">Keep your all data safe here.</p>
            </div>
            <Container fluid className="buttonContainer">
              <Row className="button-row">
                <Col md={6} lg={6} sm={6}>
                  <Link to="/login">
                    <Button variant="dark" size="lg" className="landingButton">
                      Login
                    </Button>
                  </Link>
                </Col>
              </Row>
              <Row className="button-row">
                <Col md={6} lg={6} sm={6}>
                  <Link to="/register">
                    <Button
                      variant="secondary"
                      size="lg"
                      className="landingButton"
                    >
                      SignUp
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Container>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
