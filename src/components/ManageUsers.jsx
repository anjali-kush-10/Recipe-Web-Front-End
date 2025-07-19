import React, { useEffect, useState } from 'react'
import Container from './layout/Container'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAllUsers } from '../ApiRequests/userApiRequests';
import useUsers from '../hooks/useUsers';

const ManageUsers = () => {

    const { users, loading, error, setSearch } = useUsers();

    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>Error:{error}</p>
    }

    return (
        <>
            <Container>
                <div className="container-fluid">
                    <main className="tm-main">
                        <div className="bg-light p-2 text-center shadow rounded mb-5" >
                            <h4>
                                Manage Users <i className="fas fa-users" />
                            </h4>
                        </div>

                        <div className="d-flex justify-content-between align-items-center mb-3">
                            {/* Search Input with Icon inside */}
                            <div className="position-relative w-50">
                                <input
                                    type="text"
                                    className="form-control ps-5 rounded-pill"
                                    placeholder="Search users..."
                                    onChange={(e) => setSearch(e.target.value)}
                                    style={{ height: "36px" }}
                                />

                            </div>
                        </div>


                        <table className="table table-bordered table-striped table-hover shadow">
                            <thead className="table-dark">
                                <tr>

                                    {/* <th>Image</th> */}
                                    <th>Full Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {recipes.map((recipe, index) => ( */}
                                {users.map((user, index) => (
                                    <tr key={index}>
                                        <td>{user.name}</td>
                                        <td>
                                            {user.email}
                                        </td>
                                        <td>{user.phone}</td>

                                        {/* <td>
                                            <button className="btn btn-sm ms-2">
                                                👁️
                                            </button>
                                            <button className="btn btn-sm ms-2">
                                                ❌
                                            </button>
                                            <button className="btn btn-sm text-white">
                                                📝
                                            </button>
                                        </td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </main>
                </div>
            </Container>
        </>
    )
}

export default ManageUsers;