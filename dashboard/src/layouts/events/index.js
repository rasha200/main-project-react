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
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function Events() {
  const [events, setEvents] = useState([]);
  const [eventData, setEventData] = useState({ id: "", event_name: "", user_id: "" }); // Use user_id here
  const [editing, setEditing] = useState(false);

  // Fetch events from API
  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/events");
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Add or Update event
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(`http://127.0.0.1:8000/api/events/${eventData.id}`, eventData);
      } else {
        await axios.post("http://127.0.0.1:8000/api/events", eventData);
      }
      setEventData({ id: "", event_name: "", user_id: "" }); // Reset form
      setEditing(false);
      fetchEvents(); 
    } catch (error) {
      console.error("Error submitting event data:", error);
    }
  };

  // Handle Edit event
  const handleEdit = (event) => {
    setEventData(event);
    setEditing(true);
  };

  // Handle Delete event
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/events/${id}`);
      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox p={6}>
              <SoftTypography variant="h4">{editing ? "Edit Event" : "Add Event"}</SoftTypography>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="event_name">Event Name</label>
                  <TextField
                    name="event_name"
                    value={eventData.event_name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="user_id">User ID</label> {/* Changed to user_id */}
                  <TextField
                    name="user_id"
                    value={eventData.user_id} // Ensure you're using user_id
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                  />
                </div>
                <Button type="submit" variant="contained" color="primary">
                  {editing ? "Update" : "Add"}
                </Button>
              </form>
            </SoftBox>
          </Card>
        </SoftBox>
        <Card>
          <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <SoftTypography variant="h6">Events Table</SoftTypography>
          </SoftBox>
          <SoftBox>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">ID</TableCell>
                  <TableCell align="left">Event Name</TableCell>
                  <TableCell align="left">User ID</TableCell>
                  <TableCell align="left">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {events.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell align="left">{event.id}</TableCell>
                    <TableCell align="left">{event.event_name}</TableCell>
                    <TableCell align="left">{event.user_id}</TableCell> {/* user_id used here */}
                    <TableCell align="left">
                      <Button onClick={() => handleEdit(event)} color="primary">Edit</Button>
                      <Button onClick={() => handleDelete(event.id)} color="secondary">Delete</Button>
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

export default Events;
