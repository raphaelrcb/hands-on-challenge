import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import PagesRegisterUser from "./Register/RegisterUser"
import PagesLeadsPanel from "./LeadsPanel/PagesLeadsPanel"
import PagesLeadsForm from "./LeadsForm/PagesLeadsForm";

const Root = () => {
    return(
        <DndProvider backend={HTML5Backend}>
            <Router>
                <Routes>
                    <Route exact path="/" element={<PagesRegisterUser />} />
                    <Route path="/control" element={<PagesLeadsPanel />} />
                    <Route path="/newlead" element={<PagesLeadsForm />} />
                </Routes>
            </Router>
        </ DndProvider>
    );
};

export default Root;