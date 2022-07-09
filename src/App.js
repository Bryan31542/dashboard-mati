import React, {useEffect, useState} from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
    HashRouter
} from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Navbar, Sidebar, ThemeSettings} from "./components";
import {Homepage, Transactions, Calendar, Assistants, Users, Kanban, ColorPicker, Editor, Login} from "./pages"
import  AuthRouter  from './Routes/AuthRouter'

import './App.css'
import { useStateContext } from './context/ContextProvider';
import Main from "./pages/Main";
import MainRouter from "./Routes/MainRouter";
import AdminRouter from "./Routes/AdminRouter";

const App = () => {

    const { activeMenu, themeSettings, setThemeSettings, currentColor, currentMode, setMode, setColor } = useStateContext();

    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [type, setType] = useState(localStorage.getItem("role") || null);
    return (
   <HashRouter>
       {!token && <AuthRouter setToken={setToken} setType={setType}/>}
       {type === "ADMIN_ROLE" && <MainRouter />}
   </HashRouter>
  )
}

export default App