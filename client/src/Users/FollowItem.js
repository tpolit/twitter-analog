import React from 'react';
import pdp from '../Images/pdp.png'

const FollowItem = (props) => {
    
    const{home_to_profil, resultat} = props;
    return (
        <div className="User">            
            <div className="UserGrid">
                <div className="UGProfil">
                    <button 
                        className="boutonUserProfil" 
                        onClick={event => home_to_profil(resultat.id_login,resultat.login, false)}
                    >
                        <img className="displayPDP" src={pdp} alt=""></img>
                    </button>
                </div>
                <div className="UProfilName">@{resultat.login}</div>
            </div>
        </div>
    )
}
export default FollowItem;