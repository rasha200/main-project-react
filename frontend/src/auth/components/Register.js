import { useState } from "react";
import axios from "axios";

export default function Register() {
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        age: '',
        user_email: '',
        number: '',
        gender: '',
        parentName: '',
        parentNumber: '',
        password: '',
        password_confirmation: ''
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register', {
                Fname: formData.fname, // Make sure these match the expected names
                Lname: formData.lname,
                user_age: formData.age,
                user_email: formData.user_email,
                user_password: formData.password,
                password_confirmation: formData.password_confirmation,
                user_number: formData.number,
                user_gender: formData.gender,
                parent_name: formData.parentName,
                parent_number: formData.parentNumber,
                student_status: 'Pending',
                id_img: "image_url_or_base64" // Ensure this is handled correctly
            });

            // Display success message and reset form
            setSuccessMessage('User and student registered successfully!');
            setErrors({});
            resetForm();
        } catch (error) {
            console.log(error.response.data); // Log the full response for debugging
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                setErrors({ general: 'An error occurred. Please try again later.' });
            }
        }
    };

    const resetForm = () => {
        setFormData({
            fname: '',
            lname: '',
            age: '',
            user_email: '',
            number: '',
            gender: 'male',
            parentName: '',
            parentNumber: '',
            password: '',
            password_confirmation: ''
        });
    };

    return (
        <section className="w3l-register py-5" id="register">
            <div className="container pb-lg-12 pb-md-10 pb-2">
                <h5 className="sub-title text-center">Join Us</h5>
                <h3 className="title-style text-center">Create Your Account</h3>
                <div className="row justify-content-center">
                    <div className="col-lg-10 col-md-12 mt-5">
                        <div className="card">
                            <div className="card-body register-details">
                                {successMessage && <p className="text-success">{successMessage}</p>}
                                {errors.general && <p className="text-danger">{errors.general}</p>}
                                <form onSubmit={handleSubmit}>
                                    {/* Form fields */}
                                    <div className="form-group">
                                        <label htmlFor="fname">First Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="fname"
                                            placeholder="Enter your first name"
                                            value={formData.fname}
                                            onChange={handleChange}
                                        />
                                        {errors.Fname && <small className="text-danger">{errors.Fname[0]}</small>}
                                    </div>
                                    <div className="form-group mt-4">
                                        <label htmlFor="lname">Last Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="lname"
                                            placeholder="Enter your last name"
                                            value={formData.lname}
                                            onChange={handleChange}
                                        />
                                        {errors.Lname && <small className="text-danger">{errors.Lname[0]}</small>}
                                    </div>
                                    <div className="form-group mt-4">
                                        <label htmlFor="age">Age</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="age"
                                            placeholder="Enter your age"
                                            value={formData.age}
                                            onChange={handleChange}
                                        />
                                        {errors.user_age && <small className="text-danger">{errors.user_age[0]}</small>}
                                    </div>
                                    <div className="form-group mt-4">
                                        <label htmlFor="user_email">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="user_email"
                                            placeholder="Enter your email"
                                            value={formData.user_email}
                                            onChange={handleChange}
                                        />
                                        {errors.user_email && <small className="text-danger">{errors.user_email[0]}</small>}
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
                                        {errors.user_password && <small className="text-danger">{errors.user_password[0]}</small>}
                                    </div>
                                    <div className="form-group mt-4">
                                        <label htmlFor="password_confirmation">Confirm Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password_confirmation"
                                            placeholder="Confirm your password"
                                            value={formData.password_confirmation}
                                            onChange={handleChange}
                                        />
                                        {errors.password_confirmation && <small className="text-danger">{errors.password_confirmation[0]}</small>}
                                    </div>
                                    <div className="form-group mt-4">
                                        <label htmlFor="number">Phone Number</label>
                                        <input
                                            type="tel"
                                            className="form-control"
                                            id="number"
                                            placeholder="Enter your phone number"
                                            value={formData.number}
                                            onChange={handleChange}
                                        />
                                        {errors.user_number && <small className="text-danger">{errors.user_number[0]}</small>}
                                    </div>
                                    <div className="form-group mt-4">
                                        <label htmlFor="gender">Gender</label>
                                        <select
                                            className="form-control"
                                            id="gender"
                                            value={formData.gender}
                                            onChange={handleChange}
                                        >
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div className="form-group mt-4">
                                        <label htmlFor="parentName">Parent's Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="parentName"
                                            placeholder="Enter parent's name"
                                            value={formData.parentName}
                                            onChange={handleChange}
                                        />
                                        {errors.parent_name && <small className="text-danger">{errors.parent_name[0]}</small>}
                                    </div>
                                    <div className="form-group mt-4">
                                        <label htmlFor="parentNumber">Parent's Phone Number</label>
                                        <input
                                            type="tel"
                                            className="form-control"
                                            id="parentNumber"
                                            placeholder="Enter parent's phone number"
                                            value={formData.parentNumber}
                                            onChange={handleChange}
                                        />
                                        {errors.parent_number && <small className="text-danger">{errors.parent_number[0]}</small>}
                                    </div>
                                    <div className="text-center mt-4">
                                        <button type="submit" className="btn btn-style">Register</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-5 mx-auto text-center pt-lg-4">
                    <p>Already have an account? <a href="login.html" className="btn-link">Login here</a></p>
                </div>
            </div>
        </section>
    );
}
