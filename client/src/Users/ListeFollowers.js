import axios from 'axios';
import React from 'react';
import FollowerItem from './FollowerItem';

import refresh from '../Images/refresh.png'
class ListeFollowers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resultat: [],
            status: "",
            texterror: "",
            loading: true
        };
    }

    send() {
        const api = axios.create({
            baseURL: '/api/',
            timeout: 1000,
            headers: {'X-Custom-Header': 'foobar'}
        });
        if (this.props.leState.page === "profil_user"){
            api.post('user/followers', {
                "login": this.props.login_tv,
            }).then(response => {
                this.response(response);
            }).catch(response => {
                console.log(response);
            });
        } else {
            api.post('user/followers', {
                "login": this.props.leState.login,
            }).then(response => {
                this.response(response);
            }).catch(response => {
                console.log(response);
            });
        }
    }

    response(response) {
        if (response.data["status"] !== 200) {
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

    refresh(){
        this.send();
    }
    
    render() {
        const{login_tv, home_to_profil, leState} = this.props;
        return (
            <nav>
                <div className="Followers_block">
                    {(this.state.loading) ?     
                        this.send()
                    :
                        <></>
                    }
                    {!(leState.page ==="profil_user") ? 
                    <b>
                        Liste des followers de {leState.login}
                    </b> 
                    : 
                    <b>
                        Liste des followers de {login_tv}
                    </b>
                    }
                    <button className="refresh" onClick={event => this.refresh()}>
                        <img className="displayRefresh" src={refresh} alt=""></img>
                    </button>
                    <ol>
                        {this.state.resultat.map(res => (
                            <li className="list" key={res.id_login_follower}>
                                <FollowerItem
                                    home_to_profil = {home_to_profil}
                                    resultat = {res}
                                />
                            </li>
                        ))}
                    </ol>
                </div>
            </nav>
        )
    }
}
export default ListeFollowers;