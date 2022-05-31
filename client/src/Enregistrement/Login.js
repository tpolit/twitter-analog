import React from 'react';
import axios from 'axios';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            login : "",
            password: "",
            status: "",
            texterror: ""
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event = {}) {
        const name = event.target && event.target.name;
        const value = event.target && event.target.value;
        this.setState({[name]:value});
    }

    send() {
        const api = axios.create({
            baseURL: '/api/',
            timeout: 1000,
            headers: {'X-Custom-Header': 'foobar'}
        });
        api.post('/user/login/', {
            "login": this.state.login,
            "password": this.state.password,
        }).then(response => {
            console.log(response.data);
            this.response_login(response);
        }).catch(error => {
            this.response_login(error.response);
        })
    }

    response_login(response) {
        console.log(response.data.message);
        if (response.data.status !== 200){
            const message = response.data["message"];
            console.log("message"+message);
            this.setState({status: "error", texterror: message})
        } else {
            this.setState({status:""});
            this.props.login(response.data);
        }
    }
    
    render() {
        const{onClick} = this.props;
        return (
            <nav>
                <div>
                    <div className="CenterBlock">
                        <div>
                            <label><b>Login</b></label>
                            <input 
                                type="text" 
                                placeholder="Login" 
                                name="login" 
                                onChange={this.handleChange}
                                value={this.state.login}
                                required/>

                            <label><b>Password</b></label>
                            <input 
                                type="password" 
                                placeholder="Mot de passe" 
                                name="password" 
                                onChange={this.handleChange}
                                value={this.state.password}
                                required/>
                        </div>
                        <div key={this.state.status}>
                            {(this.state.status === "error") ? 
                                <span style={{color:"red"}}>{this.state.texterror}</span>
                            : 
                                <span></span>
                            }
                            <button className="Confirm" onClick={(event => this.send())}>
                                Log In
                            </button>
                            
                            <button className="swap" onClick={onClick}> 
                                Créer un compte
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}
export default Login;