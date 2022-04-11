import React from "react";
import Card from "components/Card/Card";
import "./List.css"

export default function List( { data } ){
    return (
        <div className="list-box">
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

// export default List;   