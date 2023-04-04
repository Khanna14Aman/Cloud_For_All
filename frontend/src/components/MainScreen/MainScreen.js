import React from "react";
import { Container, Row } from "react-bootstrap";
import "./Mainscreen.css";

function MainScreen({ title, children }) {
  return (
    <div className="mainscreen">
      <Container>
        <Row>
          <div className="page">
            {title && (
              <>
                <h1 className="heading">{title}</h1>
                <hr />
              </>
            )}
            {children}
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default MainScreen;
