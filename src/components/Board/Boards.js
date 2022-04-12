import React, {useState} from "react";
import List from "components/List/List";
import BoardContext from "./Context.js"
import "./Board.css"

function loadCards(){

    var values = []
    var key = Object.keys(localStorage)
    var i = 0;
    while (i < key.length) {    
        values.push(JSON.parse(localStorage.getItem("lead_"+i)))
        i++;   
    }
    // console.log(Object.values(values))    
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

    function move(from, to) {
        console.log(from, to)
    } 

    return (
        //O provider fornce o valor para o contexto e todos os elementos dentro do boardcontext vão poder acessar as informações
        //toda vez que a variável lists mudar, tbm muda o valor do contexto, e todos os lugares que estão usando o contexto vão se atualizar
        <BoardContext.Provider value = {{lists, move}}>   
            <div className="board-box">
                {lists.map(list => <List key={list.title} data={list} />)}
            </div>
        </BoardContext.Provider>
    );
};

// export default Board;