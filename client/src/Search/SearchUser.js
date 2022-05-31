import React from 'react';
import axios from 'axios';
import UserItem from '../Users/UserItem';

class SearchUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: "",
            texterror: "",
            resultat: []
        };
    }

    send() {
        const api = axios.create({
            baseURL: '/api/',
            timeout: 1000,
            headers: {'X-Custom-Header': 'foobar'}
        });
        api.post('/user/search/', {
            "nom": this.props.recherche
        }).then(response => {
            this.response(response);
        }).catch(response => {
            console.log(response);
        });
    }

    response(response) {
        if (response.data.status !== 200){
            const message = response.data.message;
            this.setState({
                status: "error",
                texterror: message
            });
        } else {
            this.setState({
                recherche: "",
                resultat: response.data.resultat
            });
        }
    }

    render() {
        const{home_to_profil} = this.props;
        return (
            <div>
                <button className="Envoyer" onClick={event => this.send()}>
                    Rechercher
                </button>
                <ol>
                    {this.state.resultat.map(res => (
                        <li className="list"key={res._id}>
                                <UserItem
                                    home_to_profil = {home_to_profil}
                                    resultat = {res}
                                />
                        </li>
                    ))}
                </ol>
            </div>
        )
    }
}
export default SearchUser;