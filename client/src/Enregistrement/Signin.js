import React from "react";
import axios from "axios";

class Signin extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            password: "",
            firstname: "",
            lastname: "",
            status: ""
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
        api.put('/user/', {
            "login": this.state.login,
            "password": this.state.password,
            "firstname": this.state.firstname,
            "lastname": this.state.lastname
        }).then(response => {
            this.response_signin(response);
        }).catch(error => {
            this.response_signin(error.response);
        })
    }

    response_signin(response) {
        if (response.data["status"] !== 201) {
            const message = response.data.message;
            this.setState({status: "error", texterror: message})
        } else {
            this.setState({status: ""})
            this.props.signin(response.data["session_id"]);
        }
    }

    render() {
        const{onClick} = this.props;
        return(
            <nav>
                <div>
                    <div className="CenterBlock">
                        <div>
                            <label><b>Firstname</b></label>
                            <input 
                                type="text" 
                                name="firstname" 
                                placeholder="Firstname" 
                                onChange={this.handleChange}
                                value={this.state.firstname}
                                required
                            />

                            <label><b>Lastname</b></label>
                            <input 
                                type="text" 
                                name="lastname" 
                                placeholder="Lastname" 
                                onChange={this.handleChange}
                                value={this.state.lastname}
                                required
                            />
            
                            <label><b>Login</b></label>
                            <input 
                                type="text" 
                                name="login" 
                                placeholder="Login" 
                                onChange={this.handleChange}
                                value={this.state.login}
                                required
                            />

                            <label><b>Password</b></label>
                            <input 
                                type="password" 
                                name="password"
                                placeholder="Mot de passe"  
                                onChange={this.handleChange}
                                value={this.state.password}
                                required
                            />
                        </div>
                        <div key={this.state.status}>
                            {(this.state.status === "error")? 
                                <span style={{color:"red"}}>{this.state.texterror}</span>
                            : 
                                <span></span>
                            }
                            <button className="Confirm" onClick={(event => this.send())}>
                                Enregistrer
                            </button>
                            <button className="swap" onClick = {onClick}>
                                Deja un compte ?
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}
export default Signin