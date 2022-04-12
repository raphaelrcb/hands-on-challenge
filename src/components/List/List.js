import React, {useContext} from "react";
import Card from "components/Card/Card";
import { useDrop } from "react-dnd";
import BoardContext from "components/Board/Context"
import "./List.css"

export default function List( { data } ){

    const {move} = useContext(BoardContext);
    
    const [, dropRef] = useDrop({
        accept: 'CARD',
        hover(item, monitor){
            if(item.status === 'Cliente em Potencial' && data.title === 'Cliente em Potencial'){
                return;
            }
            else if (item.status === 'Dados Confirmados' && (data.title === 'Cliente em Potencial' || data.title === 'Dados Confirmados')){
                return;
            }
            else if (item.status === 'Reunião Agendada') {
                return;
            }
            else {
                move(item.status, data.title)
            }
            // console.log(item.status, data.title);
            
        }
    }) 

    return (
        <div className="list-box" ref={dropRef}>
            <header>
                <h2>{data.title}</h2>
            </header>
            <ul>
                { data.lead? data.lead.map( card => <Card key={card.name} data={card} />) : "" }
                {/* {data.lead? <Card />:""} */}
            </ul>
        </div>
    );
};