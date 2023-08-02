import React from "react";
import {Link, NavLink} from "react-router-dom";
import logo from './logo.svg'
import './Navbar.css';


export const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="container">
                <div className="logo">
                    <Link to='/'><img src={logo} alt="Company logo"/></Link>
                </div>
                <div className="nav-elements">
                    <ul>
                        <li>
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact">Contact</NavLink>
                        </li>
                        <li>
                            <NavLink to="/signin">Sign in</NavLink>
                        </li>
                        <li>
                            <NavLink to="/signup">Sign up</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}