import React from 'react';
import logoImg from "../../logo.jpg";
import { Link } from 'react-router-dom';
import Board from 'components/Board/Boards';
import "./LeadsPanel.css"

const LeadsPanel = () => {
    
    // const [newLead, setNewLead] = useState([])
    // function getNewLead () {
    //     setNewLead(JSON.parse(localStorage.getItem("new_lead")))
    //     return newLead
    // }


    return(
        <div>
            <div className='header-box'>
                <header className='leads-header'>
                    <img src= {logoImg} className='leads-img-header' alt="Elogroup logo" />
                    <h1> Lead Panel </h1>
                    <Link to="/newlead" className='new-lead-link'> New Lead (+) </Link>
                </header>
            </div>
            <main>
                <div>
                    <Board />
                </div>
            </main>
        </div>
        
    )

}

export default LeadsPanel;