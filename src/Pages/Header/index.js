import React from "react";
import { Link } from "react-router-dom";
import './style.css';
import { ReactComponent as Logo } from '../../assets/images/Logo.svg';

const Header = props => {
	const { transparent } = props;

	return (
		<div className={`Header ${transparent ? 'Header--isTransparent' : ''}`}>
			<div className="Header-wrapper">
				<div className="Header-content">
					<Link to="/" className="Header-logo">
						<Logo alt="Não mentem"/>
					</Link>
					<ul className="Header-menu">
						<li className="Header-menuItem">
							<Link to="/cesta-basica">Cesta Básica</Link>
						</li>
						<li className="Header-menuItem">
							<Link to="/divida-publica">Dívida pública</Link>
						</li>
						<li className="Header-menuItem">
							<Link to="/educacao">Educação</Link>
						</li>
						<li className="Header-menuItem Header-hasSubmenu">
							<Link to="/presidentes">Presidentes</Link>
							<ul className="Header-menu">
								<li className="Header-menuItem">
									<Link to="/presidentes/jair-bolsonaro">Jair Bolsonaro</Link>
								</li>
								<li className="Header-menuItem">
									<Link to="/presidentes/michel-temer">Michel Temer</Link>
								</li>
								<li className="Header-menuItem">
									<Link to="/presidentes/dilma-rousseff">Dilma Rousseff</Link>
								</li>
								<li className="Header-menuItem">
									<Link to="/presidentes/lula">Lula</Link>
								</li>
								<li className="Header-menuItem">
									<Link to="/presidentes/fernando-henrique">Fernando Henrique</Link>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

export default Header;