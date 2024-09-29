import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Dropzone from "react-dropzone";
import { FaEdit } from "react-icons/fa";

const validationSchema = Yup.object({
  username: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  bio: Yup.string(),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
});

const UserProfile = () => {
  const [profileImage, setProfileImage] = useState(null);

  // Function to handle image drop
  const handleImageDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setProfileImage(URL.createObjectURL(file));
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-body text-center">
          {/* Profile Picture and Name */}
          <div className="mb-4 position-relative d-inline-block">
            <Dropzone
              accept="image/*"
              onDrop={(acceptedFiles) => handleImageDrop(acceptedFiles)}
            >
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()} className="profile-pic-container">
                  <input {...getInputProps()} />
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="rounded-circle img-thumbnail"
                      style={{ width: "150px", height: "150px", objectFit: "cover" }}
                    />
                  ) : (
                    <div
                      className="profile-placeholder rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center"
                      style={{ width: "150px", height: "150px" }}
                    >
                      <span>No Image</span>
                    </div>
                  )}
                  {/* Edit Icon Overlay */}
                  <div
                    className="edit-icon"
                    style={{
                      position: "absolute",
                      bottom: "0",
                      right: "0",
                      background: "#007bff",
                      borderRadius: "50%",
                      padding: "5px",
                      cursor: "pointer",
                    }}
                  >
                    <FaEdit className="text-white" />
                  </div>
                </div>
              )}
            </Dropzone>
          </div>

          {/* Username Display */}
          <h4 className="mb-3">name </h4>

          {/* Formik Form */}
          <Formik
            initialValues={{ username: "", email: "", bio: "", password: "", confirmPassword: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log("Form values:", values);
              alert("Profile saved successfully!");
            }}
          >
            {() => (
              <Form>
                {/* Username */}
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    First Name
                  </label>
                  <Field
                    name="username"
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Enter your First Name"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-danger mt-1"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Last Name
                  </label>
                  <Field
                    name="username"
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Enter your Last Name"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-danger mt-1"
                  />
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <Field
                    name="email"
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger mt-1"
                  />
                </div>
                {/* Password */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <Field
                    name="password"
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter a new password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-danger mt-1"
                  />
                </div>

                {/* Confirm Password */}
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <Field
                    name="confirmPassword"
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    placeholder="Confirm your password"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-danger mt-1"
                  />
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary">
                  Save Profile
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
