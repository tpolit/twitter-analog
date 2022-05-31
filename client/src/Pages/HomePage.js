import React from 'react';
import Logout from '../Enregistrement/Logout';
import Search from '../Search/Search';
import NewMessage from '../Messages/newMessage';
import HomepageListeMessage from '../Messages/HomepageListeMessage';
import Logo from '../Images/clicada-smol.png'

import pdp from '../Images/pdp.png'


const HomePage = (props) => {
    const {home_to_profil, leState, logout} = props;

    return (
        <div className="parentgrid">
            <>  
                <div className="GLogo">
                    <img className="displayLogoHP" src={Logo} alt=""></img>
                </div>

                <div className="GProfileButton">
                    <button className="buttonProfil" onClick={event => home_to_profil(leState.session_id,leState.login,false)}>
                        <img className="displayLogoP" src={pdp} alt=""></img>
                    </button>
                </div>
                
                <div className="GRecherche">
                    <Search
                        home_to_profil={home_to_profil}
                        leState={leState}
                    />
                </div>                    
                <div className="GnewMessages">
                    <NewMessage 
                        leState={leState}
                    />
                </div>
                <div className="GContent">
                    <HomepageListeMessage
                        user_id={leState.session_id}
                        home_to_profil={home_to_profil}
                        leState={leState}
                    />
                </div>
                <div className="GLogout">    
                    <Logout 
                        logout={logout}
                        leState={leState}
                    />    
                </div>
            </>
        </div>
    )
}
export default HomePage;