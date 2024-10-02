// @mui material components
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

// Soft UI Dashboard React components
import SoftTypography from "components/SoftTypography";
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Axios for making API requests
import axios from "axios";
import { useEffect, useState } from "react";

function Supervisors() {
  const [supervisor, setSupervisor] = useState([]);

  const [supervisorData, setSupervisorData] = useState({ 
    id: "", Fname: "", Lname: "", user_age: "", user_email: "", 
    user_number: "", user_gender: "", user_img: "", role: "", user_password: "" 
  });
  
  const [editing, setEditing] = useState(false);

  // Fetch users from API
  const fetchSupervisors = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/supervisors");
      console.log(response.data); // Check the structure of the response
      setSupervisor(response.data.users || []); // Default to empty array if undefined
    } catch (error) {
      console.error("Error fetching supervisors:", error);
    }
  };

  useEffect(() => {
    fetchSupervisors();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupervisorData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setSupervisorData({ ...supervisorData, user_img: e.target.files[0] });
  };

  // Handle Add or Update user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        // Update existing user
        await axios.put(`http://127.0.0.1:8000/api/supervisors/${supervisorData.id}`, supervisorData);
      } else {
        // Add new user
        await axios.post("http://127.0.0.1:8000/api/supervisors", supervisorData);
      }
      // Reset form and state
      setSupervisorData({ id: "", Fname: "", Lname: "", user_age: "", user_email: "", user_number: "", user_gender: "", user_img: "", role: "", user_password: "" });
      setEditing(false);
      fetchSupervisors(); // Refresh user list
    } catch (error) {
      console.error("Error submitting supervisors data:", error);
    }
  };

  // Handle Edit user
  const handleEdit = (supervisor) => {
    setSupervisorData(supervisor);
    setEditing(true);
  };

  // Handle Delete user
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/supervisors/${id}`);
      fetchSupervisors();
    } catch (error) {
      console.error("Error deleting supervisor:", error);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox p={6}>
              <SoftTypography variant="h4">{editing ? "Edit Supervisor" : "Add Supervisor"}</SoftTypography>
              <form onSubmit={handleSubmit}>
                {/* Fname input */}
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">First Name</label>
                  <TextField
                    type="text"
                    name="Fname"
                    value={supervisorData.Fname}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                  />
                </div>

                {/* Lname input */}
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Last Name</label>
                  <TextField
                    type="text"
                    name="Lname"
                    value={supervisorData.Lname}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                  />
                </div>

                {/* user_age input */}
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Age</label>
                  <TextField
                    type="number"
                    name="user_age"
                    value={supervisorData.user_age}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                  />
                </div>

                {/* user_email input */}
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Email</label>
                  <TextField
                    type="email"
                    name="user_email"
                    value={supervisorData.user_email}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                  />
                </div>

                {/* user_number input */}
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Number</label>
                  <TextField
                    type="text"
                    name="user_number"
                    value={supervisorData.user_number}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                  />
                </div>

                 {/* Gender Selector */}
               
              
                    <InputLabel>Gender</InputLabel>
                    <select
                      className="form-select mb-4"
                      name="user_gender"
                      value={supervisorData.user_gender}
                      onChange={handleChange}
                      required
                    >
                        
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    
                    </select>
                  
               

           

                {/* user_img input */}
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Image</label>
                  <TextField
                    type="file"
                    name="user_img"
                    onChange={handleFileChange}
                    fullWidth
                    margin="normal"
                  />
                </div>

                 {/* role Selector */}
               
              
                 <InputLabel>Role</InputLabel>
                    <select
                      className="form-select mb-4"
                      name="role"
                      value={supervisorData.user_gender}
                      onChange={handleChange}
                      required
                    >
                        
                      <option value="student">Student</option>
                      <option value="manager">Manager</option>
                      <option value="chef">Chef</option>
                      <option value="supervisor">supervisor</option>
                      {/* <option value="Other">Other</option> */}
                    </select>

             

                {/* user_password input */}
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Password</label>
                  <TextField
                    type="password"
                    name="user_password"
                    value={supervisorData.user_password}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                  />
                </div>

                {/* Submit Button */}
                <Button type="submit" variant="contained" color="primary">
                  {editing ? "Update" : "Add"}
                </Button>
              </form>
            </SoftBox>
          </Card>
        </SoftBox>

        {/* Supervisors Table */}
        <Card>
          <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <SoftTypography variant="h6">Supervisors Table</SoftTypography>
          </SoftBox>
          <SoftBox>
            <TableContainer component={Paper}>
              <Table aria-label="supervisors table">
               
                <TableBody>
  {supervisor.length > 0 ? supervisor.map((supervisor) => (
    <TableRow key={supervisor.id}>
      <TableCell>{supervisor.id}</TableCell>
      <TableCell>{supervisor.Fname}</TableCell>
      <TableCell>{supervisor.Lname}</TableCell>
      <TableCell>{supervisor.user_age}</TableCell>
      <TableCell>{supervisor.user_email}</TableCell>
      <TableCell>{supervisor.user_number}</TableCell>
      <TableCell>{supervisor.user_gender}</TableCell>
      <TableCell>{supervisor.role}</TableCell>
      <TableCell>
        <Button onClick={() => handleEdit(supervisor)} color="primary">Edit</Button>
        <Button onClick={() => handleDelete(supervisor.id)} color="secondary">Delete</Button>
      </TableCell>
    </TableRow>
  )) : (
    <TableRow>
      <TableCell colSpan={9}>No data available</TableCell>
    </TableRow>
  )}
</TableBody>

              </Table>
            </TableContainer>
          </SoftBox>
        </Card>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Supervisors;
