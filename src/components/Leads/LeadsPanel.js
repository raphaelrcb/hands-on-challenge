import React from 'react';
import logoImg from "../../logo.jpg";
import { Link } from 'react-router-dom';
import Board from 'components/Board/Boards';
import "./LeadsPanel.css"

const LeadsPanel = () => {//Header com um botão para o formulário de leads e chama o board que vai ser onde os cards serão mostrados
    
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