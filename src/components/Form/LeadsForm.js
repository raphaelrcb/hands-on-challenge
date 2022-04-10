import React, { useState, useEffect } from "react";
import logoImg from "logo.jpg"
import Checkbox from "./Checkbox";
import { CheckList } from "./CheckList";
import {useNavigate} from 'react-router-dom'
import "./LeadsForm.css"

const initialValue = {
    leadName: '',
    leadPhone: '',
    leadEmail: '',
}
const initialError = {
    error: ''
}



const LeadsForm = () => {

    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);
    const [list, setList] = useState([]);
    
    const [error, setError] = useState(initialError)
    const [values, setValues] = useState(initialValue)
    
    const navigate = useNavigate();
    
    // lidando com os checkboxes
    useEffect(() => {
        setList(CheckList);
      }, [list]);

      const handleSelectAll = e => {
        setIsCheckAll(!isCheckAll);
        setIsCheck(list.map(li => li.id));
        if (isCheckAll) {
          setIsCheck([]);
        }
      };    

      const handleClick = e => {
        const { id, checked } = e.target;
        setIsCheck([...isCheck, id]);
        if (!checked) {
          setIsCheck(isCheck.filter(item => item !== id));
        }
      };

    //   console.log(isCheck);

      const checkboxList = list.map(({id, name}) => {
          //função para embutir a lista de checkbox junto dos elementos da tabela, que serão chamados para cada item da lista, gerando uma linha na tabela para cada item na lista
          return (
              <tr key={id}>
                  <th>
                    <Checkbox
                    key={id}
                    type="checkbox"
                    name={name}
                    id={id}
                    handleClick={handleClick}
                    isChecked={isCheck.includes(id)}
                    />
                </th>
                    <th>
                        <label htmlFor={id}>{name}</label>
                    </th>
              </tr>
              
          )
      });

    //funções para lidar com as outras entradas do formulários
    function onChange(e) {
        //escrevendo algo no formulário, atualizar os valores dos estados
        const { name , value } = e.target;
        setValues({ ...values, [name]: value});
    }

    function onSubmit(e) {
        e.preventDefault();
        var isValid = validate();
        if(isValid){
            setError(initialError)
            console.log(values, isCheck, isCheck.length, error)  
            alert("Lead saved succesfully") 
            // var test = JSON.stringify(values)// JSON.stringify(isCheck.toString())
            // console.log(test)
            // localStorage.setItem("lead-name", values.leadName)
            // localStorage.setItem("info", values)
            // navigate('/control')  
        }
    }

    function validate() {
        if(isCheck.length < 1){
            let error = "*a required field is empty*"
            setError({error})
            return false;
        }
        return true;
    }
    return (
        <div>
            <header className='forms-header'>
                <div className="forms-header-box">
                    <img src= {logoImg} className='forms-img-header' alt="Elogroup logo"/>
                    <h1> New Lead </h1>
                </div>
            </header>
            <div className="body-box">
                <form onSubmit={onSubmit}>
                    <div className="leads-form-column">
                        <label htmlFor="name">Name*</label>
                        <input 
                            required
                            id="name"
                            name="leadName"
                            type="text"
                            className="name-input"
                            onChange={onChange} />
                    </div>
                    <div className="leads-form-column">
                        <label htmlFor="phone">Phone*</label>
                        <input 
                            required
                            id="phone"
                            name="leadPhone"
                            type="text"
                            className="phone-input"
                            onChange={onChange} />
                    </div>
                    <div className="leads-form-column">
                        <label htmlFor="email">E-mail*</label>
                        <input 
                            required
                            id="email"
                            name="leadEmail"
                            type="text"
                            className="email-input"
                            onChange={onChange} />
                    </div>                   
                    <div className="checkbox-table">
                        <label>  Oportunities*  </label> 
                        <table>
                            <thead>
                                <tr>
                                    <th> <Checkbox id="all" name = "all" type="checkbox" handleClick={handleSelectAll} isChecked={isCheckAll} /> </th>
                                    <th> <label htmlFor="all">All Options</label> </th>
                                </tr>
                            </thead>
                            <tbody>
                                {checkboxList}                                  
                            </tbody>
                        </table>
                    </div>
                    <div className="checkbox-error">{error.error}</div>

                    <button
                            type='submit'
                            className='save-button'> SAVE
                    </button>

                </form>
            </div>
        </div>
    )
}

export default LeadsForm;