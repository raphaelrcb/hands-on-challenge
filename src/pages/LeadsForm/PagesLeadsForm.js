import React from "react";
// import { useParams } from "react-router-dom";
import LeadsForm from "components/Form/LeadsForm"
// import LeadsPanel from "components/Leads/LeadsPanel"

const PagesLeadsForm = () => {

    // const  { id } = useParams();
    return (
        <div>
            <LeadsForm/>
            {/* {id && <div>id: {id}</div>} */}
        </div>  
    );
};

export default PagesLeadsForm;