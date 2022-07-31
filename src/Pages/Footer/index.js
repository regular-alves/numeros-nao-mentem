import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsGithub, BsTwitter } from 'react-icons/bs';
import Presidents from '../../Dtos/Presidents';
import './style.css';

function Footer() {
  const presidents = new Presidents();
  const start = new Date();

  start.setFullYear(start.getFullYear() - 16);

  const list = presidents.getPeriod(start, new Date());

  return (
    <footer className="Footer">
      <Container>
        <Row>
          <Col md={9} className="mb-sm-3">
            <Row>
              <Col md={3} className="mb-sm-3">
                <h4>Alimentação</h4>
                <ul className="Sitemap">
                  <li className="Sitemap-item">
                    <Link to="/cesta-basica">Cesta Básica</Link>
                  </li>
                  <li className="Sitemap-item">
                    <Link to="/inseguranca-alimentar">
                      Insegurança Alimentar
                    </Link>
                  </li>
                </ul>
              </Col>
              <Col md={3} className="mb-sm-3">
                <h4>Meio Ambiente</h4>
                <ul className="Sitemap">
                  <li className="Sitemap-item">
                    <Link to="/desmatamento">Desmatamento</Link>
                  </li>
                </ul>
              </Col>
              <Col md={3} className="mb-sm-3">
                <h4>Presidentes</h4>
                <ul className="Sitemap">
                  {list.map((president) => (
                    <li className="Sitemap-item">
                      <Link to={`/presidentes/${president.slug}`}>
                        {president.name.split(' ').slice(0, 2).join(' ')}
                      </Link>
                    </li>
                  ))}
                </ul>
                <h5>
                  <Link to="/comparacao" className="Sitemap-item">
                    Compare
                  </Link>
                </h5>
              </Col>
            </Row>
          </Col>
          <Col md={3} className="mb-sm-3">
            <h4>Este é um site colaborativo</h4>
            <p>
              Queremos construir uma ferramenta para todos. Envie sugestões,
              correções e elogios
            </p>
            <Button type="button" href="mailto:falecom@numerosnaomentem.com">
              Colabore
            </Button>
          </Col>
        </Row>

        <Row className="Footer-bottomContent">
          <Col sm={9}>
            Todos os direitos reservados - Números não mentem &copy;{' '}
            {new Date().getFullYear()}
          </Col>
          <Col sm={3}>
            <ul className="Social">
              <li className="Social-item">
                <a
                  href="https://github.com/regular-alves/numeros-nao-mentem"
                  alt="ir para o Github"
                  title="ir para o Github"
                  nofollow="true"
                >
                  <BsGithub />
                </a>
              </li>
              <li className="Social-item">
                <a
                  href="https://twitter.com/nao_mentem"
                  alt="ir para o twitter"
                  title="ir para o twitter"
                  nofollow="true"
                >
                  <BsTwitter />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
