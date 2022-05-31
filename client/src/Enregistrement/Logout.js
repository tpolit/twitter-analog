import React from "react";
import axios from 'axios';

class Logout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: ""
        };
    }

    send() {
        const api = axios.create({
            baseURL: '/api/',
            timeout: 1000,
            headers: {'X-Custom-Header': 'foobar'}
        });
        console.log(this.props.leState.session_id);
        api.post('/user/logout/', {
            "user_id": this.props.leState.session_id
        })
        .then(response => {
            this.response_logout(response);
        });
    }

    response_logout(response) {
        if (response.data["status"] === 401) {
            const message = response.date["message"];
            this.setState({status: "error", texterror: message})
        } else {
            this.setState({status: ""});
            console.log("yes");
            this.props.logout();
            console.log("no");
        }
    }

    render() {
        return(
            <nav>
                <div>
                    <button className="Logout" onClick={(event => this.send())}> 
                        Se deconnecter
                    </button>  
                </div>
            </nav>
        )
    }
}
export default Logout;