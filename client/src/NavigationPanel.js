import React from 'react';
import Login from "./Enregistrement/Login";  
import Signin from "./Enregistrement/Signin";
import ProfilPage from './Pages/ProfilPage';
import HomePage from './Pages/HomePage';
import SelfProfilPage from './Pages/SelfProfilPage';

const NavigationPanel = (props) => {

    const {login,signin,logout,onClick,leState,home_to_profil,user_id_tv,login_tv}=props;

    function display(login,signin,logout,onClick,leState,home_to_profil,user_id_tv,login_tv){
        if (!leState.isConnected) {
            //Page "login_page"
            if(leState.page === 'login_page'){
                return(
                <Login 
                    login={login}
                    onClick={onClick}
                />
                )
            }
            //Page "singin_page"
            else{
                return(
                <Signin
                    signin={signin} 
                    onClick={onClick}
                />
                )
            }
        } else {
            switch(leState.page){
                case('home_page'):{
                    return(
                        <HomePage 
                            leState={leState}
                            home_to_profil={home_to_profil}
                            logout={logout}
                        />
                    )
                }
                case ('profil_user'):{
                    return(
                        <>
                        <ProfilPage
                            user_id_tv={user_id_tv}
                            login_tv={login_tv}
                            leState={leState}
                            home_to_profil={home_to_profil}
                            logout={logout}
                        />
                        </>
                    )
                }
                case ('self_profil'):{
                    return(
                        <SelfProfilPage
                            leState={leState}
                            home_to_profil={home_to_profil}
                            logout={logout}
                            
                        />
                    )
                }
                default:{
                    return(
                        <div>Pas encore de cas créé pour {leState.page}</div>
                    )
                }
            }
        }

    }

    return(display(login,signin,logout,onClick,leState,home_to_profil,user_id_tv,login_tv));
}
export default NavigationPanel;