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

function CourseManager() {
  // State declarations
  const [courses, setCourses] = useState([]); // State to hold course data
  const [students, setStudents] = useState([]); // State to hold students data
  const [chefs, setChefs] = useState([]); // State to hold students data
 // Fetching students
const fetchStudents = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/student");
    setStudents(response.data); // Ensure this is an array of students with user relationship
  } catch (error) {
    console.error("Error fetching students:", error);
  }
};

// Fetching chefs
const fetchChefs = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/chefs");
    setChefs(response.data); // Ensure this is an array of chefs with user relationship
  } catch (error) {
    console.error("Error fetching chefs:", error);
  }
};
  const [formData, setFormData] = useState({
    course_name: "",
    course_description: "",
    course_start_date: "",
    course_end_date: "",
    student_id: "", 
    chef_id: "" 
  });
  
  const [editMode, setEditMode] = useState(false); // Toggle between create/edit mode
  const [editCourseId, setEditCourseId] = useState(null); // Track course being edited

  // Fetch courses on component mount
  useEffect(() => {
    fetchCourses(); // Fetch courses when component mounts
    fetchStudents();
    fetchChefs();
  }, []);

  // Function to fetch all courses from API
  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/course");
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission for creating or updating courses
  const handleSubmit = async (e) => {
    e.preventDefault();

  // console.log("Form Data Submitted: ", formData);

  try {
    const payload = {
      ...formData, // This includes course details, student_id, and chef_id
    };

    if (editMode) {
      await axios.put(`http://127.0.0.1:8000/api/course/${editCourseId}`, payload);
    } else {
      await axios.post("http://127.0.0.1:8000/api/course", payload);
    }

    fetchCourses(); // Refresh the course list
    setFormData({
      course_name: "",
      course_description: "",
      course_start_date: "",
      course_end_date: "",
      student_id: "",
      chef_id: "",
    });
  } catch (error) {
    console.error("Error submitting course:", error.response ? error.response.data : error.message);
  }
};

  //   try {
  //     if (editMode) {
  //       await axios.put(`http://127.0.0.1:8000/api/course/${editCourseId}`, formData); // Update course
  //       setEditMode(false);
  //       setEditCourseId(null);
  //     } else {
  //       await axios.post("http://127.0.0.1:8000/api/course", formData); // Create new course
  //     }
  //     fetchCourses(); // Refresh courses after create/update
  //     setFormData({
  //       course_name: "",
  //       course_description: "",
  //       course_start_date: "",
  //       course_end_date: "",
  //       student_id: "",
  //       chef_id: "",
  //     }); // Reset form after submission
  //   } catch (error) {
  //     console.error("Error submitting course:", error.response ? error.response.data : error.message);
  //   }
  // };



  // Handle course edit action
  const handleEdit = (course) => {
    setFormData({
      course_name: course.course_name,
      course_description: course.course_description,
      course_start_date: course.course_start_date,
      course_end_date: course.course_end_date


    });
    setEditCourseId(course.id);
    setEditMode(true);
  };

  // Handle course delete action
  const handleDelete = async (courseId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/course/${courseId}`);
      fetchCourses(); // Refresh courses after deletion
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        {/* Course Form */}
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Add Course</SoftTypography>
            </SoftBox>
            <form onSubmit={handleSubmit} className="p-5">
              <MDBRow className="mb-4">
                <MDBCol>
                  <MDBInput
                    id="form6Example1"
                    label="Course Name"
                    name="course_name"
                    value={formData.course_name}
                    onChange={handleInputChange}
                  />
                </MDBCol>
                <MDBCol>
                  <MDBInput
                    id="form6Example2"
                    label="Course Description"
                    name="course_description"
                    value={formData.course_description}
                    onChange={handleInputChange}
                  />
                </MDBCol>
              </MDBRow>

              <MDBInput
                wrapperClass="mb-4"
                id="form6Example3"
                label="Start Date"
                name="course_start_date"
                type="date"
                value={formData.course_start_date}
                onChange={handleInputChange}
              />

              <MDBInput
                wrapperClass="mb-4"
                id="form6Example4"
                label="End Date"
                name="course_end_date"
                type="date"
                value={formData.course_end_date}
                onChange={handleInputChange}
              />
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
                    {student.user.Fname}
                  </option>
                ))}
              </select>
               {/* Dropdown for chefs */}
               <select
                className="form-select mb-4"
                name="chef_id" // Changed to chef_id
                value={formData.chef_id} // Ensure you have this in your state
                onChange={handleInputChange}
              >
                <option value="">Select Chef</option>
                {chefs.map((chef) => (
                  <option key={chef.id} value={chef.id}>
                    {chef.user.Fname}
                  </option>
                ))}
              </select>

              <MDBBtn className="mb-4" type="submit" block>
                {editMode ? "Update Course" : "Create Course"}
              </MDBBtn>
            </form>
          </Card>
        </SoftBox>

        {/* Courses Table */}
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Courses</SoftTypography>
            </SoftBox>
            <SoftBox>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableBody>
                    {courses.map((course) => (
                      <TableRow key={course.id}>
                        <TableCell>{course.id}</TableCell>
                        <TableCell>{course.course_name}</TableCell>
                        <TableCell>{course.course_description}</TableCell>
                        <TableCell>{course.course_start_date}</TableCell>
                        <TableCell>{course.course_end_date}</TableCell>
                        
                        <TableCell>
                          <Button onClick={() => handleEdit(course)} color="primary">
                            Edit
                          </Button>
                          <Button onClick={() => handleDelete(course.id)} color="secondary">
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

export default CourseManager;
