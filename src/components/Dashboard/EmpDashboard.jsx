import React, { useState } from "react";
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
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const EmpDashboard = () => {
  const [search, setSearch] = useState("");
  const [patients, setPatients] = useState([
    { id: 1, nombre: "Juan", apellido: "Pérez", edad: 30, estado: "Estable" },
    { id: 2, nombre: "Ana", apellido: "Gómez", edad: 25, estado: "Crítico" },
    {
      id: 3,
      nombre: "Carlos",
      apellido: "Díaz",
      edad: 40,
      estado: "Recuperación",
    },
    { id: 4, nombre: "María", apellido: "López", edad: 35, estado: "Estable" },
    {
      id: 5,
      nombre: "Pedro",
      apellido: "Martínez",
      edad: 50,
      estado: "Crítico",
    },
    {
      id: 6,
      nombre: "Lucía",
      apellido: "Fernández",
      edad: 28,
      estado: "Recuperación",
    },
  ]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredPatients = patients.filter((patient) =>
    `${patient.nombre} ${patient.apellido}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full h-full gap-3 px-4 py-6 bg-transparent">
      {/* Barra de búsqueda y botón de añadir */}
      <div className="flex items-center justify-between w-full h-[10%] rounded-2xl p-4 bg-[#d1d5da]">
        <TextField
          label="Buscar paciente"
          variant="outlined"
          size="small"
          value={search}
          onChange={handleSearch}
          className="w-2/3 bg-white rounded-md"
        />
        <Button variant="contained" color="primary" className="ml-4">
          Añadir Paciente
        </Button>
      </div>

      {/* Tabla de pacientes */}
      <div className="flex flex-col w-full h-[90%] rounded-2xl overflow-auto">
        <TableContainer
          component={Paper}
          className="rounded-2xl max-h-[400px] overflow-auto"
        >
          <Table stickyHeader>
            <TableHead
              sx={{
                backgroundColor: "#002169",
                "& .MuiTableCell-root": {
                  color: "gray",
                  fontWeight: "bold",
                },
              }}
            >
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Apellido</TableCell>
                <TableCell>Edad</TableCell>
                <TableCell>Estado de Salud</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>{patient.nombre}</TableCell>
                  <TableCell>{patient.apellido}</TableCell>
                  <TableCell>{patient.edad}</TableCell>
                  <TableCell>{patient.estado}</TableCell>
                  <TableCell>
                    <IconButton color="primary">
                      <Edit />
                    </IconButton>
                    <IconButton color="secondary">
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default EmpDashboard;
