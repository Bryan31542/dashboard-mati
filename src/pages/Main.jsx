import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { Navbar, Sidebar, ThemeSettings } from "../components";
import {
  Homepage,
  Transactions,
  Calendar,
  Assistants,
  Users,
  Kanban,
  ColorPicker,
  Editor,
  Login,
} from "./index";

import "../App.css";
import { useStateContext } from "../context/ContextProvider";
import AdminRouter from "../Routes/AdminRouter";

const Main = () => {
  const {
    activeMenu,
    themeSettings,
    setThemeSettings,
    currentColor,
    currentMode,
    setMode,
    setColor,
  } = useStateContext();

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <div className="flex relative dark:bg-main-dark-bg">
        <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
          <TooltipComponent content="Settings" position="Top">
            <button
              type="button"
              onClick={() => setThemeSettings(true)}
              className="text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray text-white"
              style={{ background: currentColor, borderRadius: "50%" }}
            >
              <FiSettings />
            </button>
          </TooltipComponent>
        </div>

        {activeMenu ? (
          <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
            <Sidebar />
          </div>
        )}

        <div
          className={`dark:bg-main-dark-bg bg-main-bg min-h-hscreen w-full ${
            activeMenu ? " md:ml-72" : " flex-2"
          }`}
        >
          <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
            <Navbar />
          </div>

          {themeSettings && <ThemeSettings />}

          <div>
            <Routes>
              {/* Dashboard */}
              <Route path="/" element={<Homepage />} />
              <Route path="/home" element={<Homepage />} />
              {/* Pages */}
              <Route path="transactions" element={<Transactions />} />
              <Route path="/assistants" element={<Assistants />} />
              <Route path="/users" element={<Users />} />

              {/* Apps */}
              <Route path="/kanban" element={<Kanban />} />
              <Route path="/editor" element={<Editor />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/color-picker" element={<ColorPicker />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
