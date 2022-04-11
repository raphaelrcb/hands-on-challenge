import React from "react";
import "./Card.css"

const Card = ({data}) => {
    
    return (
        <div className="card-box">
            <header>
                {/* <label>{data.values.leadName}</label> */}
            </header>
            <p>{data.name}</p>
        </div>
    );
};

export default Card;