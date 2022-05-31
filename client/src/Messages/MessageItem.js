import React from 'react';
import LikeMessage from './LikeMessage';

import pdp from '../Images/pdp.png'

const MessageItem = (props) => {

    const{home_to_profil, leState, resultat,refresh} = props;
    
    return (
        <div className="Message">
            <div className="MessageGrid">
                <div className="GMUserProfil">
                    <button className="boutonUserProfil" onClick={event => home_to_profil(resultat.id_auteur,resultat.login_auteur,false)}>
                        <img className="displayPDP" src={pdp} alt=""></img>
                    </button>
                </div>
                <div className="GMLogin">
                    <div className="ProfilName">@{resultat.login_auteur}</div>
                </div>
                <div className="GMText">
                    <div className="displayMessage">{resultat.message}</div>
                </div>
                
                    <LikeMessage
                        leState = {leState}
                        message = {resultat}
                        refresh={refresh}
                    />
            </div>
        </div>
    )
}
export default MessageItem;