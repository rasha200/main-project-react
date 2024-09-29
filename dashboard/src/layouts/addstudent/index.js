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
  const [editing, setEditing] = useState(false);

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
    setUserData((prev) => ({ ...prev, [name]: value }));
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

  const handleSubmit = async (e) => {
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
      if (editing) {
        await axios.put(`http://127.0.0.1:8000/api/CreateUser/${userData.id}`, payload);
      } else {
        await axios.post("http://127.0.0.1:8000/api/CreateUser", payload);
      }
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
      setEditing(false);
      fetchUsers();
    } catch (error) {
      console.error("Error submitting user data:", error.response.data);
    }
  };

  const handleEdit = (user) => {
    setUserData({ 
      ...user, 
      user_gender: { 
        male: user.user_gender.includes("Male"), 
        female: user.user_gender.includes("Female") 
      } 
    });
    setEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/CreateUser/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox p={6}>
              <SoftTypography variant="h4">{editing ? "Edit User" : "Add User"}</SoftTypography>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="Fname">First Name</label>
                  <TextField name="Fname" value={userData.Fname} onChange={handleChange} fullWidth margin="normal" required />
                </div>
                <div className="form-group">
                  <label htmlFor="Lname">Last Name</label>
                  <TextField name="Lname" value={userData.Lname} onChange={handleChange} fullWidth margin="normal" required />
                </div>
                <div className="form-group">
                  <label htmlFor="user_age">Age</label>
                  <TextField name="user_age" value={userData.user_age} onChange={handleChange} fullWidth margin="normal" required type="number" />
                </div>
                <div className="form-group">
                  <label htmlFor="user_email">Email</label>
                  <TextField name="user_email" value={userData.user_email} onChange={handleChange} fullWidth margin="normal" required type="email" />
                </div>
                <div className="form-group">
                  <label htmlFor="user_number">Phone Number</label>
                  <TextField name="user_number" value={userData.user_number} onChange={handleChange} fullWidth margin="normal" required />
                </div>
                <div className="form-group">
                  <label>Gender</label>
                  <div>
                    <FormControlLabel control={<Checkbox checked={userData.user_gender.male} onChange={handleGenderChange} name="male" />} label="Male" />
                    <FormControlLabel control={<Checkbox checked={userData.user_gender.female} onChange={handleGenderChange} name="female" />} label="Female" />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="user_password">Password</label>
                  <TextField name="user_password" value={userData.user_password} onChange={handleChange} type="password" fullWidth margin="normal" required />
                </div>
                <Button type="submit" variant="contained" color="primary">{editing ? "Update" : "Add"}</Button>
              </form>
            </SoftBox>
          </Card>
        </SoftBox>
        <Card>
          <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <SoftTypography variant="h6">Users Table (Students Only)</SoftTypography>
          </SoftBox>
          <SoftBox>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">ID</TableCell>
                  <TableCell align="left">First Name</TableCell>
                  <TableCell align="left">Last Name</TableCell>
                  <TableCell align="left">Age</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Phone Number</TableCell>
                  <TableCell align="left">Gender</TableCell>
                  <TableCell align="left">Actions</TableCell>
                </TableRow>
              </TableHead>
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
                    <TableCell align="left">
                      <Button onClick={() => handleEdit(user)} color="primary">Edit</Button>
                      <Button onClick={() => handleDelete(user.id)} color="secondary">Delete</Button>
                    </TableCell>
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
