import React, { useState } from "react";
import { AiOutlineSchedule } from "react-icons/ai";
import "./Navbar.css";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function toggleMenu() {
        setIsMenuOpen(!isMenuOpen);
    }

    function handleButtonClick() {
        setIsMenuOpen(false);
    }

    return (
        <>
            <div className="navbar">
                <div className="title"><AiOutlineSchedule className="icon" /><a href="/todo" onClick={handleButtonClick}>TODO</a></div>
                <div className="menu-icon" onClick={toggleMenu}>&#9776;</div>
                <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                    <a href="/" onClick={handleButtonClick}>Home</a>
                    <a href="/todo" onClick={handleButtonClick}>Todo</a>
                    <a href="/signup" onClick={handleButtonClick} className="btn-signup">Sign Up</a>
                    <a href="/login" onClick={handleButtonClick} className="btn-login">Log In</a>
                    <a href="/" onClick={handleButtonClick} className="btn-logout">Log Out</a>
                </div>
            </div>
            {isMenuOpen && <div className="overlay" onClick={toggleMenu}></div>}
        </>
    );
}
