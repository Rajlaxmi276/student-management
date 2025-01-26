import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Modal,
  Box,
  TextField,
  MenuItem,
} from "@mui/material";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Students = () => {
  const [open, setOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    class: "",
    section: "",
    rollNumber: "",
    email: "",
    phone: "",
    address: "",
    guardianName: "",
    admissionDate: "",
    gender: "",
  });

  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/"); // Redirect to login if not authenticated
      }
    });

    fetchStudents(); // Load students on page load

    return () => unsubscribe();
  }, []);

  // Fetch students from Firestore
  const fetchStudents = async () => {
    const querySnapshot = await getDocs(collection(db, "students"));
    const studentsList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setStudents(studentsList);
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add student to Firestore
  const handleAddStudent = async () => {
    if (!formData.name || !formData.rollNumber || !formData.admissionDate || !formData.gender) {
      alert("Please fill all required fields!");
      return;
    }

    try {
      await addDoc(collection(db, "students"), formData);
      alert("Student Added");
      setOpen(false);
      fetchStudents(); // Refresh students list
    } catch (error) {
      alert("Error Adding Student: " + error.message);
    }
  };

  // Logout function
  const handleLogout = () => {
    signOut(auth).then(() => {
      localStorage.removeItem("isAuthenticated");
      navigate("/");
    });
  };

  return (
    <div>
      {/* Navbar */}
      <div style={{ display: "flex", justifyContent: "space-between", padding: "10px" }}>
        <h2>Students Page</h2>
        <Button variant="contained" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      {/* Add Student Button */}
      <Button variant="contained" onClick={() => setOpen(true)}>
        Add Student
      </Button>

      {/* Students Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Class</TableCell>
            <TableCell>Section</TableCell>
            <TableCell>Roll Number</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Guardian Name</TableCell>
            <TableCell>Admission Date</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.class}</TableCell>
              <TableCell>{student.section}</TableCell>
              <TableCell>{student.rollNumber}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>{student.phone}</TableCell>
              <TableCell>{student.guardianName}</TableCell>
              <TableCell>{student.admissionDate}</TableCell>
              <TableCell>{student.gender}</TableCell>
              <TableCell>
                <Button variant="contained" color="secondary">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Add Student Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 400, padding: 4, margin: "auto", mt: "10%", backgroundColor: "white" }}>
          <h3>Add Student</h3>
          {Object.keys(formData).map((field) => {
            if (field === "admissionDate") {
              return (
                <TextField
                  key={field}
                  name={field}
                  label="Admission Date"
                  type="date"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  onChange={handleInputChange}
                />
              );
            } else if (field === "gender") {
              return (
                <TextField
                  key={field}
                  name={field}
                  label="Gender"
                  select
                  fullWidth
                  margin="normal"
                  onChange={handleInputChange}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
              );
            } else {
              return (
                <TextField
                  key={field}
                  name={field}
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  fullWidth
                  margin="normal"
                  onChange={handleInputChange}
                />
              );
            }
          })}
          <Button variant="contained" onClick={handleAddStudent}>
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default Students;
