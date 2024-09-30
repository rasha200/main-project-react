

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
import Typography from '@mui/material/TableRow';
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Paper from '@mui/material/Paper';
import TextField from "@mui/material/TextField";



// Axios for making API requests
import axios from "axios";
import { useEffect, useState } from "react";


function Courses() {
  const [courses, setCourses] = useState([]);

  // Fetch courses from API
  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/courses");
      // console.log("API Response:", response.data); // Log the entire response
      console.log(response.data);
      setCourses(courses);  // Handle cases where data is nested inside 'data'
      console.log("Courses State:" ,courses);
      if (response && response.data && Array.isArray(response.data)) {
        // setCourses(response.data);  // Set state if response data is an array
      } else if (response.data) {
        // setCourses(response.data);  // Handle cases where data is nested inside 'data'
      } else {
        console.error("Unexpected data structure:", response.data);
        // setCourses([]);  // Fallback in case of unexpected structure
      }



     
    } catch (error) {
      console.error("Error fetching courses:", error);
      // setCourses([]);
    }
  };



  
  useEffect(() => {
    fetchCourses();  // Call fetch function when the component mounts
  }, []);
  
  // console.log("Courses State:", courses);  // Check if state updates
  

  return (
    <DashboardLayout>
      <DashboardNavbar/>
    <div style={{ padding: '20px' }}>
      <Card>
        <Typography variant="h4" style={{ padding: '20px' }}>Courses Table</Typography>
        {/* Table structure */}
        {courses.length > 0 ? (
          <Table>
            
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell>{course.id}</TableCell>
                  <TableCell>{course.course_name}</TableCell>
                  <TableCell>{course.course_description}</TableCell>
                  <TableCell>{course.chef?.chef_description || 'No chef assigned'}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEdit(course)} color="primary">Edit</Button>
                    <Button onClick={() => handleDelete(course.id)} color="secondary">Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Typography variant="h6" style={{ padding: '20px' }}>No courses available</Typography>
        )}
      </Card>
    </div>
    </DashboardLayout>
  );
}

// Placeholder functions for Edit and Delete
const handleEdit = (course) => {
  console.log("Editing course", course);
};

const handleDelete = (courseId) => {
  console.log("Deleting course with ID:", courseId);
};

export default Courses;











//////////////////////////////////////////////////////////////////22222222222222222222222///////////////////////////////////////////////
// function Courses() {
//   const [courses, setCourses] = useState([]);
  
//   // Fetch courses from API
//   const fetchCourses = async () => {
//     try {
//       const response = await axios.get("http://127.0.0.1:8000/api/courses");
//       console.log(response.data);  // Inspect response data structure
//       setCourses(response.data.data || []);  // Safely handle the response data
//     } catch (error) {
//       console.error("Error fetching courses:", error);
//       setCourses([]);  // Handle the case of an error by setting an empty array
//     }
//   };

//   useEffect(() => {
//     fetchCourses();  // Call fetch function when the component mounts
//   }, []);

//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <SoftBox py={3}>
//         <Card>
//           <SoftBox p={3}>
//             <SoftTypography variant="h6">Courses Table</SoftTypography>
//           </SoftBox>
//           <SoftBox>
//             {/* Ensure courses is an array before calling .map() */}
//             {Array.isArray(courses) && courses.length > 0 ? (
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>ID</TableCell>
//                     <TableCell>Course Name</TableCell>
//                     <TableCell>Description</TableCell>
//                     <TableCell>Actions</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {courses.map((course) => (
//                     <TableRow key={course.id}>
//                       <TableCell>{course.id}</TableCell>
//                       <TableCell>{course.course_name}</TableCell>
//                       <TableCell>{course.course_description}</TableCell>
//                       <TableCell>
//                         {/* Your edit and delete buttons here */}
//                         <Button onClick={() => handleEdit(course)} color="primary">Edit</Button>
//                         <Button onClick={() => handleDelete(course.id)} color="secondary">Delete</Button>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             ) : (
//               <SoftTypography variant="h6">No courses available</SoftTypography>
//             )}
//           </SoftBox>
//         </Card>
//       </SoftBox>
//       <Footer />
//     </DashboardLayout>
//   );
// }

// export default Courses;


/////////////////////////////////////////////////////////////////1111111111//////////////////////////////////////////////////////////

// function Courses() {
//   const [courses, setCourses] = useState([]);  // Ensure initial state is an array
//   const [CoursesData, setCoursesData] = useState({ id: "", name: "", description: "" });
//   const [editing, setEditing] = useState(false);

//   // Fetch courses from API
//   const fetchCourses = async () => {
//     try {
//       const response = await axios.get("http://127.0.0.1:8000/api/courses");
//       console.log(response.data);  // Log the response here after it is defined
//       setCourses(response.data.data || []);  // Ensure fallback to an empty array if data is undefined
//     } catch (error) {
//       console.error("Error fetching courses:", error);
//       setCourses([]);  // Handle error by setting an empty array
//     }
//   };



  // const fetchCourses = async () => {
  //   try {
  //     const response = await axios.get("http://127.0.0.1:8000/api/courses");
  //     setCourses(response.data.data);  // Ensure this data exists and is an array
  //   } catch (error) {
  //     console.error("Error fetching courses:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchCourses();
  // }, []);

  // // Handle form input change
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setCoursesData((prev) => ({ ...prev, [name]: value }));
  // };

  // // Handle Add or Update course
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     if (editing) {
  //       // Update existing course
  //       await axios.put(`http://127.0.0.1:8000/api/courses/${CoursesData.id}`, CoursesData);
  //     } else {
  //       // Add new course
  //       await axios.post("http://127.0.0.1:8000/api/courses", CoursesData);
  //     }
  //     // Reset form and state
  //     setCoursesData({ id: "", name: "", email: "" });
  //     setEditing(false);
  //     fetchCourses(); // Refresh course list
  //   } catch (error) {
  //     console.error("Error submitting course data:", error);
  //   }
  // };

  // // Handle Edit course
  // const handleEdit = (course) => {
  //   setCoursesData(course);
  //   setEditing(true);
  // };

  // // Handle Delete course
  // const handleDelete = async (id) => {
  //   try {
  //     await axios.delete(`http://127.0.0.1:8000/api/courses/${id}`);
  //     fetchCourses();
  //   } catch (error) {
  //     console.error("Error deleting course:", error);
  //   }
  // };

//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <SoftBox py={3}>
//         <SoftBox mb={3}></SoftBox>
//         <Card>
//           <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
//             <SoftTypography variant="h6">Courses Table</SoftTypography>
//           </SoftBox>
//           <SoftBox>
//             {courses && courses.length > 0 ? (
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>ID</TableCell>
//                     <TableCell>Course Name</TableCell>
//                     <TableCell>Description</TableCell>
//                     <TableCell>Actions</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {courses.map((course) => (
//                     <TableRow key={course.id}>
//                       <TableCell>{course.id}</TableCell>
//                       <TableCell>{course.name}</TableCell>
//                       <TableCell>{course.description}</TableCell>
//                       <TableCell>
//                         <Button onClick={() => handleEdit(course)} color="primary">Edit</Button>
//                         <Button onClick={() => handleDelete(course.id)} color="secondary">Delete</Button>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             ) : (
//               <SoftTypography variant="h6">No courses available</SoftTypography>
//             )}
//           </SoftBox>
//         </Card>
//       </SoftBox>
//       <Footer />
//     </DashboardLayout>
//   );
// }

// export default Courses;


