import React from "react";
//elemento com a checkbox que será repetido na tabela
const Checkbox = ({ id, type, name, handleClick, isChecked }) => {

    return (
        <input
        id = {id}
        name = {name}
        type = {type}
        onChange={handleClick}
        checked={isChecked}
        />
    );
};

export default Checkbox;