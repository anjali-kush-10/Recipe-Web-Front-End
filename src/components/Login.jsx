import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import { loginApi } from "../ApiRequests/userApiRequests";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const Login = () => {


    const navigate = useNavigate();


    const handleLogin = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Email is required')
        }),
        onSubmit: async (values) => {

            const payload = {
                email: values.email
            }

            await loginApi(payload).then((response) => {
                // console.log(response.data.status);
                if (response.data.status) {
                    toast.success("OTP sent successfully");
                    setTimeout(() => {
                        navigate('/verify-otp', { state: { email: values.email } });
                    }, 2000);
                } else {
                    toast.error("Login failed ❌");
                }
            }).catch((error) => {
                console.log(error);
                toast.error("Something went wrong, try again!");
            });
        }
    })




    return (
        <>
            <div className="d-flex align-items-center justify-content-center min-vh-100 w-100" style={{ background: "linear-gradient(135deg, #e0f7f7, #09b6b6, #ffffff)", }}>
                <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
                    <h3 className="text-center mb-3">Login</h3>
                    <form onSubmit={handleLogin.handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input
                                type="text"
                                id="email"
                                className="form-control rounded"
                                placeholder="Enter Your Email..."
                                name="email"
                                {...handleLogin.getFieldProps("email")}
                            />
                        </div>
                        {handleLogin.touched.email && handleLogin.errors.email
                            ? <div className="invalid-feedback" style={{ display: "block" }}>{handleLogin.errors.email}</div>
                            : ''
                        }

                        <div className="text-center">
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
                                {/* {handleLogin.isSubmitting ? "Sending..." : "Send OTP"} */}
                                Send OTP
                            </button>

                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                // disabled={formik.isSubmitting || isResending}
                                // onClick={handleResendOTP}
                                style={{
                                    marginLeft: "10px",
                                    padding: "10px 20px",
                                    borderRadius: "8px",
                                    fontWeight: "bold",
                                }}
                            >
                                Resend OTP
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );

}
export default Login;
