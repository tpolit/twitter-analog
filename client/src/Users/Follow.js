import React from 'react';
import axios from 'axios';

class Follow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: "",
            texterror: "",
            loading: true,
            followed: null
        }
    }

    /* Recuperation de l'etat de l'amitié */
    sendCheckFollow() {
        const api = axios.create({
            baseURL: '/api/',
            timeout: 1000,
            headers: {'X-Custom-Header': 'foobar'}
        });
        api.post('/user/checkfollow/', {
            "login": this.props.login_tv,
            "login_follower": this.props.leState.login
        }).then(response => {
            this.response_checkfollow(response);
        }).catch(response => {
            console.log(response);
        });
    }

    response_checkfollow(response) {
        if(response.data["status"] !== 200) {
            this.setState({
                status: "error",
                message: response.data["message"]
            });
        } else {
            console.log(response.data.resultat);
            this.setState({
                loading: false,
                follow: response.data.resultat,
                status: ""
            });
        }
    }

    /* Fonctions de changements d'état de l'amitié */
    send_follow() {
        const api = axios.create({
            baseURL: '/api/',
            timeout: 1000,
            headers: {'X-Custom-Header': 'foobar'}
        });
        api.post('/user/follow/', {
            "id_login": this.props.user_id_tv,
            "id_login_follower": this.props.leState.session_id,
            "login": this.props.login_tv,
            "login_follower": this.props.leState.login
        }).then(response => {
            this.response(response);
        }).catch(response => {
            console.log(response);
        });
    }

    send_unfollow() {
        const api = axios.create({
            baseURL: '/api/',
            timeout: 1000,
            headers: {'X-Custom-Header': 'foobar'}
        });
        api.post('/user/unfollow/', {
            "login": this.props.login_tv,
            "login_follower": this.props.leState.login,
        }).then(response => {
            this.response(response);
        }).catch(response => {
            console.log(response);
        });
    }

    response(response) {
        if (response.data["status"] !== 200) {
            const message = response.data["message"];
            this.setState({
                status: "error",
                texterror: message
            })
        } else {
            if (this.state.follow === null || this.state.follow === false){
                this.setState({
                    status: "",
                    follow: true
                })
            } else {
                this.setState({
                    status: "",
                    follow: false
                })
            }
        }
        console.log(this.state.follow);
    }

    render() {
        return (
            <div >
                {/* On recupere l'etat du follow avant tout */}
                {(this.state.loading) ? 
                    this.sendCheckFollow()
                :
                    <></>
                }

                {(!this.state.follow) ?
                    <button className="boutonFollow" onClick={(event => this.send_follow())}>
                        Follow
                    </button>
                :
                    <button className="boutonFollow" onClick={(event => this.send_unfollow())}>
                        Unfollow
                    </button>
                }
            </div>
        )
    }
}
export default Follow;