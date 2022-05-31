import React from 'react';
import axios from 'axios';
import MessageItem from './MessageItem';

class Homepage_ListeMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: "",
            texterror: "",
            resultat: [],
            loading: true
        }
    }

    refresh = () => {
        this.send_follows();
    }

    send_follows() {
        const api = axios.create({
            baseURL: '/api/',
            timeout: 1000,
            headers: {'X-Custom-Header': 'foobar'}
        });
        api.post('/user/follows', {
            "login_follower": this.props.leState.login,
        }).then(response => {
            this.send_listeMessages(response);
        }).catch(response => {
            console.log(response);
        });
    }

    send_listeMessages(response) {
        if (response.data.status !== 200) {
            this.setState({
                status: "error",
                texterror: response.data.message
            });
        } else {
            const idS_auteur = [this.props.leState.session_id];
            for(var i = 0; i < response.data.resultat.length; i++) {
                let follow = response.data.resultat[i];
                idS_auteur.push(follow.id_login);
            }
            const api = axios.create({
                baseURL: '/api/',
                timeout: 1000,
                headers: {'X-Custom-Header': 'foobar'}
            });
            api.post('/message/followsMessages', {
                "idS_auteur": idS_auteur,
            }).then(response => {
                this.response(response);
            }).catch(response => {
                console.log(response);
            });
        }
    }

    response(response) {
        if (response.data.status !== 200) {
            this.setState({
                status: "error",
                texterror: response.data.message
            });
        } else {
            this.setState({
                status: "",
                resultat: response.data.resultat,
                loading: false
            });
        }
        console.log(this.state.resultat);
    }

    render() {
        const{home_to_profil, leState} = this.props;
        return (
            <div className="ListeMessage">
                {(this.state.loading) ?
                    this.send_follows()
                :
                    <></>
                }
                <b>Fil d'actualité</b>
                {(this.state.resultat !== []) ?
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
                :
                    <b>Pas de Messages</b>
                }
            </div>
        )
    }

}
export default Homepage_ListeMessage;