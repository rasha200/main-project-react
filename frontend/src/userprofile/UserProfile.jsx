// src/UserProfile.js
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaUser, FaEnvelope, FaLock, FaUpload } from 'react-icons/fa';
import axios from 'axios';

const UserProfile = () => {
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        image: ''
    });

    // Fetch user data
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/users/1');
                const data = response.data;
                setUserData({
                    firstName: data.Fname,
                    lastName: data.Lname,
                    email: data.user_email,
                    password: '', // Do not display password
                    image: data.user_img
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const validationSchema = Yup.object({
        firstName: Yup.string(),
        lastName: Yup.string(),
        email: Yup.string().email('Invalid email format'),
        password: Yup.string().nullable(),
        image: Yup.string().nullable() // Allow image to be null
    });

    const handleSubmit = async (values) => {
        try {
            // Only send fields that are filled out
            const updatedData = {
                Fname: values.firstName || userData.firstName,
                Lname: values.lastName || userData.lastName,
                user_email: values.email || userData.email,
                user_password: values.password || userData.password, 
                user_img: values.image || userData.image 
            };

            await axios.put('http://127.0.0.1:8000/api/users/1', updatedData);
            console.log('User data updated successfully');

            // Fetch the updated user data
            const response = await axios.get('http://127.0.0.1:8000/api/users/1');
            const data = response.data;
            setUserData({
                firstName: data.Fname,
                lastName: data.Lname,
                email: data.user_email,
                password: '', // Do not display password
                image: data.user_img
            });

        } catch (error) {
            console.error('Error updating user data:', error.response?.data || error);
        }
    };

    return (
        <div className="container mt-5">
            <h1>User Profile</h1>
            <div className="row">
                {/* Left Section: Display User Data */}
                <div className="col-md-6">
                    <div className="card mb-4">
                        <div className="card-body text-center">
                            <h2 className="card-title">Profile Details</h2>
                            <img
                                src={userData.image || 'default-image-url.jpg'}
                                alt="Profile"
                                className="img-thumbnail mb-3"
                                style={{ width: '150px', height: '150px' }}
                            />
                            <p><strong>First Name:</strong> {userData.firstName}</p>
                            <p><strong>Last Name:</strong> {userData.lastName}</p>
                            <p><strong>Email:</strong> {userData.email}</p>
                            <p><strong>Password:</strong> {'*'.repeat(userData.password.length || 0)}</p>
                        </div>
                    </div>
                </div>

                {/* Right Section: Edit User Data */}
                <div className="col-md-6">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h2 className="card-title">Edit Profile</h2>
                            <Formik
                                initialValues={userData}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ setFieldValue }) => (
                                    <Form>
                                        <div className="form-group">
                                            <label htmlFor="firstName"><FaUser /> First Name</label>
                                            <Field type="text" className="form-control" name="firstName" />
                                            <ErrorMessage name="firstName" component="div" className="text-danger" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="lastName"><FaUser /> Last Name</label>
                                            <Field type="text" className="form-control" name="lastName" />
                                            <ErrorMessage name="lastName" component="div" className="text-danger" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email"><FaEnvelope /> Email</label>
                                            <Field type="email" className="form-control" name="email" />
                                            <ErrorMessage name="email" component="div" className="text-danger" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password"><FaLock /> Password</label>
                                            <Field type="password" className="form-control" name="password" />
                                            <ErrorMessage name="password" component="div" className="text-danger" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="image"><FaUpload /> Upload Image</label>
                                            <input
                                                type="file"
                                                className="form-control-file"
                                                onChange={(event) => {
                                                    const file = event.currentTarget.files[0];
                                                    if (file) {
                                                        const reader = new FileReader();
                                                        reader.onloadend = () => {
                                                            setFieldValue('image', reader.result);
                                                        };
                                                        reader.readAsDataURL(file);
                                                    }
                                                }}
                                            />
                                            <ErrorMessage name="image" component="div" className="text-danger" />
                                        </div>
                                        <button type="submit" className="btn btn-primary mt-3">Save Changes</button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
