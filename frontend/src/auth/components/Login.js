import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Update import here
import axios from "axios";

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Update variable here

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', {
                user_email: formData.email,
                user_password: formData.password
            });
            console.log(response);

            // If login is successful, redirect to the LandingPage
            if (response.status === 200) {
                navigate('/landing'); // Adjust this to the correct route for your LandingPage
            }else {

            }
        } catch (error) {
            setError('Invalid email or password.'); // Set the error message

        }
    };

    return (
        <section className="w3l-login py-5" id="login">
            <div className="container pb-lg-12 pb-md-10 pb-2">
                <h5 className="sub-title text-center">Welcome Back</h5>
                <h3 className="title-style text-center">Login to Your Account</h3>
                <div className="row justify-content-center">
                    <div className="col-lg-10 col-md-12 mt-5">
                        <div className="card">
                            <div className="card-body login-details">
                                {error && <p className="text-danger">{error}</p>}
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            placeholder="Enter your email"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-group mt-4">
                                        <label htmlFor="password">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            placeholder="Enter your password"
                                            value={formData.password}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-group mt-4 d-flex justify-content-between align-items-center">
                                        <div className="custom-control custom-checkbox">
                                            <input
                                                type="checkbox"
                                                className="custom-control-input"
                                                id="rememberMe"
                                            />
                                            <label
                                                className="custom-control-label"
                                                htmlFor="rememberMe"
                                            >
                                                Remember Me
                                            </label>
                                        </div>
                                        <a href="#forgot" className="forgot-password">Forgot Password?</a>
                                    </div>
                                    <div className="text-center mt-4">
                                        <button type="submit" className="btn btn-style">Login</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-5 mx-auto text-center pt-lg-4">
                    <p>Don't have an account? <a href="register.html" className="btn-link">Sign up here</a></p>
                </div>
            </div>
        </section>
    );
}
