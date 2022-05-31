import React from 'react';
import Logout from '../Enregistrement/Logout';
import ProfilListeMessage from '../Messages/ProfilListeMessage';
import Follow from '../Users/Follow';
import ListeFollowers from '../Users/ListeFollowers';
import ListeFollows from '../Users/ListeFollows';
import home from '../Images/home.png'
import Logo from '../Images/clicada-smol.png'


const ProfilPage = (props) => {

    const{user_id_tv,login_tv,leState,home_to_profil,logout}=props
    return(
        <div className="parentgrid">
            <div className="GLogo">
                    <img className="displayLogoP" src={Logo} alt=""></img>
                </div>
        {/*Bouton Home */}
            <div className="GProfileButton">
                <button className="buttonProfil" onClick={event => home_to_profil(leState.session_id,leState.login,true)}>
                    <img className="displayLogoP" src={home} alt=""></img>
                </button>
            </div>

            {/*Entete*/}
            <div className="GEnteteProfil">
                <div className="EnteteProfil">
                    <p>Profil de {login_tv}</p>
                </div>
            </div>
            {/*Page centre*/}
            <div className="GContent">
                <ProfilListeMessage
                    login_tv={login_tv}
                    user_id={user_id_tv}
                    home_to_profil={home_to_profil}
                    leState={leState}
                />
            </div>

            {/*Display des followers*/}
            <div className="GFollows">
                <ListeFollowers
                    login_tv={login_tv}
                    home_to_profil={home_to_profil}
                    leState={leState}
                />
                <ListeFollows
                    login_tv={login_tv}
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
                <Follow
                    user_id_tv={user_id_tv}
                    login_tv={login_tv}
                    leState={leState}
                />    
            </div>
        </div>
    )

}
export default ProfilPage;