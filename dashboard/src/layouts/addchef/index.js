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

function Chefs() {
  const [chefs, setChefs] = useState([]);
  const [chefData, setChefData] = useState({
    Fname: "",
    Lname: "",
    user_age: "",
    user_email: "",
    user_number: "",
    
    user_gender: { male: false, female: false },
    user_password: "",
    chef_description: "",
    role: "",
  });
 
  const [editing, setEditing] = useState(false);

  const fetchChefs = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/chefs");
      console.log(response.data);
      setChefs(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchChefs();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChefData((prev) => ({ ...prev, [name]: value }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        // Update existing user
        await axios.put(`http://127.0.0.1:8000/api/chefs/${chefData.id}`, chefData);
      } else {
        // Add new user
        await axios.post("http://127.0.0.1:8000/api/chefs", chefData);
      }
      // Reset form and state
      setChefData({ id: "", Fname: "", Lname: "", user_age: "", user_email: "", user_number: "", user_gender: "", role: "", user_password: "", chef_description: ""});
      setEditing(false);
      fetchChefs(); // Refresh user list
    } catch (error) {
      console.error("Error submitting chefs data:", error);
    }
  };

  const handleGenderChange = (e) => {
    const { name } = e.target;
    setChefData((prev) => ({
      ...prev,
      user_gender: name,  // Send "male" or "female" as a string
    }));
  };
  

  const handleEdit = (chef) => {
    setChefData(chef);
    setEditing(true);
  };

  // Handle Delete user
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/chefs/${id}`);
      fetchChefs();
    } catch (error) {
      console.error("Error deleting chef:", error);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox p={6}>
             
                <>
                  <SoftTypography variant="h4">{editing ? "Edit Chef" : "Add Chef"}</SoftTypography>
                  <form onSubmit={handleSubmit}>
                  <label htmlFor="exampleFormControlInput1">First name</label>
                    <TextField name="Fname"  value={chefData.Fname} onChange={handleChange} fullWidth margin="normal" required />


                    <label htmlFor="exampleFormControlInput1">Last name</label>
                    <TextField name="Lname"  value={chefData.Lname} onChange={handleChange} fullWidth margin="normal" required />

                    <label htmlFor="exampleFormControlInput1">role</label>
                    <TextField name="role"  value={chefData.role} onChange={handleChange} fullWidth margin="normal" required />


                    <label htmlFor="exampleFormControlInput1">Age</label>
                    <TextField name="user_age"  value={chefData.user_age} onChange={handleChange} fullWidth margin="normal" required type="number" />

                    <label htmlFor="exampleFormControlInput1">Email</label>
                    <TextField name="user_email"  value={chefData.user_email} onChange={handleChange} fullWidth margin="normal" required type="email" />

                    <label htmlFor="exampleFormControlInput1">Number</label>
                    <TextField name="user_number" value={chefData.user_number} onChange={handleChange} fullWidth margin="normal" required />




                <label htmlFor="exampleFormControlInput1">Gender</label>
               
          
                {/* <FormControlLabel control={<Checkbox checked={chefData.user_gender.male} onChange={handleGenderChange} name="male" />} label="Male" />
                    <FormControlLabel control={<Checkbox checked={chefData.user_gender.female} onChange={handleGenderChange} name="female" />} label="Female" /> */}
                   <select
                      className="form-select mb-4"
                      name="user_gender"
                      value={chefData.user_gender}
                      onChange={handleChange}
                      required
                    >
                        
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    
                    </select>

                    <label htmlFor="exampleFormControlInput1">Password</label>
                   <TextField name="user_password"  value={chefData.user_password} onChange={handleChange} fullWidth margin="normal" required type="password" />

                   <label htmlFor="exampleFormControlInput1">Description</label>
                    <TextField name="chef_description"  value={chefData.chef_description} onChange={handleChange} fullWidth margin="normal" required />

                    <Button type="submit" variant="contained" color="primary">Create Chef</Button>
                    
                  </form>
                </>
           
            </SoftBox>
          </Card>
        </SoftBox>
        <Card>
          <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <SoftTypography variant="h6">Chefs Table</SoftTypography>
          </SoftBox>
          <SoftBox>
            <Table>
              <TableBody>
                {Array.isArray(chefs) && chefs.map((chef) => (
                  <TableRow key={chef.id}>
                    <TableCell align="left">{chef.id}</TableCell>
                    <TableCell align="left">{chef.user.Fname}</TableCell>
                    <TableCell align="left">{chef.user.Lname}</TableCell>
                    <TableCell align="left">{chef.user.user_age}</TableCell>
                    <TableCell align="left">{chef.user.user_email}</TableCell>
                    <TableCell align="left">{chef.user.user_number}</TableCell>
                    <TableCell align="left">{chef.user.user_gender}</TableCell>
                    <TableCell align="left">{chef.chef_description}</TableCell>
                    <TableCell align="left"> 
                    <Button onClick={() => handleEdit(chef)} color="primary">Edit</Button>
                    <Button onClick={() => handleDelete(chef.id)} color="secondary">Delete</Button>
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

export default Chefs;
