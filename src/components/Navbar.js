import { NavLink } from "react-router-dom";
import "./styles/Navbar.css";
import logo from "../assets/logo.png"
const Navbar = () => {
  return (
    <header className="header">
      <nav className="nav container">
        <NavLink to="/" className="nav__logo">
        <img src={logo} alt="Logo" className="logo-image" />
        </NavLink>

        <div className="nav__menu" id="nav-menu">
          <ul className="nav__list">
            <li className="nav__item">
              <NavLink to="/docs" className="nav__link" activeClassName="active-link">
                Docs
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/about" className="nav__link" activeClassName="active-link">
                About
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/supportus" className="nav__link" activeClassName="active-link">
                SUPPORT US
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
