import React from 'react';
import UseState from 'react';
import { useResolvedPath } from 'react-router-dom';
import loginImg from "../../logo.jpg";
import './Register.css'

const initialState = {
    username: '',
    password: '',
    confirm: '',

    usernameError: '',
    passwordError: '',
    confirmError: '',    
}

class RegisterBox extends React.Component {

    constructor(props){
        super(props);

        this.state = initialState

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event){
        event.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            console.log(this.state)
            this.setState(initialState);
        }
    }    

    validate() {

        let usernameError = "";
        let passwordError = "";
        let confirmError = "";  

        var alphaNumeric = /^[a-zA-Z]+$/;


        let specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        // const numberChars = 0123456789;

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

        if(this.state.password != this.state.confirm){
            confirmError = "Password does not match"
        }

        if(usernameError || passwordError || confirmError){
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
                        <img src= {loginImg} />
                    </div>
                    <div className='register-box'>

                        <div className='input-group'>
                            <label htmlFor='username'>Username</label>
                            <input
                                type = 'text'
                                name = 'username'
                                className='register-input'
                                placeholder='Username' 
                                value={this.state.username}
                                onChange={this.handleChange}/>
                        </div>
                        <div className='register-error-msg'>{this.state.usernameError}</div>

                        <div className='input-group'>
                            <label htmlFor='password'>Password</label>
                            <input
                                type = 'password'
                                name = 'password'
                                className='register-input'
                                placeholder='********'
                                value={this.state.password}
                                onChange={this.handleChange}/>
                        </div>
                        <div className='register-error-msg'>{this.state.passwordError}</div>

                        <div className='input-group'>
                            <label htmlFor='password'>Confirm Password</label>
                            <input
                                type = 'password'
                                name = 'confirm'
                                className='register-input'
                                placeholder='********'
                                value={this.state.confirm}
                                onChange={this.handleChange}/>
                        </div>
                        <div className='register-error-msg'>{this.state.confirmError}</div>

                        <button
                            type='button'
                            className='register-button'
                            onClick={this.handleSubmit}> Registrar
                        </button>


                    </div>
                </div>
            </div>

        )
    }
    
}

export default RegisterBox;