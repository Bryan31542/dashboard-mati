import {Navigate, Route, Routes} from "react-router-dom";
import {Assistants, Calendar, ColorPicker, Editor, Homepage, Kanban, Transactions, Users} from "../pages";
import Main from "../pages/Main";

const AdminRouter = () => {
    return(
        <Routes>
            {/* Dashboard */}
            <Route path='/homepage' element={<Main/>} />

            {/* Pages */}
            <Route path='/transactions' element={<Transactions />} />
            <Route path='/assistants' element={<Assistants/>} />
            <Route path='/users' element={<Users/>} />

            {/* Apps */}
            <Route path='/kanban' element={<Kanban/>} />
            <Route path='/editor' element={<Editor/>} />
            <Route path='/calendar' element={<Calendar/>} />
            <Route path='/color-picker' element={<ColorPicker/>} />

            <Route path="*" element={<Navigate to={"homepage"} />} />

        </Routes>
    )
}

export default AdminRouter