import React, { useState, useEffect } from "react";
import { AiOutlineSchedule } from "react-icons/ai";
import "./Navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/index";
import { Link } from "react-router-dom";

export default function Navbar() {
    const dispatch = useDispatch();
    const isLoggedin = useSelector(state => state.isLoggedin);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    function toggleMenu() {
        if (isAnimating) return;
        setIsMenuOpen(!isMenuOpen);
        setIsAnimating(true);
    }

    function handleButtonClick() {
        setIsMenuOpen(false);
    }

    function logout() {
        handleButtonClick();
        sessionStorage.removeItem("id");
        dispatch(authActions.logout());
    }

    useEffect(() => {
        if (isAnimating) {
            const timer = setTimeout(() => setIsAnimating(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isAnimating]);

    return (
        <>
            <div className="navbar">
                <div className="title">
                    <AiOutlineSchedule className="icon" />
                    <a href="/todo" onClick={handleButtonClick}>TODO</a>
                </div>
                <div className="menu-icon" onClick={toggleMenu}>&#9776;</div>
                <div className={`nav-links ${isMenuOpen ? 'open' : 'closing'}`}>
                    <Link to="/" onClick={handleButtonClick}>Home</Link>
                    <Link to="/todo" onClick={handleButtonClick}>Todo</Link>
                    {!isLoggedin &&
                        <>
                            <Link to="/signup" onClick={handleButtonClick} className="btn-signup">Sign Up</Link>
                            <Link to="/login" onClick={handleButtonClick} className="btn-login">Log In</Link>
                        </>
                    }
                    {isLoggedin && <Link to="/" onClick={logout} className="btn-logout">Log Out</Link>}
                </div>
            </div>
            {isMenuOpen && <div className="overlay" onClick={toggleMenu}></div>}
        </>
    );
}
