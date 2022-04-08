import React from 'react';
import UseState from 'react';

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

    handleSubmit(){
        console.log(this.state)
    }    

    render () {
        return (
            <div>
                <div className='inner-container'>
                    <div className='register-header'>
                        <h1>Register</h1>
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