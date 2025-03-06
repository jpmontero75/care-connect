import React, { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";

export const MainView = () => {
  const { logout } = UserAuth();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
      localStorage.clear();
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="flex w-full h-screen bg-primary">
      {/* Sidebar */}
      <div
        className={`bg-primary h-screen z-10 ${
          expanded ? "w-[60%] xs:w-[15%] md:w-[15%] lg:w-[16%]" : "lg:w-[6%] xs:w-[8%] sm:w-[8%] md:w-[6%]"
        } fixed`}
        onMouseOver={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
      >
        <Sidebar logout={handleLogout} showTitles={expanded} />
      </div>

      {/* Contenido */}
      <div className="flex justify-center items-center h-screen w-[88%] lg:ml-[6%] xs:w-[90%] xs:ml-[10%] sm:w-[92%] sm:ml-[8%] md:w-[94%] md:ml-[6%] lg:w-[96%]">
        <div className="w-[98.5%] h-[98%] flex flex-col gap-3 bg-gradient-to-r from-[rgba(255,255,255,0.6)] to-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.3)] rounded-[32px] shadow-[10px_20px_40px_rgba(43,43,124,0.3)]">
          <div className="h-[10%]">
            <Header />
          </div>
          <div className="w-full h-[90%]">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};