import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Material UI components for Table
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

// Axios for making API requests
import axios from "axios";
import { useEffect, useState } from "react";

function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [students, setStudents] = useState([]); // State for students
  const [chefs, setChefs] = useState([]); // State for chefs
  const [feedbackData, setFeedbackData] = useState({
    id: "",
    feedback: "",
    student_id: "", // Should use student_id instead of student_name
    chef_id: "",
  });
  const [editing, setEditing] = useState(false);

  // Fetch feedbacks, students, and chefs from API
  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/feedback");
      setFeedbacks(response.data);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
      setFeedbacks([]);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/students");
      console.log(response.data); // Log the response data
      if (Array.isArray(response.data)) {
        setStudents(response.data);
      } else {
        console.error("Expected an array but got:", response.data);
        setStudents([]);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
      setStudents([]);
    }
  };

  const fetchChefs = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/chefs");
      if (Array.isArray(response.data)) {
        setChefs(response.data);
      } else {
        console.error("Expected an array but got:", response.data);
        setChefs([]);
      }
    } catch (error) {
      console.error("Error fetching chefs:", error);
      setChefs([]);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
    fetchStudents();
    fetchChefs();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedbackData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(`http://127.0.0.1:8000/api/feedback/${feedbackData.id}`, feedbackData);
      } else {
        await axios.post("http://127.0.0.1:8000/api/feedback", feedbackData);
      }
      setFeedbackData({
        id: "",
        feedback: "",
        student_id: "",
        chef_id: "",
      });
      setEditing(false);
      fetchFeedbacks();
    } catch (error) {
      console.error("Error submitting feedback data:", error);
    }
  };

  const handleEdit = (feedback) => {
    setFeedbackData(feedback);
    setEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/feedback/${id}`);
      fetchFeedbacks();
    } catch (error) {
      console.error("Error deleting feedback:", error);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox p={4}>
              <SoftTypography variant="h4">
                {editing ? "Edit Feedback" : "Add Feedback"}
              </SoftTypography>
              <form onSubmit={handleSubmit}>
                {/* Feedback input */}
                <div className="form-group">
                  <label htmlFor="feedbackInput">Feedback</label>
                  <TextField
                    type="text"
                    name="feedback"
                    value={feedbackData.feedback}
                    onChange={handleChange}
                    className="form-control"
                    id="feedbackInput"
                    placeholder="Enter your feedback"
                    fullWidth
                    margin="normal"
                    required
                  />
                </div>

                {/* Student select input */}
                <div className="form-group">
                  <label htmlFor="studentIdSelect">Student</label>
                  <Select
  name="student_id"
  value={feedbackData.student_id} 
  onChange={handleChange}
  className="form-control"
  id="studentIdSelect"
  fullWidth
  margin="normal"
  required
>
  {students.length > 0 ? (
    students.map((student) => (
      <MenuItem key={student.id} value={student.id}>
        {student.user.Fname}
      </MenuItem>
    ))
  ) : (
    <MenuItem disabled>No students available</MenuItem>
  )}
</Select>

                </div>

                {/* Chef select input */}
                <div className="form-group">
                  <label htmlFor="chefIdSelect">Chef</label>
                  <Select
                    name="chef_id"
                    value={feedbackData.chef_id}
                    onChange={handleChange}
                    className="form-control"
                    id="chefIdSelect"
                    fullWidth
                    margin="normal"
                    required
                  >
                    {chefs && chefs.length > 0 ? (
                      chefs.map((chef) => (
                        <MenuItem key={chef.id} value={chef.id}>
                          {chef.user.Fname} 
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>No chefs available</MenuItem>
                    )}
                  </Select>
                </div>

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
            <SoftTypography variant="h6">Feedback Table</SoftTypography>
          </SoftBox>
          <SoftBox>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                  
                  </TableRow>
                </TableHead>
                <TableBody>
                  {feedbacks.length > 0 ? (
                    feedbacks.map((feedback) => (
                      <TableRow key={feedback.id}>
                        <TableCell>{feedback.id}</TableCell>
                        <TableCell>{feedback.feedback}</TableCell>
                        <TableCell>{feedback.student_name}</TableCell>
                        <TableCell>{feedback.chef_name}</TableCell>
                        <TableCell>
                          <Button onClick={() => handleEdit(feedback)} color="primary">
                            Edit
                          </Button>
                          <Button onClick={() => handleDelete(feedback.id)} color="secondary">
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        No feedbacks available
                      </TableCell>
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

export default Feedback;
