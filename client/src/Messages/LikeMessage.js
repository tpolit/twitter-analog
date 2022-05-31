import React from 'react';
import axios from 'axios';

import heart from '../Images/heart.png'
import Fheart from '../Images/Fheart.png'
class LikeMessage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            status: "",
            texterror: "",
            loading:true
        }
    }

    send_dislike() {
        const api = axios.create({
            baseURL: '/api/',
            timeout: 1000,
            headers: {'X-Custom-Header': 'foobar'}
        });
        api.post('/message/dislike', {
            user_id: this.props.leState.login,
            message_id: this.props.message._id
        }).then(response => {
            this.response_dislike(response);
        }).catch(response => {
            console.log(response);
        });
    }

    send_like() {
        const api = axios.create({
            baseURL: '/api/',
            timeout: 1000,
            headers: {'X-Custom-Header': 'foobar'}
        });
        api.post('/message/like', {
            user_id: this.props.leState.login,
            message_id: this.props.message._id
        }).then(response => {
            this.response_like(response);
        }).catch(response => {
            console.log(response);
        });
    }

    response_like(response) {
        if (response.data["status"] !== 200) {
            const message = response.data["message"];
            this.setState({
                status: "error",
                texterror: message
            });
        } else {
            this.setState({
                status: "",
                like: true
            })
        }
    }
    btnLike(){
        this.send_like();
        this.props.refresh();
    }
    btndLike(){
        this.send_dislike();
        this.props.refresh();
    }
    response_dislike(response) {
        if (response.data["status"] !== 200) {
            const message = response.data["message"];
            this.setState({
                status: "error",
                texterror: message
            });
        } else {
            this.setState({
                status: "",
                like: false
            })
        }
    }
    //Fonction qui gère le bouton pour que le check ne se fasse que quand on clique, ça aide pour la performance
    button(){
        if (this.state.like){
            this.btndLike()
        }
        else{
            this.btnLike()
        }
    }
    checklike(){
        if (this.props.message.likes.includes(this.props.leState.login)){
            this.setState({
                like:true,
            })
        }
        console.log(this.props.message.likes)
        this.setState({
            loading:false
        })
    }

    render() {
        return (
            <>
            {this.state.loading?
            this.checklike():
            <></>
            }
            <div className="GMLikeButton">
            <button className="likeButton" onClick={event=>this.button()}>
                {this.state.like?
                <img className="displayLike" src={Fheart} alt=""></img>:
                <img className="displayLike" src={heart} alt=""></img>
                }
            </button>
            </div>
            <div className="GMCompteur">
                <div className="displayLikeCounter">{this.props.message.likes.length}</div>
            </div>
            
            
            
            </>
        )
    }
}
export default LikeMessage;