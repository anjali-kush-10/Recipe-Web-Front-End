import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { completeProfileUser } from "../ApiRequests/userApiRequests";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


const CompleteProfile = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    };

    const completeUserProfile = useFormik({
        initialValues: {
            name: '',
            phone: '',
            address: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Name is required"),
            phone: Yup.string().min(10).max(10).required('Phone number is required'),
            address: Yup.string().required('Address is required')
        }),

        onSubmit: async (values) => {

            const payload = {
                name: values.name,
                phone: values.phone,
                address: values.address
            }

            await completeProfileUser(payload, config).then((response) => {
                // console.log(response);
                if (response.data.status) {
                    toast.success("Profile Details Saved!");
                    setTimeout(() => {
                        navigate('/')
                    }, 2000);
                }
                else {
                    toast.error("Unable to save profile details!");
                }
            }).catch((error) => {
                console.log(error);
                toast.error("Something went wrong, try again!");
            });
        }
    });

    return (
        <>
            <div
                className="d-flex align-items-center justify-content-center min-vh-100 w-100"
                style={{
                    background: "linear-gradient(135deg, #e0f7f7, #09b6b6, #ffffff)",
                    padding: "20px",
                }}
            >
                <div className="card p-4 shadow" style={{ maxWidth: "500px", width: "100%", borderRadius: "4px" }}>
                    <h3 className="text-center mb-4">Complete Profile</h3>
                    <form onSubmit={completeUserProfile.handleSubmit}>
                        {/* Name */}
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                className="form-control rounded"
                                placeholder="Enter your full name"

                                {...completeUserProfile.getFieldProps("name")}
                            />
                            {completeUserProfile.touched.name && completeUserProfile.errors.name && (
                                <div className="text-danger mt-1">{completeUserProfile.errors.name}</div>
                            )}
                        </div>

                        {/* Phone */}
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Phone Number</label>
                            <input
                                type="text"
                                id="phone"
                                className="form-control rounded"
                                placeholder="Enter your phone number"
                                {...completeUserProfile.getFieldProps("phone")}
                            />
                            {completeUserProfile.touched.phone && completeUserProfile.errors.phone && (
                                <div className="text-danger mt-1">{completeUserProfile.errors.phone}</div>
                            )}
                        </div>


                        {/* Address */}
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">Address</label>
                            <textarea
                                id="address"
                                className="form-control rounded"
                                placeholder="Enter your address"
                                rows="2"
                                {...completeUserProfile.getFieldProps("address")}
                            />
                            {completeUserProfile.touched.address && completeUserProfile.errors.address && (
                                <div className="text-danger mt-1">{completeUserProfile.errors.address}</div>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="text-center mt-4">
                            <button
                                type="submit"
                                className="btn"
                                style={{
                                    backgroundColor: "#09b6b6",
                                    color: "#fff",
                                    padding: "10px 20px",
                                    borderRadius: "8px",
                                    fontWeight: "bold",
                                    border: "none",
                                }}
                            >
                                Save
                            </button>

                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CompleteProfile;
