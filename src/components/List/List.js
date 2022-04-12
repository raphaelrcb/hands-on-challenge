import React, {useContext} from "react";
import Card from "components/Card/Card";
import { useDrop } from "react-dnd";
import BoardContext from "components/Board/Context"
import "./List.css"

export default function List( { data, index: listIndex } ){

    const {move} = useContext(BoardContext);
    
    const [, dropRef] = useDrop({//função para soltar o card
        accept: 'CARD',

        hover(item, monitor){

            const draggedListIndex = item.listIndex;
            const draggedIndex = item.index;
            const targetListIndex = listIndex;
            //condições de movimento do card
            if(item.status === 'Cliente em Potencial' && (data.title === 'Cliente em Potencial' || data.title === 'Reunião Agendada') ){
                return;
            }
            else if (item.status === 'Dados Confirmados' && (data.title === 'Cliente em Potencial' || data.title === 'Dados Confirmados')){
                return;
            }
            else if (item.status === 'Reunião Agendada') {
                return;
            }
            else if (item.status !== 'Reunião Agendada'){//chama a função de movimento, passando os índices necessários do card movido e das listas de origem e destino
                move(draggedListIndex, draggedIndex, targetListIndex)
                item.listIndex = targetListIndex;
                item.index = 0;
                if (targetListIndex === 1){//troca o status do item do card
                    item.status = 'Dados Confirmados'
                }
                if (targetListIndex === 2){
                    item.status = 'Reunião Agendada'
                }
            }
            
        }
    }) 

    return (
        //O board vai mostrar uma lista de posições para os cards, que são mapeados a partir das leads existentes em DATA
        //Em seguida uma lista de cards é mapeado na posição em que se encontra no board
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
            </ul>
        </div>
    );
};