import React, { useEffect } from "react";
import Swal from "sweetalert2";

const PatientEmpView = ({ patientId }) => {
  useEffect(() => {
    console.log(patientId);
  }, [patientId]);

  return (
    <div className="w-full h-full grid grid-cols-4 grid-rows-4 gap-2">
      <div className="row-span-2 flex flex-col gap-1 bg-[#d1d5d9] border-black border-1 rounded-2xl shadow-xl">
        1
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
