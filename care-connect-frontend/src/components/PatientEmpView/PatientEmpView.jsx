import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Swal from "sweetalert2";

import { fetchPatientLastVitals } from "../../services/empApiEndpoints";
import Loader from "../Loader/Loader";

const PatientEmpView = ({ patientId, setPatientEmpView }) => {
  const [patientData, setPatientData] = useState({});
  const [loading, setLoading] = useState(true);
  const fetchPatientData = async (patientId) => {
    try {
      setLoading(true);
      const patientData = await fetchPatientLastVitals(patientId);
      console.log(patientData);
      setPatientData(patientData);
    } catch (error) {
      console.error("Error fetching patient data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (Object.keys(patientData).length === 0) {
      fetchPatientData(patientId);
    } else {
      setLoading(false);
    }
  }, [patientId]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="w-full h-full grid grid-cols-4 grid-rows-4 gap-2">
      <div className="row-span-2 flex flex-col gap-1 bg-[#d1d5d9] border-black border-1 rounded-2xl shadow-xl">
        <div className="w-full p-4 pb-0 flex items-center">
          {/* Botón para regresar */}
          <IconButton onClick={() => setPatientEmpView(false)}>
            <ArrowBackIosIcon />
          </IconButton>
          <h1 className="font-bold sm:text-xl lg:text-2xl text-[#283945]">
            Paciente:
          </h1>
        </div>
        <div className="w-full">
          <ul className="w-full pl-6">
            <li className="flex gap-2 items-center">
              <h2 className="font-bold text-[#283945] text-xl truncate">Nombre:</h2>
              <p>{patientData.paciente.nombre}</p>
            </li>
            <li className="flex gap-2 items-center">
              <h2 className="font-bold text-[#283945] text-xl truncate">Apellido:</h2>
              <p>{patientData.paciente.apellido}</p>
            </li>
            <li className="flex gap-2 items-center">
              <h2 className="font-bold text-[#283945] text-xl truncate">Edad:</h2>
              <p>{patientData.paciente.edad}</p>
            </li>
            <li className="flex gap-2 items-center">
              <h2 className="font-bold text-[#283945] text-xl truncate">Peso:</h2>
              <p>{patientData.peso}</p>
            </li>
            <li className="flex gap-2 items-center">
              <h2 className="font-bold text-[#283945] text-xl truncate">Estatura:</h2>
              <p>{patientData.estatura}</p>
            </li>
            <li className="flex gap-2 items-center">
              <h2 className="font-bold text-[#283945] text-xl truncate">
                Estado de salud:
              </h2>
              <p>{patientData.paciente.estado_salud}</p>
            </li>
          </ul>
        </div>
      </div>
      <div className="col-span-2 flex flex-col gap-1 bg-[#d1d5d9] border-black border-1 rounded-2xl shadow-xl">
        2
      </div>
      <div className="col-span-2 col-start-2 row-start-2 flex flex-col gap-1 bg-[#d1d5d9] border-black border-1 rounded-2xl shadow-xl">
        3
      </div>
      <div className="col-span-3 row-span-2 col-start-1 row-start-3 flex flex-col gap-1 bg-[#d1d5d9] border-black border-1 rounded-2xl shadow-xl">
        4
      </div>
      <div className="row-span-4 col-start-4 row-start-1 flex flex-col gap-1 bg-[#d1d5d9] border-black border-1 rounded-2xl shadow-xl">
        5
      </div>
    </div>
  );
};

export default PatientEmpView;
