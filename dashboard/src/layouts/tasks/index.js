import { useEffect, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// MDB Components
import { MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

function TaskManager() {
  // State declarations
  const [tasks, setTasks] = useState([]); // State to hold task data
  const [students, setStudents] = useState([]); // State to hold students data
  const [courses, setCourses] = useState([]); // State to hold courses data

  const [formData, setFormData] = useState({
    task_name: "",
    task_description: "",
    task_end_date: "",
    course_id: "",
    student_id: "",
    chef_id: 1, // Assuming chef_id is known
    task_file: null, // File data
  });
  const [editMode, setEditMode] = useState(false); // Toggle between create/edit mode
  const [editTaskId, setEditTaskId] = useState(null); // Track task being edited

  // Fetch tasks and students on component mount
  useEffect(() => {
    fetchStudents();
    fetchTasks();
    fetchCourses(); // Fetch courses when component mounts
  }, []);

  // Function to fetch students from API
  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/student");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };
  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/course");
      setCourses(response.data); // Set course data in state
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };
  

  // Function to fetch all tasks from API
  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFormData({ ...formData, task_file: e.target.files[0] });
  };

  // Handle form submission for creating or updating tasks
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("task_name", formData.task_name);
    data.append("task_description", formData.task_description);
    data.append("task_end_date", formData.task_end_date);
    data.append("course_id", formData.course_id);
    data.append("student_id", formData.student_id);
    data.append("chef_id", formData.chef_id);

    if (formData.task_file) {
      data.append("task_file", formData.task_file);
    }

    try {
      if (editMode) {
        await axios.post(`http://127.0.0.1:8000/api/tasks/${editTaskId}`, data); // Update task
        setEditMode(false);
        setEditTaskId(null);
      } else {
        await axios.post("http://127.0.0.1:8000/api/tasks", data); // Create new task
      }
      fetchTasks(); // Refresh tasks after create/update
      setFormData({
        task_name: "",
        task_description: "",
        task_end_date: "",
        course_id: "",
        student_id: "",
        chef_id: 1,
        task_file: null,
      }); // Reset form after submission
    } catch (error) {
      console.error("Error submitting task:", error);
    }
  };

  // Handle task edit action
  const handleEdit = (task) => {
    setFormData({
      task_name: task.task_name,
      task_description: task.task_description,
      task_end_date: task.task_end_date,
      course_id: task.course_id,
      student_id: task.student_id,
      chef_id: task.chef_id,
      task_file: null, // Reset file input for editing
    });
    setEditTaskId(task.id);
    setEditMode(true);
  };

  // Handle task delete action
  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/tasks/${taskId}`);
      fetchTasks(); // Refresh tasks after deletion
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        {/* Task Form */}
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Add Task</SoftTypography>
            </SoftBox>
            <form onSubmit={handleSubmit} className="p-5">
              <MDBRow className="mb-4">
                <MDBCol>
                  <MDBInput
                    id="form6Example1"
                    label="Task Name"
                    name="task_name"
                    value={formData.task_name}
                    onChange={handleInputChange}
                  />
                </MDBCol>
                <MDBCol>
                  <MDBInput
                    id="form6Example2"
                    label="Task Description"
                    name="task_description"
                    value={formData.task_description}
                    onChange={handleInputChange}
                  />
                </MDBCol>
              </MDBRow>

              <MDBInput
                wrapperClass="mb-4"
                id="form6Example3"
                label="End Date"
                name="task_end_date"
                type="date"
                value={formData.task_end_date}
                onChange={handleInputChange}
              />

              <MDBInput
                hidden ="true"
                wrapperClass="mb-4"
                id="form6Example4"
               
                name="course_id"
                value={formData.course_id}
                onChange={handleInputChange}
              />

              <select 
                  className="form-select mb-4"
                id="form6Example4"
                label="Course ID"
                name="course_id"
                value={formData.course_id}
                onChange={handleInputChange}
              >
                 <option value="">Select course</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.course_name}
                  </option>
                ))}
              </select>

              {/* Dropdown for students */}
              <select
                className="form-select mb-4"
                name="student_id"
                value={formData.student_id}
                onChange={handleInputChange}
              >
                <option value="">Select Student</option>
                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.parent_name}
                  </option>
                ))}
              </select>

              {/* File Input */}
              <MDBInput
                wrapperClass="mb-4"
                type="file"
                id="form6Example6"
                onChange={handleFileChange}
              />

              <MDBBtn className="mb-4" type="submit" block>
                {editMode ? "Update Task" : "Create Task"}
              </MDBBtn>
            </form>
          </Card>
        </SoftBox>

        {/* Tasks Table */}
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Tasks</SoftTypography>
            </SoftBox>
            <SoftBox>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
       
                  <TableBody>
                    {tasks.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell>{task.id}</TableCell>
                        <TableCell>{task.task_name}</TableCell>
                        <TableCell>{task.task_description}</TableCell>
                        <TableCell>{task.task_end_date}</TableCell>
                        <TableCell>
                          <Button onClick={() => handleEdit(task)} color="primary">
                            Edit
                          </Button>
                          <Button onClick={() => handleDelete(task.id)} color="secondary">
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default TaskManager;
