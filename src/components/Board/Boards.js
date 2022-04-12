import React, {useState} from "react";
import List from "components/List/List";
import BoardContext from "./Context.js"
import produce from "immer"
import "./Board.css"

function loadCards(prefix){
    var values = []
    var keys = Object.keys(localStorage)
    var i = 0; 
    var count_key = 0
    var key_list_2 = []

    while (i < keys.length) {  //conta quantos leads de cada categoria existem
        if (keys[i].includes(prefix)){
            key_list_2.push(keys[i])
        } 
        i++;   
    }  
    i = 0;
    while (i < key_list_2.length){//passa os leads para values que virarão cards
        values.push(JSON.parse(localStorage.getItem(key_list_2[i])))
        i++;
    }
    return Object.values(values);  
}

function loadLists() {
    const newCard = loadCards("new_"); 
    const confirmCard = loadCards("confirm_");
    const doneCard = loadCards("done_");
     return [
        {title: 'Cliente em Potencial', lead: newCard.flat() },
        {title: 'Dados Confirmados', lead: confirmCard.flat()}, 
        {title: 'Reunião Agendada', lead: doneCard.flat()}
    ];
} 


export default function Board() {
    const listData = loadLists(); 
    const [lists, setLists] = useState(listData);
    
    function move(fromList, from, toList) {
        setLists(produce(loadLists(), draft => {
            const dragged = draft[fromList].lead[from]
            var value = JSON.stringify(dragged)
            var keylist = Object.keys(localStorage)
            var key = [];
            var i = 0;
            while (i < keylist.length) {
                if((localStorage.getItem(keylist[i]).includes(value))){
                    key = keylist[i]
                } 
                i++ 
            }
            var newKey = []
            var temp = []
            if(draft[fromList].lead !== '' && fromList != toList){//se a lista de origem não estiver vazia, remove elemento e se o destino for diferente da origem
                    if (fromList === 0 && toList === 1){
                        newKey = key.replace('new_','confirm_')
                        value = value.replace('Cliente em Potencial', 'Dados Confirmados');
                    } 
                    else if (fromList === 0 && toList === 2){
                        newKey = key.replace('new_','done_')
                        value = value.replace('Cliente em Potencial', 'Reunião Agendada');
                    } 
                    else if (fromList === 1 && toList === 2){
                        newKey = key.replace('confirm_','done_')
                        value = value.replace('Dados Confirmados', 'Reunião Agendada');
                    }
                    console.log(temp)
                    localStorage.setItem(newKey, value)
                    if(!key.includes("done")){localStorage.removeItem(key)}
                    draft[fromList].lead.splice(from, 1)
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