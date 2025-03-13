import React, { useState } from "react";
import Swal from 'sweetalert2'
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  MenuItem,
  Modal,
  Box,
  Typography,
} from "@mui/material";
import { Edit, Delete, Visibility } from "@mui/icons-material";

import BarChartIcon from "@mui/icons-material/BarChart";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#d1d5da",
    color: "#283945",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    textAlign: "center",
  },
}));

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

const EmpDashboard = () => {
  const [search, setSearch] = useState("");
  const [patients, setPatients] = useState([
    { id: 1, nombre: "Juan", apellido: "Pérez", edad: 30, estado: "Estable" },
    { id: 2, nombre: "Ana", apellido: "Cantu", edad: 25, estado: "Crítico" },
  ]);

  const [openModal, setOpenModal] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [patientData, setPatientData] = useState({
    nombre: "",
    apellido: "",
    edad: "",
    estado: "Estable",
  });

  const handleOpenModal = (patient = null) => {
    setEditingPatient(patient);
    setPatientData(
      patient || { nombre: "", apellido: "", edad: "", estado: "Estable" }
    );
    setOpenModal(true);
  };

  const handleCloseModal = () => setOpenModal(false);

  const handleChange = (e) => {
    setPatientData({ ...patientData, [e.target.name]: e.target.value });
  };

  const handleSavePatient = () => {
    if (editingPatient) {
      setPatients(
        patients.map((p) => (p.id === editingPatient.id ? patientData : p))
      );
    } else {
      setPatients([...patients, { id: patients.length + 1, ...patientData }]);
    }
    handleCloseModal();
  };

  const handleDeletePatient = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1e3b55',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Eliminado',
          'El paciente ha sido eliminado.',
          'success'
        )
        setPatients(patients.filter((p) => p.id !== id));
      }
    }
    )
  }

  return (
    <div className="flex flex-col w-full h-full gap-3 px-4 py-6 bg-transparent">
      <div className="flex items-center justify-between w-full h-[10%] rounded-2xl p-4 bg-[#d1d5da]">
        <TextField
          label="Buscar paciente"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-2/3 bg-white rounded-md"
        />
        <Button
          variant="contained"
          sx={{ backgroundColor: "#1e3b55", color: "#fff", fontWeight: "bold" }}
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => handleOpenModal()}
        >
          Añadir
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <StyledTableCell>Nombre</StyledTableCell>
              <StyledTableCell>Apellido</StyledTableCell>
              <StyledTableCell>Edad</StyledTableCell>
              <StyledTableCell>Estado de Salud</StyledTableCell>
              <StyledTableCell>Acciones</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((patient) => (
              <TableRow key={patient.id}>
                <StyledTableCell>{patient.nombre}</StyledTableCell>
                <StyledTableCell>{patient.apellido}</StyledTableCell>
                <StyledTableCell>{patient.edad}</StyledTableCell>
                <StyledTableCell>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {patient.estado}{" "}
                    <BarChartIcon
                      sx={{
                        color: patient.estado === "Crítico" ? "red" : "green",
                        marginLeft: 1,
                      }}
                    />
                  </div>
                </StyledTableCell>
                <StyledTableCell>
                  <IconButton color="primary">
                    <Visibility />
                  </IconButton>
                  <IconButton
                    color="primary"
                    onClick={() => handleOpenModal(patient)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDeletePatient(patient.id)}
                    sx={{ ":hover": { color: "red" } }}
                  >
                    <Delete />
                  </IconButton>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2" mb={2}>
            {editingPatient ? "Editar Paciente" : "Agregar Paciente"}
          </Typography>
          <TextField
            fullWidth
            margin="dense"
            label="Nombre"
            name="nombre"
            value={patientData.nombre}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Apellido"
            name="apellido"
            value={patientData.apellido}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Edad"
            name="edad"
            type="number"
            value={patientData.edad}
            onChange={handleChange}
          />
          <TextField
            select
            fullWidth
            margin="dense"
            label="Estado"
            name="estado"
            value={patientData.estado}
            onChange={handleChange}
          >
            <MenuItem value="Estable">Estable</MenuItem>
            <MenuItem value="Crítico">Crítico</MenuItem>
            <MenuItem value="Recuperación">Recuperación</MenuItem>
          </TextField>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2, backgroundColor: "#1e3b55" }}
            onClick={handleSavePatient}
          >
            {editingPatient ? "Actualizar" : "Guardar"}
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default EmpDashboard;
