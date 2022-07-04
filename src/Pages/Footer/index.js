import { Col, Container, Row } from "react-bootstrap";
import "./style.css"

const Footer = () => {
  return (
    <footer className="Footer">
      <Container>
        <Row>
          <Col>
            Todos os direitos reservados - Números não mentem &copy; {new Date().getFullYear()}
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;