import React from 'react';
import Logout from '../Enregistrement/Logout';
import ProfilListeMessage from '../Messages/ProfilListeMessage';
import ListeFollowers from '../Users/ListeFollowers';
import ListeFollows from '../Users/ListeFollows';

import home from '../Images/home.png'
import Logo from '../Images/clicada-smol.png'

const SelfProfilPage = (props) => {

    const {home_to_profil, leState, logout} = props;
    return(
        <div className="parentgrid">

                <div className="GLogo">
                    <img className="displayLogoP" src={Logo} alt=""></img>
                </div>
            {/*Bouton Home*/}
            <div className="GProfileButton">
                <button className="buttonProfil" onClick={event => home_to_profil(leState.session_id,leState.login,true)}>
                    <img className="displayLogoP" src={home} alt=""></img>
                </button>
            </div>
            
            {/*Entete*/}
            <div className="GEnteteProfil">
                <div className="EnteteProfil">
                    <p>Bienvenue sur votre profil {leState.login}</p>
                </div>
            </div>
            
            {/*Page Centre*/}
            <div className="GContent">
                <ProfilListeMessage
                    user_id={leState.session_id}
                    home_to_profil={home_to_profil}
                    leState={leState}
                />
            </div>
            
            {/*Display des Followers*/}
            <div className="GFollows">
                <ListeFollowers
                    home_to_profil={home_to_profil}
                    leState={leState}
                />
                <ListeFollows
                    home_to_profil={home_to_profil}
                    leState={leState}
                />
            </div>
            {/*Bouton Logout*/}
            <div  className="GLogout">    
                <Logout 
                    logout={logout}
                    leState={leState}
                />    
            </div>
        </div>
    )
}
export default SelfProfilPage;
