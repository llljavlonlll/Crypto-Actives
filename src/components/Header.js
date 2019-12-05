import React from "react";

export default function Header() {
    return (
        <nav className="navbar">
            {/*<p className="navbar__logo">Crypto Actives</p>*/}
            <img src="../images/hero_logo.png" alt="logo" id="hero_logo"></img>
            <img
                src="../images/mobile_logo.png"
                alt="logo"
                id="mobile_logo"
            ></img>
            <ul className="navbar__links">
                <li>
                    <a href="/#">Home</a>
                </li>
                <li>
                    <a href="/#">Market</a>
                </li>
                {/*
                <li>
                    <a href="/#">Portfolio</a>
                </li>
                <li>
                    <a href="/#">Testimonial</a>
                </li> */}
                <li>
                    <a href="/#">Contact</a>
                </li>
            </ul>
        </nav>
    );
}
