// @mui material components
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// Axios for making API requests
import axios from "axios";
import { useEffect, useState } from "react";

function Courses() {
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState({ id: "", name: "", email: "" });
  const [editing, setEditing] = useState(false);

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/users");
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Add or Update user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        // Update existing user
        await axios.put(`http://127.0.0.1:8000/api/users/${userData.id}`, userData);
      } else {
        // Add new user
        await axios.post("http://127.0.0.1:8000/api/users", userData);
      }
      // Reset form and state
      setUserData({ id: "", name: "", email: "" });
      setEditing(false);
      fetchUsers(); // Refresh user list
    } catch (error) {
      console.error("Error submitting user data:", error);
    }
  };

  // Handle Edit user
  const handleEdit = (user) => {
    setUserData(user);
    setEditing(true);
  };

  // Handle Delete user
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/users/${id}`);
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
                {/* Email input */}
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">user name</label>
                  <TextField
                    type="name"
                    name="name"
                    value={userData.name}
                    onChange={handleChange}
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="name@example.com"
                    fullWidth
                    margin="normal"
                    required
                  />
                </div>
                {/* Email input */}
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Email address</label>
                  <TextField
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="name@example.com"
                    fullWidth
                    margin="normal"
                    required
                  />
                </div>

                {/* Single Select */}



                {/* Submit Button */}
                <Button type="submit" variant="contained" color="primary">
                  {editing ? "Update" : "Add"}
                </Button>
              </form>

            </SoftBox>
          </Card>
        </SoftBox>
        <Card>
          <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <SoftTypography variant="h6">Users Table</SoftTypography>
          </SoftBox>
          <SoftBox>
            <Table
              columns={[
                { name: "id", align: "left" },
                { name: "name", align: "left" },
                { name: "email", align: "left" },
                { name: "actions", align: "left" },
              ]}
              rows={users.map((user) => ({
                id: user.id,
                name: user.name,
                email: user.email,
                actions: (
                  <div>
                    <Button onClick={() => handleEdit(user)} color="primary">Edit</Button>
                    <Button onClick={() => handleDelete(user.id)} color="secondary">Delete</Button>
                  </div>
                ),
              }))}
            />
          </SoftBox>
        </Card>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Courses;
