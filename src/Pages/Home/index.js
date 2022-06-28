import React from "react";
import Header from "../Header";
import Wrapper from "../../Components/Wrapper";
import HalfWidth from "../../Components/HalfWidth";
import Featured from "../../Components/Featured";
import './style.css';

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
      <Wrapper>
        <HalfWidth>
          <h2>Como avaliar um candidato?</h2>
          <p>
            No período de eleição candidatos disponibilizam seu plano de governo, mas isso não garente que ele irá cumprir tudo que promete.
            Se não bastasse, esse materiais tem como objetivo vender o candido e nos lubridiar.
          </p>
          <p>
            Por outro lado, um candido que já esteve a frente de um governo já nos mostrou seus interesses e o 
            quanto foi efetivo no cumprimento de seu dever.
          </p>
        </HalfWidth>
        <Featured>
          NÚMEROS NÃO MENTEM
        </Featured>
        <HalfWidth>
          <p>
            Candidatos disponibilizam seu plano de governo, mas isso não garente que ele irá cumprir tudo que promete.
          </p>
          <p>
            Apesar disso, um candido que já esteve a frente de um governo já nos mostrou seus interesses e o 
            quanto foi efetivo no cumprimento de seu dever.
          </p>
        </HalfWidth>
      </Wrapper>
    </>
  );
}

export default Home;