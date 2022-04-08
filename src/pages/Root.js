import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
//   Link
} from "react-router-dom";
import PagesRegisterUser from "./Register/RegisterUser"

const Root = () => {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<PagesRegisterUser />} />
            </Routes>
        </Router>
    );
};

export default Root;