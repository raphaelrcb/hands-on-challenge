import React, {useContext} from "react";
import Card from "components/Card/Card";
import { useDrop } from "react-dnd";
import BoardContext from "components/Board/Context"
import "./List.css"

export default function List( { data, index: listIndex } ){

    const {move} = useContext(BoardContext);
    
    const [, dropRef] = useDrop({
        accept: 'CARD',

        hover(item, monitor){

            const draggedListIndex = item.listIndex;
            const draggedIndex = item.index;
            const targetListIndex = listIndex;

            if(item.status === 'Cliente em Potencial' && data.title === 'Cliente em Potencial'){
                return;
            }
            else if (item.status === 'Dados Confirmados' && (data.title === 'Cliente em Potencial' || data.title === 'Dados Confirmados')){
                return;
            }
            else if (item.status === 'Reunião Agendada') {
                return;
            }
            else if (item.status !== 'Reunião Agendada'){
                move(draggedListIndex, draggedIndex, targetListIndex)
                item.listIndex = targetListIndex;
                if (targetListIndex === 1){
                    item.status = 'Dados Confirmados'
                }
                if (targetListIndex === 2){
                    item.status = 'Reunião Agendada'
                }
            }
            
        }
    }) 

    return (
        <div className="list-box" ref={dropRef}>
            <header>
                <h2>{data.title}</h2>
            </header>
            <ul>
                { data.lead? data.lead.map( (card, index) => <Card
                 key={card.name}
                 index={index}
                 listIndex={listIndex}
                 data={card} />) : "" }
                {/* {data.lead? <Card />:""} */}
            </ul>
        </div>
    );
};