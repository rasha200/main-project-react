// @mui material components
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from "@mui/material/TextField";

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
  const [editingContact, setEditingContact] = useState(null);

  // Fetch contact data from API
  const fetchContactUs = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/contactUs");

      if (response && response.data && Array.isArray(response.data)) {
        setContactUs(response.data);  // Set state if response data is an array
      } else if (response.data.data) {
        setContactUs(response.data.data);  // Handle cases where data is nested inside 'data'
      } else {
        console.error("Unexpected data structure:", response.data);
        setContactUs([]);  // Fallback in case of unexpected structure
      }

    } catch (error) {
      console.error("Error fetching contact data:", error);
      setContactUs([]);  // Handle error by setting an empty array
    }
  };

  // Handle delete button
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/contactUs/${id}`);
      setContactUs((prevContactUs) => prevContactUs.filter(contact => contact.id !== id));  // Update state after deletion
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  // Handle edit button
  const handleEdit = (contact) => {
    setEditingContact(contact);  // Set selected contact for editing
  };

  // Handle input change for the edit form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingContact((prevContact) => ({ ...prevContact, [name]: value }));
  };

  // Handle save after editing
  const handleSave = async () => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/contactUs/${editingContact.id}`, editingContact);
      setContactUs((prevContactUs) =>
        prevContactUs.map((contact) =>
          contact.id === editingContact.id ? editingContact : contact
        )
      );
      setEditingContact(null);  // Clear the editing state
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  useEffect(() => {
    fetchContactUs();  // Fetch data when the component mounts
  }, []);

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
                          <Button color="primary" onClick={() => handleEdit(contact)}>Edit</Button>
                          <Button color="secondary" onClick={() => handleDelete(contact.id)}>Delete</Button>
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

      {/* Edit Form */}
      {editingContact && (
        <SoftBox py={3}>
          <Card>
            <SoftBox p={3}>
              <SoftTypography variant="h6">Edit Contact</SoftTypography>
              <form>
                <TextField
                  label="Subject"
                  name="contact_subject"
                  value={editingContact.contact_subject}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Message"
                  name="contact_message"
                  value={editingContact.contact_message}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <Button color="primary" onClick={handleSave}>Save</Button>
                <Button color="secondary" onClick={() => setEditingContact(null)}>Cancel</Button>
              </form>
            </SoftBox>
          </Card>
        </SoftBox>
      )}

      <Footer />
    </DashboardLayout>
  );
}

export default ContactUs;