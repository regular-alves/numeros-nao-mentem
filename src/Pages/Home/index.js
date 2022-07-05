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
            <p>
              Muitas vezes, nós como leigos, acabamos não sabemos como avaliar um candidato. 
              São diversos fatores, dados e nem sempre sabemos onde procurar, ou como analisá-los.
              E no momento de tomar uma decisão, não basta ter opinião. A gente pode estar enviesado por um momento bom, ou ruim. 
              E já que estamos falando de um governo, podemos nos deixar influenciar com medidas em período de eleição:
            </p>
            <ul>
              <li>Aquela estação nova que foi inaugurada é ótima, <b><i>mas está atrasada a 10 anos</i></b></li>
              <li>Nossa, o dólar está abaixando, <b><i>mas o governo pode estar injetando para frear a consequencia de um escandalo</i></b></li>
            </ul>
            <h2>Mas como avaliar posso avaliar candidato?</h2>
            <p>
              No período de eleição candidatos disponibilizam seu plano de governo, mas isso não garente que ele irá cumprir tudo que promete.
              Se não bastasse, esse materiais tem como objetivo vender o candido e nos lubridiar.<br/>
              Por outro lado, um candido que já esteve a frente de um governo já nos mostrou seus interesses e o 
              quanto foi efetivo no cumprimento de seu dever.
            </p>
          </Col>
        </Row>
        <Row>
          <Col md={10}>
            <h2>Números não mentem</h2>
            <p>
              Os indicadores da economia são uma excelente indicador de qualidade de um governo.
            </p>
            <p>
              <b>"Tá, mas e a Covid? E o estouro da bolha imobiliária americana?"</b>
            </p>
            <p>
              Fatores externos ao governo, sejam positivos ou negativos, podem ser indificados no gráficos. Mas estes são um grão de areia.
            </p>

            <h2>Dados simples</h2>
            <p>
              <b>"Bom, mas e aí? Como posso analisar os dados?"</b>
            </p>
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