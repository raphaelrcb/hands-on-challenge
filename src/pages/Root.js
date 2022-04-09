import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
//   Link
} from "react-router-dom";
import PagesRegisterUser from "./Register/RegisterUser"
import PagesLeadPanel from "./LeadPanel/LeadPanel"

const Root = () => {
    return(
        <Router>
            <Routes>
                <Route exact path="/" element={<PagesRegisterUser />} />
                <Route path="/control" element={<PagesLeadPanel />} />
            </Routes>
        </Router>
    );
};

export default Root;