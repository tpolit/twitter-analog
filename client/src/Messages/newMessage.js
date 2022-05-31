import React from 'react';
import axios from 'axios';

class newMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
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
        api.put('/message/post/', {
            "id_auteur": this.props.leState.session_id,
            "login_auteur": this.props.leState.login,
            "message": this.state.message
        }).then(response => {
            this.response_newMessage(response);
        }).catch(response => {
            console.log(response);
        });
    }

    response_newMessage(response) {
        if (response.data["status"] !== 200){
            const message = response.data["message"];
            console.log("message"+message);
            this.setState({
                status: "error",
                texterror: message
            })
        } else {
            this.setState({
                message: "",
                status:""
            });
        }
    }

    render() {
        return(
                <div className="newMessages">
                        <label><b>Exprimez-vous</b></label>
                        <input className="MessageInput"
                            type="text"
                            placeholder="Ecrivez votre message..."
                            name="message"
                            onChange={this.handleChange}
                            value={this.state.message}
                            required
                        />
                    <div key={this.state.status}>
                        {(this.state.status === "error") ? 
                            <span style={{color:"red"}}>{this.state.texterror}</span>
                        : 
                            <span></span>
                        }
                        <button className="Envoyer" onClick={(event => this.send())}>
                            Envoyer
                        </button>
                    </div>
                </div>
        )
    }
}
export default newMessage;