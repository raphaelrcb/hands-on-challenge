import React from "react";
import { useDrag } from "react-dnd";
import "./Card.css"

export default function Card ({data, index, listIndex}) {

    const [{ isDragging }, dragRef] = useDrag({//define um item arrastável
        type: 'CARD', 
        item: {id: data.name, status: data.status, index, listIndex},
        collect: monitor => ({
          isDragging: monitor.isDragging(),
        }),
      });
  
    
    return (
        //cria o card com as informações recebidas
        <div>
            <div className="card-box"  ref={dragRef}>
                <header>
                    <label>{data.name}</label>
                </header>
                <p>{data.email}, {data.phone}</p>
            </div>
        </div>
    );
};