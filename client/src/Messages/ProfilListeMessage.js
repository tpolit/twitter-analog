import axios from 'axios';
import React from 'react';
import MessageItem from "./MessageItem";

class ProfilListeMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resultat: [],
            status: "",
            texterror: "",
            loading: true,
            user_id_page:null
        };
        this.refresh=this.refresh.bind(this);
    }
    refresh = () => {
        this.send();
        
    }

    send() {
        const api = axios.create({
            baseURL: '/api/',
            timeout: 1000,
            headers: {'X-Custom-Header': 'foobar'}
        });
        console.log(this.props.user_id)
        api.post('/message/search/user_id', {
            "user_id": this.props.user_id,
        }).then(response => {
            this.response_listMessage(response);
        }).catch(response => {
            console.log(response);
        });
    }

    response_listMessage(response) {
        if (response.data["status"] !== 200){
            const message = response.data["message"];
            this.setState({
                status: "error",
                texterror: message
            })
        } else {
            console.log("response profil liste message : "+response.data.resultat);
            this.setState({
                resultat: response.data.resultat,
                status:"",
                loading: false,
                user_id_page:this.props.user_id
            });
        }
        
        console.log(this.state.resultat)
    }
    
    render() {
        const{login_tv,home_to_profil, leState} = this.props;
        return (
            <div className="ListeMessage">
                {(this.state.loading || this.state.user_id_page!==this.props.user_id) ?
                    this.send()
                :
                    <></>
                }
                {!(leState.page ==="profil_user") ? 
                    <b>
                        Vos messages, {leState.login}
                    </b> 
                    : 
                    <b>
                        Liste des messages de {login_tv}
                    </b>
                    }
                <ol>
                    {this.state.resultat.map(res => (
                        <li className="list" key={res._id}>
                            <MessageItem
                                home_to_profil = {home_to_profil}
                                leState = {leState} 
                                resultat = {res}
                                refresh={this.refresh}
                            />
                        </li>
                    ))}
                </ol>
            </div>
        )
    }
}
export default ProfilListeMessage;