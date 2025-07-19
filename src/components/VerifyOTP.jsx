import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import { verifyOTP } from "../ApiRequests/userApiRequests";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setToken } from "../Redux/slices/authSlices";

const VerifyOTP = () => {

    const dispatch = useDispatch();

    const location = useLocation();
    const email = location.state?.email || "abc@gmail.com"; // fallback if not provided

    const navigate = useNavigate();

    const submitOTP = useFormik({
        initialValues: {
            otp: ''
        },
        validationSchema: Yup.object({
            otp: Yup.string().min(6).max(6).required("Otp is required")
        }),

        onSubmit: async (values) => {
            const payload = {
                otp: values.otp,
                email: email
            };

            await verifyOTP(payload).then((response) => {
                const token = response.data.token;
                dispatch(setToken(token)); 
                localStorage.setItem("token", token); 

                if (!response.data.user || response.data.user.name === "" || response.data.user.email === "" || response.data.user.address === "") {
                    toast.success("OTP verified successfully");
                    setTimeout(() => {
                        navigate('/complete-profile');
                    }, 2000);
                } else {
                    toast.success("OTP verified successfully");
                    setTimeout(() => {
                        navigate('/');
                    }, 2000);
                }
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
                <div
                    className="card p-4 shadow"
                    style={{ maxWidth: "400px", width: "80%", borderRadius: "4px" }}
                >
                    <h3 className="text-center">Verify OTP</h3>

                    <form onSubmit={submitOTP.handleSubmit}>
                        <div className="text-center">
                            <strong className="text-muted">{email}</strong>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="otp" className="form-label">
                                Enter OTP
                            </label>
                            <input
                                type="text"
                                id="otp"
                                className="form-control rounded"
                                placeholder="Enter OTP..."
                                name="otp"
                                {...submitOTP.getFieldProps("otp")}
                            />
                        </div>

                        <div className="text-center">
                            <button
                                type="submit"
                                className="tm-button"
                                style={{
                                    backgroundColor: "#09b6b6",
                                    color: "#fff",
                                    padding: "10px 24px",
                                    borderRadius: "8px",
                                    fontWeight: "bold",
                                    border: "none",
                                }}
                            >
                                Verify OTP
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default VerifyOTP;
