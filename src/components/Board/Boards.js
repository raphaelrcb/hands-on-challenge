import React, {useState, useEffect} from "react";
import List from "components/List/List";
import "./Board.css"

function loadCards(){

    var values = []
    var key = Object.keys(localStorage)
    var i = 0;
    while (i < key.length) {    
        values.push(JSON.parse(localStorage.getItem("lead_"+i)))
        i++;   
    }
    console.log(Object.values(values))    
    return Object.values(values);  
}

function loadLists() {
    const cards = loadCards(); 
     return [
        {title: 'Cliente em Potencial', lead: cards.flat() },
        {title: 'Dados Confirmados', lead: ''}, 
        {title: 'Reunião agendada', lead: ''}
    ];
} 

const lists = loadLists(); 
export default function Board({}) {

    return (
        <div className="board-box">
            {lists.map(list => <List key={list.title} data={list} />)}
        </div>
    );
};

// export default Board;