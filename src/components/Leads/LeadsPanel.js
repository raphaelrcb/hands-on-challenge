import React from 'react';
import logoImg from "../../logo.jpg";
import { Link } from 'react-router-dom';
import "./LeadsPanel.css"

const LeadsPanel = () => {

    return(
        <div className='header-box'>
            <header className='leads-header'>
                <img src= {logoImg} className='leads-img-header' alt="Elogroup logo" />
                <h1> Lead Panel </h1>
                <Link to="/newlead" className='new-lead-link'> New Lead (+) </Link>
            </header>
        </div>
    )

}

export default LeadsPanel;