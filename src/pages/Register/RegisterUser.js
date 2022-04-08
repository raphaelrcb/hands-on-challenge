import React from "react";
import RegisterBox from "components/Register/Register";

const PagesRegisterUser = () => {
    return (
        <div
          style = {{
              maxWidth: 800,
              margin: '30px auto',
          }}>
            <RegisterBox />
        </div>
        
    );
};

export default PagesRegisterUser;