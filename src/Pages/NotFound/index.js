import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Col, Container, Row } from "react-bootstrap";

const NotFound = () => {
  return (
    <div className="NotFound">
      <Header />
      <Container className="Content-wrapper">
        <Row>
          <Col>
            <h1>Página não encontrada</h1>
            <p>
              A página procurada não está disponível ou não existe.<br/>
              Certifique-se do endereço digitado, ou tente novamente mais tarde.
            </p>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default NotFound;