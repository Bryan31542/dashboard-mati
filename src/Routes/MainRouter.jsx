import {Navigate, Route, Routes} from "react-router-dom";
import {Assistants, Calendar, ColorPicker, Editor, Homepage, Kanban, Login, Transactions, Users} from "../pages";
import Main from "../pages/Main";


const MainRouter = ( { setToken, setType } ) => {
    return(
        <Routes>
            <Route path="/" element={<Main />} >

                {/* Dashboard*/}
                <Route path='Home' element={<Homepage/>} />

                {/* Pages */}
                <Route path='transactions' element={<Transactions />} />
                <Route path='assistants' element={<Assistants/>} />
                <Route path='users' element={<Users/>} />

                {/* Apps */}
                <Route path='kanban' element={<Kanban/>} />
                <Route path='editor' element={<Editor/>} />
                <Route path='calendar' element={<Calendar/>} />
                <Route path='color-picker' element={<ColorPicker/>} />

            </Route>
            <Route path={"*"} element={<Navigate to={"/Home"} />} />

        </Routes>
    );
};

export default MainRouter