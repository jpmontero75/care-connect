import React, { useContext, useEffect } from "react";
import usuario from "../../assets/usuario.png";
import { HeaderContext } from "../../context/HeaderContext";

const Header = () => {
  const {
    headerTitle,
    setHeaderTitle,
    headerRoute,
    setHeaderRoute,
    headerUser,
  } = useContext(HeaderContext);

  useEffect(() => {
    setHeaderTitle("Dashboard");
    setHeaderRoute("Dashboard / Inicio");
  }, [setHeaderTitle, setHeaderRoute]);

  return (
    <div className="flex justify-between p-4 bg-transparent rounded-t-2xl">
      <div>
        <h1 className="text-xl font-bold xs:text-2xl sm:text-3xl text-[#283945]">
          {headerTitle}
        </h1>
        <p className="text-base">{headerRoute}</p>
      </div>
      <div className="relative w-48 flex items-center">
        <img
          src={usuario}
          alt="Usuario"
          className="z-10 object-cover w-10 h-10 xs:w-12 xs:h-12 bg-white rounded-full"
        />
        <div className="px-10 py-2 bg-white rounded-full shadow-lg -ml-8 z-0">
          <p className="text-sm font-medium text-gray-800">{headerUser}</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
