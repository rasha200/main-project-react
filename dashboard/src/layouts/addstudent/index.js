import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

function Users() {
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState({
    Fname: "",
    Lname: "",
    user_age: "",
    user_email: "",
    user_number: "",
    user_gender: { male: false, female: false },
    user_password: "",
  });
  const [studentData, setStudentData] = useState({
    parent_name: "",
    parent_number: "",
    student_status: "Pending",
  });
  const [userId, setUserId] = useState(null); // Store created user ID
  const [step, setStep] = useState(1); // Control form step

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/CreateUser");
      const filteredUsers = response.data.filter(user => user.role === 'student');
      setUsers(filteredUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (step === 1) {
      setUserData((prev) => ({ ...prev, [name]: value }));
    } else {
      setStudentData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleGenderChange = (e) => {
    const { name, checked } = e.target;
    setUserData((prev) => ({
      ...prev,
      user_gender: {
        ...prev.user_gender,
        [name]: checked,
      },
    }));
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    const selectedGenders = Object.entries(userData.user_gender)
      .filter(([, value]) => value)
      .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1))
      .join(", ");

    const payload = {
      ...userData,
      user_gender: selectedGenders,
    };

    try {
      const userResponse = await axios.post("http://127.0.0.1:8000/api/CreateUser", payload);
      setUserId(userResponse.data.id); // Save user ID
      setStep(2); // Move to step 2
    } catch (error) {
      console.error("Error creating user:", error.response.data);
    }
  };

  const handleStudentSubmit = async (e) => {
    e.preventDefault();
    const studentPayload = {
      ...studentData,
      user_id: userId, // Use the saved user ID
    };

    try {
      await axios.post("http://127.0.0.1:8000/api/CreateStudent", studentPayload);
      // Reset form
      setUserData({
        Fname: "",
        Lname: "",
        user_age: "",
        user_email: "",
        user_number: "",
        user_gender: { male: false, female: false },
        user_password: "",
      });
      setStudentData({
        parent_name: "",
        parent_number: "",
        student_status: "Pending",
      });
      setUserId(null); // Reset user ID
      setStep(1); // Go back to step 1
      fetchUsers(); // Refresh users
    } catch (error) {
      console.error("Error creating student:", error.response.data);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox p={6}>
              {step === 1 ? (
                <>
                  <SoftTypography variant="h4">Add User</SoftTypography>
                  <form onSubmit={handleUserSubmit}>
                    <TextField name="Fname" label="First Name" value={userData.Fname} onChange={handleChange} fullWidth margin="normal" required />
                    <TextField name="Lname" label="Last Name" value={userData.Lname} onChange={handleChange} fullWidth margin="normal" required />
                    <TextField name="user_age" label="Age" value={userData.user_age} onChange={handleChange} fullWidth margin="normal" required type="number" />
                    <TextField name="user_email" label="Email" value={userData.user_email} onChange={handleChange} fullWidth margin="normal" required type="email" />
                    <TextField name="user_number" label="Phone Number" value={userData.user_number} onChange={handleChange} fullWidth margin="normal" required />
                    <FormControlLabel control={<Checkbox checked={userData.user_gender.male} onChange={handleGenderChange} name="male" />} label="Male" />
                    <FormControlLabel control={<Checkbox checked={userData.user_gender.female} onChange={handleGenderChange} name="female" />} label="Female" />
                    <TextField name="user_password" label="Password" value={userData.user_password} onChange={handleChange} fullWidth margin="normal" required type="password" />
                    <Button type="submit" variant="contained" color="primary">Next</Button>
                  </form>
                </>
              ) : (
                <>
                  <SoftTypography variant="h4">Add Student</SoftTypography>
                  <form onSubmit={handleStudentSubmit}>
                    <TextField name="parent_name" label="Parent Name" value={studentData.parent_name} onChange={handleChange} fullWidth margin="normal" required />
                    <TextField name="parent_number" label="Parent Phone Number" value={studentData.parent_number} onChange={handleChange} fullWidth margin="normal" required />
                    <TextField name="student_status" label="Status" value={studentData.student_status} onChange={handleChange} fullWidth margin="normal" required />
                    <Button type="submit" variant="contained" color="primary">Create Student</Button>
                  </form>
                </>
              )}
            </SoftBox>
          </Card>
        </SoftBox>
        <Card>
          <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <SoftTypography variant="h6">Users Table (Students Only)</SoftTypography>
          </SoftBox>
          <SoftBox>
            <Table>
              <TableBody>
                {Array.isArray(users) && users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell align="left">{user.id}</TableCell>
                    <TableCell align="left">{user.Fname}</TableCell>
                    <TableCell align="left">{user.Lname}</TableCell>
                    <TableCell align="left">{user.user_age}</TableCell>
                    <TableCell align="left">{user.user_email}</TableCell>
                    <TableCell align="left">{user.user_number}</TableCell>
                    <TableCell align="left">{user.user_gender}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </SoftBox>
        </Card>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Users;
