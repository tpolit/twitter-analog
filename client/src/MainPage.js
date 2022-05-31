import React from 'react';
import NavigationPanel from './NavigationPanel';
import './index.css'

class MainPage extends React.Component {
    constructor(props){
        super(props);
        this.state={
            page: 'login_page',
            isConnected : false,
            session_id : null,
            login: null,
        };
        this.getConnected = this.getConnected.bind(this);
        this.setLogout = this.setLogout.bind(this);
        this.user_id_to_visit = null;
        this.login_to_visit = null;
    }

    getConnected = (user) => {
        console.log(user);
        this.setState({
            page : 'home_page', 
            isConnected : true,
            session_id : user.session_id,
            login: user.login
        });
        console.log(this.state.session_id);
        console.log(this.state.login);
    }

    setLogout = () => {
        this.setState({
            page: "login_page",
            isConnected: false,
            session_id: null
        });
    }

    signedIn = () => {
        this.setState({
            page: "login_page"
        });
    }

    //fonction pour gerer les changements de page entre login, signin, logout
    handleClick = () => {
        if (!this.state.isConnected){
            if (this.state.page === "signin_page"){
                this.setState({
                    page: "login_page",
                });
            } else {
                this.setState({
                    page: "signin_page",
                });
            }
        } else {
            this.setState({
                page: "login_page",
                isConnected: true
            });
        }
    }
    /*Fonction pour passer de la page des messages au profil d'un user, les autres conditions sont juste la pour pas planter en cas de pb ? Normalement c'est fine*/ 
    home_to_profil = (user_id_tv,login_tv,toHome) => {
        if (toHome){
            this.setState({
                page:'home_page'
            });
        }
        else{
            if (login_tv===this.state.login){
                this.setState({
                    page:'self_profil'
                })
            }
            else{
                this.setState({
                    page:'profil_user'
                })
                this.user_id_to_visit=user_id_tv;
                this.login_to_visit=login_tv;
            }
        }
    }  

    render() {
        return (
            <div className="MainPage">
                <NavigationPanel
                    login={this.getConnected}
                    signin={this.signedIn}
                    logout={this.setLogout}
                    onClick={this.handleClick}
                    leState={this.state}
                    home_to_profil={this.home_to_profil}
                    user_id_tv={this.user_id_to_visit}
                    login_tv={this.login_to_visit}
                />    
            </div>
        );
    }
}

export default MainPage;