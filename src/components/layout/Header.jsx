import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaEdit, FaTrash } from 'react-icons/fa';
import { TbChefHat } from "react-icons/tb";
import { jwtDecode } from 'jwt-decode';
import { useSelector } from 'react-redux';


const Header = () => {
     const token = useSelector(state => state.auth.token);
    let user = { name: '', role: '' };

    if (token) {
        try {
            const decoded = jwtDecode(token);
            // console.log("Decoded Token:", decoded);

            user = {
                name: decoded.name || 'User',
                role: decoded.role || 'User',
            };
        } catch (err) {
            console.error("Invalid token:", err);
        }
    }

    return (
        <>
            <div className="d-flex justify-content-between align-items-center p-1 border-bottom">
                <div style={{ width: '200px' }}></div>


                <div className="dropdown d-flex">
                    <button
                        className="btn btn-outline-secondary align-items-center justify-content-center rounded-circle"
                        type="button"
                        style={{ width: '40px', height: '40px', marginRight: "5px" }} // ensures it's a circle
                        aria-expanded="false"
                    >
                        <FaUser />
                    </button>
                    <div className="ms-2 d-flex flex-column">
                        <span className="fw-bold"
                            style={{
                                marginRight: "5px",
                                fontSize:'18px'
                            }}
                        >{user.name}</span>
                        <span className="badge" style={{color:'black',fontSize:'18px'}} >{user.role}</span>
                    </div>


                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                        <li>
                            <Link className="dropdown-item" to="/edit-profile">
                                <FaEdit className="me-2" />
                                Edit Profile
                            </Link>
                        </li>
                        <li>
                            <button className="dropdown-item text-danger">
                                <FaTrash className="me-2" />
                                Delete Profile
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Header;
