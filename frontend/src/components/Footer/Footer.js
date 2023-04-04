import React from "react";
import { Col, Container, Row } from "react-bootstrap";

function Footer() {
  return (
    <footer
      style={{
        width: "100%",
        position: "relative",
        bottom: "0",
        // backgroundColor: "yellow",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Container>
        <Row>
          <Col className="text-center py-3">
            Copyright &copy; keep your notes
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
