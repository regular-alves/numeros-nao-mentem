import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './style.css';
import { ReactComponent as Logo } from '../../assets/images/Logo.svg';
import Presidents from '../../Dtos/Presidents';
import { Col, Container, Row } from "react-bootstrap";
import { MdClose, MdMenu } from 'react-icons/md';

const Header = props => {
	const [menuOpened, setMenuOpened] = useState(false);
	const { transparent } = props;
	const presidents = new Presidents();

	const start = new Date();
	
	start.setFullYear( start.getFullYear() - 16 );

	const list = presidents.getPeriod(start, new Date());

	const menuClickHandler = e => {
		e.preventDefault();

		setMenuOpened(!menuOpened);
	}

	useEffect(() => {}, [menuOpened]);

	return (
		<div className={`Header ${transparent ? 'Header--isTransparent' : ''}`}>
			<Container className="Header-wrapper">
				<Row>
					<Col md={3} sm={5} className="Header-content">
						<Link to="/" className="Header-logo">
							<Logo alt="Não mentem"/>
						</Link>
					</Col>
					<Col className="Menu-icon" sm={{span: 2, offset: 5}}>
						<button className="Menu-button" onClick={e => menuClickHandler(e)}>
							{
								menuOpened ? 
								<MdClose /> : 
								<MdMenu />	
							}
						</button>
					</Col>
					<Col 
						className={`Menu ${menuOpened ? 'Menu--isOpened' : ''}`} 
						md={9} 
						sm={12}
					>
						<ul className="Header-menu">
							<li className="Header-menuItem">
								<Link to="/cesta-basica">Cesta Básica</Link>
							</li>
							<li className="Header-menuItem">
								<Link to="/desmatamento">Desmatamento</Link>
							</li>
							<li className="Header-menuItem Header-hasSubmenu">
								<b>Presidentes</b>
								<ul className="Header-menu">
									{list.map(president => (
										<li className="Header-menuItem">
											<Link to={`/presidentes/${president.slug}`}>
												{president.name.split(' ').slice(0, 2).join(' ')}
											</Link>
										</li>
									))}
								</ul>
							</li>
						</ul>
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default Header;