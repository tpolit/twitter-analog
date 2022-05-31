import React from 'react';

import pdp from '../Images/pdp.png'

const FollowerItem = (props) => {
    
    const{home_to_profil, resultat} = props;
    return (
        <div className="User">            
            <div className="UserGrid">
                <div className="UGProfil">
                    <button 
                        className="boutonUserProfil" 
                        onClick={event => home_to_profil(resultat.id_login_follower,resultat.login_follower, false)}
                    >
                        <img className="displayPDP" src={pdp} alt=""></img>
                    </button>
                </div>
                <div className="UProfilName">@{resultat.login_follower}</div>
            </div>
        </div>
    )
}
export default FollowerItem;