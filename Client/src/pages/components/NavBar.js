import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <>
            <header className="header-section">
                <div className="container">
                    <div className="header-wrapper">
                        <div className="logo">
                            <a href="/">
                                <img src="/logo-red-ed.png" style={{ height: "70px" }} alt="logo" /><span><h5>Evento</h5></span>
                            </a>
                        </div>
                        <ul className="menu">
                            <li>
                                <Link to="/" className="active">Home</Link>
                               
                            </li>


                          
                            <li>
                                <Link to="/aboutus">About us</Link>
                                
                            </li>
                     
                            
                            <li>
                                <Link to="/contact">contact</Link>
                            </li>

                            <li>
                                <Link to="/signup">Add Events<br/>(Organizer)</Link>
                            </li>

                            
                            <li>
                                <Link to="/user_login">Login</Link>
                                
                            </li>

                            <li className="header-button pr-0">
                                <Link to="/signup_user"> Join Now!</Link>
                            </li>

                            
                        </ul>
                        <div className="header-bar d-lg-none">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default NavBar;