import React, { useState, useEffect } from "react";
import logoImg from "logo.jpg"
import Checkbox from "./Checkbox";
import { CheckList } from "./CheckList";
import {useNavigate} from 'react-router-dom'
import "./LeadsForm.css"

const initialValue = {
    id: '',
    leadName: '',
    leadPhone: '',
    leadEmail: '',
    leadStatus: 'Cliente em Potencial',
    service: ''
}
const initialError = {
    error: ''
}


const LeadsForm = () => {

    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);
    const [list, setList] = useState([]);
    
    const [error, setError] = useState(initialError)
    const [leads, setLeads] = useState(initialValue)
    
    const navigate = useNavigate();//Hooks para navegação após submit
    
    // lidando com os checkboxes
    useEffect(() => {//define o valor de checklist em list
        setList(CheckList);
      }, [list]);

      const handleSelectAll = e => {//lida com a opção de selecionar ou desselecionar todos os checkbox
        setIsCheckAll(!isCheckAll);
        setIsCheck(list.map(li => li.id));
        if (isCheckAll) {
          setIsCheck([]);
        }
      };    

      const handleClick = e => { // marca um checkbox no clique
        const { id, checked } = e.target;
        setIsCheck([...isCheck, id]);
        if (!checked) {
          setIsCheck(isCheck.filter(item => item !== id));
        }
      };

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
        setLeads({ ...leads, [name]: value});
    }

    function onSubmit(e) {
        e.preventDefault();
        var isValid = validate();//antes de submeter, faz a validação
        if(isValid){
            var keys = Object.keys(localStorage)
            var i = 0
            var count_key = 0;

            const services = isCheck.join()
            leads.service = services
            const toStorage = [{name: leads.leadName, 
                                status: leads.leadStatus,
                                email: leads.leadEmail,
                                phone: leads.leadPhone,
                                services: leads.service}]
            let error = ""
            setError({error})
            localStorage.setItem("new_"+ keys.length, JSON.stringify(toStorage))//nova entrada sempre com um número maior para evitar conflitos repetição de nomes
            alert("Lead saved succesfully") 
            navigate('/control')//navega de volta

        }
    }

    function validate() {
        if(isCheck.length < 1){//vê se pelo menos 1 dos checkboxes está marcado
                                //validação de outros campos vazios feitos pelo required do prórpio html
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