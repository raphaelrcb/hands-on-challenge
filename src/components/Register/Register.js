import React from 'react';
import loginImg from "../../logo.jpg";
import './Register.css'
import { withRouter } from "./withRouter";

const initialState = { //inicialzando os estados da aplicação
    username: '',
    password: '',
    confirm: '',

    usernameError: '',
    passwordError: '',
    confirmError: '',    
}

class RegisterBox extends React.Component { //classe vai ter todo o funcionamento do registro

    constructor(props){//construtor da classe
        super(props);

        this.state = initialState

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    

    handleChange(event) {//salva o estado da entrada enquanto é alterada
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event){//quando se pressiona o botão, deve-se validar se os dados inseridos estão corretos, guardar os dados de login no local storage e navegar para a próxima página
        event.preventDefault();
        const isValid = this.validate();//chama o método de validação

        if (isValid) {//se for válido, cria uma nova chave no local storage e armazena o nome e a senha
            var keys = Object.keys(localStorage)
            var i = 0
            var count_key = 0 
            while (i < keys.length) {//loop para procurar quantos users já existem para poder salvar o próximo
                if ( keys.indexOf("user_"+i) > -1 ){
                    count_key++;
                }
                i++;
            }
            localStorage.setItem("user_"+count_key, JSON.stringify({user: this.state.username, password: this.state.password}))
            this.setState(initialState);
            this.props.navigate('/control')
        }
    }    

    validate() {

        let usernameError = "";
        let passwordError = "";
        let confirmError = "";  

        let specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

        if(!this.state.username){
            usernameError = "This field is required"
        }
        else if(!this.state.password){
            passwordError = "This field is required"
        }
        else if(!this.state.confirm){
            confirmError = "This field is required"
        }

        if (this.state.password.length < 8){
            passwordError = "Password must contain at least 8 characters"
        }
        else if (!specialChars.test(this.state.password)){
            passwordError = "Password must contain at least one special character"
        }
        else if (!/\d/.test(this.state.password) || !/[a-zA-Z]/.test(this.state.password)){
            passwordError = "Password must contain at least one number and one letter"
        }

        if(this.state.password !== this.state.confirm){
            confirmError = "Password does not match"
        }

        if(usernameError || passwordError || confirmError){//se alguma das condições definiu um erro, retorna false e define os erros com setState
            this.setState({usernameError, passwordError, confirmError});
            return false;
        }
        return true;
    }

    render () {
        return (
            <div>
                <div className='inner-container'>
                    <div className='register-header'>
                        Register
                    </div>
                    <div className='register-image'>
                        <img src= {loginImg} alt="Elogroup logo" />
                    </div>
                    <div className='register-box'>

                        <div className='input-group'>
                            <label htmlFor='username'>Username*</label>
                            <input
                                required
                                type = 'text'
                                name = 'username'
                                id = 'username'
                                className='register-input'
                                placeholder='Username' 
                                value={this.state.username}
                                onChange={this.handleChange}/>
                        </div>
                        <div className='register-error-msg'>{this.state.usernameError}</div>

                        <div className='input-group'>
                            <label htmlFor='password'>Password*</label>
                            <input
                                required
                                type = 'password'
                                id = 'password'
                                name = 'password'
                                className='register-input'
                                placeholder='********'
                                value={this.state.password}
                                onChange={this.handleChange}/>
                        </div>
                        <div className='register-error-msg'>{this.state.passwordError}</div>

                        <div className='input-group'>
                            <label htmlFor='password'>Confirm Password*</label>
                            <input
                                required
                                type = 'password'
                                name = 'confirm'
                                id = 'confirm'
                                className='register-input'
                                placeholder='********'
                                value={this.state.confirm}
                                onChange={this.handleChange}/>
                        </div>
                        <div className='register-error-msg'>{this.state.confirmError}</div>

                        <button
                            type='submit'
                            className='register-button'
                            onClick={this.handleSubmit}> Register
                        </button>


                    </div>
                </div>
            </div>

        )
    }
    
}

export default withRouter(RegisterBox);