import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
//   Link
} from "react-router-dom";
import PagesRegisterUser from "./Register/RegisterUser"
import PagesLeadsPanel from "./LeadsPanel/PagesLeadsPanel"
import PagesLeadsForm from "./LeadsForm/PagesLeadsForm";

const Root = () => {
    return(
        <Router>
            <Routes>
                <Route exact path="/" element={<PagesRegisterUser />} />
                <Route path="/control" element={<PagesLeadsPanel />} />
                <Route path="/newlead" element={<PagesLeadsForm />} />
            </Routes>
        </Router>
    );
};

export default Root;