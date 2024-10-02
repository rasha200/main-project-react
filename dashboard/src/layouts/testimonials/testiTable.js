import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Axios for making API requests
import axios from "axios";
import { useEffect, useState } from "react";

function Testi() {
  const [testimonials, setTestimonials] = useState([]);

  // Fetch testimonials data from API
  const fetchTestimonial = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/testimonials");
      console.log("Full Response Data:", response);

      if (response && response.data && Array.isArray(response.data)) {
        setTestimonials(response.data);
      } else if (response.data.data) {
        setTestimonials(response.data.data);
      } else {
        console.error("Unexpected data structure:", response.data);
        setTestimonials([]);
      }
    } catch (error) {
      console.error("Error fetching testimonials data:", error);
      setTestimonials([]);
    }
  };

  // Delete testimonials function
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/testimonials/${id}`);
      
      // Log the response to check if deletion was successful
      console.log(`Response from delete request:`, response.data);

      // Update the state to remove the deleted testimonials
      setTestimonials((prevTestimonials) => prevTestimonials.filter(testimonial => testimonial.id !== id));
      
      console.log(`Testimonial with ID ${id} deleted successfully.`);
    } catch (error) {
      // Log error details
      console.error("Error deleting testimonials:", error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    fetchTestimonial(); // Fetch data when the component mounts
  }, []);

  console.log("Testimonials State:", testimonials);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <Card>
          <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <SoftTypography variant="h6">Testimonials Table</SoftTypography>
          </SoftBox>
          <SoftBox>
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  {testimonials.length > 0 ? (
                    testimonials.map((testimonial) => (
                      <TableRow key={testimonial.id}>
                        <TableCell>{testimonial.id}</TableCell>
                        <TableCell>{testimonial.message}</TableCell>
                        <TableCell>
                          <Button 
                            style={{ color: "red" }} 
                            onClick={() => handleDelete(testimonial.id)} // Activate delete on click
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        No data available
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

export default Testi;
