import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import './style.css';
import { Col, Container, Row } from "react-bootstrap";

const Home = () => {
  return (
    <>
      <Header transparent />
      <div className="TopContent">
        <p>
          <b>NOSSA MISSÃO É</b><br/>
          TE AJUDAR NA SUA
        </p>
      </div>
      <Container>
        <Row>
          <Col md={7}>
            <h2>Como avaliar um candidato?</h2>
            <p>
              No período de eleição candidatos disponibilizam seu plano de governo, mas isso não garente que ele irá cumprir tudo que promete.
              Se não bastasse, esse materiais tem como objetivo vender o candido e nos lubridiar.
            </p>
            <p>
              Por outro lado, um candido que já esteve a frente de um governo já nos mostrou seus interesses e o 
              quanto foi efetivo no cumprimento de seu dever.
            </p>
          </Col>
        </Row>
        <Row>
          <Col md={10}>
            <h2>Números não mentem</h2>
            <p>
              Candidatos disponibilizam seu plano de governo, mas isso não garente que ele irá cumprir tudo que promete.
            </p>
            <p>
              Apesar disso, um candido que já esteve a frente de um governo já nos mostrou seus interesses e o 
              quanto foi efetivo no cumprimento de seu dever.
            </p>

            <h2>Dados simples</h2>
            <p>
              Buscamos trazer indicadores comuns que afetam seu dia-a-dia e compara-los com outros que são relacionados, de forma a facilitar sua análise.
            </p>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default Home;