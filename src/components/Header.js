import React from "react";
import { NavLink as Link } from "react-router-dom";
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from "reactstrap";
import { HamburgerCollapse } from "react-animated-burgers";

class Header extends React.Component {
    state = {
        isActive: false,
        collapsed: false
    };

    toggleButton = () => {
        this.setState({
            isActive: !this.state.isActive
        });
    };

    toggleNavbar = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
    };

    toggleMenu = () => {
        this.setState({
            isActive: false,
            collapsed: false
        });
    };

    render() {
        return (
            <Navbar className="navbar">
                {/*<p className="navbar__logo">Crypto Actives</p>*/}
                <div className="container">
                    <Link to="/" className="hero_logo">
                        <img
                            src="../images/hero_logo.png"
                            alt="logo"
                            id="hero_logo"
                        ></img>
                    </Link>
                    <Link to="/" className="mobile_logo">
                        <img
                            src="../images/mobile_logo.png"
                            alt="logo"
                            id="mobile_logo"
                        ></img>
                    </Link>
                    <ul className="navbar__links">
                        <li>
                            <Link exact to="/" activeClassName="selected">
                                Sotib olish
                            </Link>
                        </li>
                        <li>
                            <Link to="/sell" activeClassName="selected">
                                Sotish
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" activeClassName="selected">
                                Aloqa
                            </Link>
                        </li>
                    </ul>
                    <NavbarToggler onClick={this.toggleNavbar}>
                        <HamburgerCollapse
                            isActive={this.state.isActive}
                            toggleButton={this.toggleButton}
                            className="burger-menu"
                            barColor="white"
                        />
                    </NavbarToggler>
                    <Collapse isOpen={this.state.collapsed} navbar>
                        <Nav navbar>
                            <NavItem>
                                <Link
                                    exact
                                    to="/"
                                    activeClassName="selected"
                                    onClick={this.toggleMenu}
                                >
                                    Sotib olish
                                </Link>
                            </NavItem>
                            <NavItem>
                                <Link
                                    to="/sell"
                                    activeClassName="selected"
                                    onClick={this.toggleMenu}
                                >
                                    Sotish
                                </Link>
                            </NavItem>
                            <NavItem>
                                <Link
                                    to="/contact"
                                    activeClassName="selected"
                                    onClick={this.toggleMenu}
                                >
                                    Aloqa
                                </Link>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </div>
            </Navbar>
        );
    }
}

export default Header;
