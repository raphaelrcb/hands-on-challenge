import UIContainer from "components/UI/Container/Container";
import React from "react";
import { useDrag } from "react-dnd";
import "./Card.css"

export default function Card ({data}) {

    const [{ isDragging }, dragRef] = useDrag({
        type: 'CARD', 
        item: {id: data.name, status: data.status},
        collect: monitor => ({
          isDragging: monitor.isDragging(),
        }),
      });
  
    
    return (
        <div>
            <div className="card-box"  ref={dragRef}>
                <header>
                    {/* <label>{data.values.leadName}</label> */}
                </header>
                <p>{data.name}</p>
            </div>
        </div>
    );
};