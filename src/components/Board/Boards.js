import React, {useState} from "react";
import List from "components/List/List";
import BoardContext from "./Context.js"
import produce from "immer"
import "./Board.css"

function loadCards(){

    var values = []
    var key = Object.keys(localStorage)
    var i = 0;
    while (i < key.length) {    
        values.push(JSON.parse(localStorage.getItem("lead_"+i)))
        i++;   
    }
    return Object.values(values);  
}

function loadLists() {
    const cards = loadCards(); 
     return [
        {title: 'Cliente em Potencial', lead: cards.flat() },
        {title: 'Dados Confirmados', lead: ''}, 
        {title: 'Reunião Agendada', lead: ''}
    ];
} 

const listData = loadLists(); 
export default function Board() {
    
    const [lists, setLists] = useState(listData);
    console.log(lists) 

    function move(fromList, from, toList) {
        setLists(produce(lists, draft => {
            const dragged = draft[fromList].lead[from]
            if(draft[fromList].lead != ''){//se a lista de origem não estiver vazia, remove elemento
                draft[fromList].lead.splice(from, 1)
            }
            if (draft[toList].lead == ''){//se a lista de destino esvtiver vazia, o elemento é o primeiro e único item do array
                draft[toList].lead = [dragged]
            }
            else {//se a lista do destino não estiver vazia, simplesmete adiciona o elemento na primeira posição
                draft[toList].lead.splice(0, 0, dragged)
            }
        }))
    } 

    return (
        //O provider fornece o valor para o contexto e todos os elementos dentro do boardcontext vão poder acessar as informações
        //toda vez que a variável lists mudar, tbm muda o valor do contexto, e todos os lugares que estão usando o contexto vão se atualizar
        <BoardContext.Provider value = {{lists, move}}>   
            <div className="board-box">
                {lists.map((list, index) => <List key={list.title} index={index} data={list} />)}
            </div>
        </BoardContext.Provider>
    );
};