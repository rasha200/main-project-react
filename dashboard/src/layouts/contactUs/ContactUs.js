// @mui material components
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

function ContactUs() {
  const [contactUs, setContactUs] = useState([]);

  // Fetch contact data from API
  const fetchContactUs = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/contactUs");
      console.log("Full Response Data:", response);

      if (response && response.data && Array.isArray(response.data)) {
        setContactUs(response.data);
      } else if (response.data.data) {
        setContactUs(response.data.data);
      } else {
        console.error("Unexpected data structure:", response.data);
        setContactUs([]);
      }
    } catch (error) {
      console.error("Error fetching contact data:", error);
      setContactUs([]);
    }
  };

  // Delete contact function
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/contactUs/${id}`);
      
      // Log the response to check if deletion was successful
      console.log(`Response from delete request:`, response.data);

      // Update the state to remove the deleted contact
      setContactUs((prevContacts) => prevContacts.filter(contact => contact.id !== id));
      
      console.log(`Contact with ID ${id} deleted successfully.`);
    } catch (error) {
      // Log error details
      console.error("Error deleting contact:", error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    fetchContactUs(); // Fetch data when the component mounts
  }, []);

  console.log("ContactUs State:", contactUs);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <Card>
          <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <SoftTypography variant="h6">Contact Us Table</SoftTypography>
          </SoftBox>
          <SoftBox>
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  {contactUs.length > 0 ? (
                    contactUs.map((contact) => (
                      <TableRow key={contact.id}>
                        <TableCell>{contact.id}</TableCell>
                        <TableCell>{contact.contact_subject}</TableCell>
                        <TableCell>{contact.contact_message}</TableCell>
                        <TableCell>
                          <Button 
                            style={{ color: "red" }} 
                            onClick={() => handleDelete(contact.id)} // Activate delete on click
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

export default ContactUs;
