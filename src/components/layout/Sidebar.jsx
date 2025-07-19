import { TbChefHat } from "react-icons/tb";
import { GiBowlOfRice } from "react-icons/gi";
import { RiLoginCircleFill } from "react-icons/ri";
import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { RiToggleFill } from "react-icons/ri";
import { FaToggleOff } from "react-icons/fa6";
import { FaToggleOn } from "react-icons/fa6";
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { clearToken } from "../../Redux/slices/authSlices.js";

const Sidebar = () => {

    const dispatch = useDispatch();

    const authToken = localStorage.getItem('token');
    // console.log(authToken, "Sidebar authToken");

    let user = { name: '', role: '' };

        if (authToken) {
            try {
                const decoded = jwtDecode(authToken);
                // console.log("Decoded Token:", decoded);

                user = {
                    name: decoded.name || 'User',
                    role: decoded.role || 'User',
                };
            } catch (err) {
                console.error("Invalid token:", err);
            }
        }


    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(clearToken());
    };

    return (
        <>
            <header className="tm-header" id="tm-header">
                <div className="tm-header-wrapper">
                    <div className="tm-site-header">
                        <div className="mb-3 mx-auto tm-site-logo"><TbChefHat /></div>
                        <Link className="tm-nav-link" to="/"><h1 className="text-center">Recipe Hub</h1></Link>
                    </div>
                    <nav className="tm-nav" id="tm-nav">
                        {
                            user.role == 'User'
                                ?
                                <ul>
                                    <li className="tm-nav-item active"><Link className="tm-nav-link" to="/">
                                        <i className="fas fa-home" />
                                        Home
                                    </Link>
                                    </li>
                                    <li className="tm-nav-item"><Link className="tm-nav-link" to="/view-all-recipes">
                                        <GiBowlOfRice style={{ marginRight: '37px' }} />
                                        View All Recipes
                                    </Link>
                                    </li>

                                    <li className="tm-nav-item"><a className="tm-nav-link">
                                        <i className="far fa-comments" />
                                        Contact Us
                                    </a></li>

                                    <li className="tm-nav-item">
                                        {
                                            authToken ?
                                                <Link className="tm-nav-link" to="/login">  <RiLoginCircleFill
                                                    style={{ marginRight: '37px' }}
                                                    onClick={handleLogout}
                                                />
                                                    Logout
                                                </Link>
                                                :
                                                <Link className="tm-nav-link" to="/login">  <RiLoginCircleFill
                                                    style={{ marginRight: '37px' }} />
                                                    Login
                                                </Link>
                                        }

                                    </li>

                                </ul>
                                : <ul>
                                    <li className="tm-nav-item active"><Link className="tm-nav-link" to="/">
                                        <i className="fas fa-home" />
                                        Home
                                    </Link>
                                    </li>
                                    <li className="tm-nav-item"><Link className="tm-nav-link" to="/view-all-recipes">
                                        <GiBowlOfRice style={{ marginRight: '37px' }} />
                                        View All Recipes
                                    </Link>
                                    </li>
                                    <li className="tm-nav-item"><Link className="tm-nav-link" to="/manage-all-users">
                                        <i className="fas fa-users" />
                                        Manage Users
                                    </Link></li>
                                    <li className="tm-nav-item"><a className="tm-nav-link">
                                        <i className="far fa-comments" />
                                        Contact Us
                                    </a></li>

                                    <li className="tm-nav-item">
                                        {
                                            authToken ?
                                                <Link className="tm-nav-link" to="/login">  <RiLoginCircleFill
                                                    style={{ marginRight: '37px' }}
                                                    onClick={handleLogout}
                                                />
                                                    Logout
                                                </Link>
                                                :
                                                <Link className="tm-nav-link" to="/login">  <RiLoginCircleFill
                                                    style={{ marginRight: '37px' }} />
                                                    Login
                                                </Link>
                                        }

                                    </li>

                                </ul>
                        }

                    </nav>
                    <div className="tm-mb-65">
                        <a rel="nofollow" href="https://fb.com/templatemo" className="tm-social-link">
                            <i className="fab fa-facebook tm-social-icon" />
                        </a>
                        <a href="https://twitter.com" className="tm-social-link">
                            <i className="fab fa-twitter tm-social-icon" />
                        </a>
                        <a href="https://instagram.com" className="tm-social-link">
                            <i className="fab fa-instagram tm-social-icon" />
                        </a>
                        <a href="https://linkedin.com" className="tm-social-link">
                            <i className="fab fa-linkedin tm-social-icon" />
                        </a>
                    </div>
                    <p className="tm-mb-80 pr-5 text-white">
                        Step-by-step recipes, tips, and personalized meals — from beginner to pro. Save and share your favorites, all in one place.
                    </p>
                </div>
            </header >

        </>
    )
}

export default Sidebar