import React from 'react';
import SearchMessages from'./SearchMessages';
import SearchUser from './SearchUser';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recherche: "",
            cible: "User",
            status: "",
            texterror: "",
            resultat: []
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event = {}) {
        const name = event.target && event.target.name;
        const value = event.target && event.target.value;
        this.setState({[name]:value});
    }

    render() {
        const{home_to_profil} = this.props;
        return (
            <div className="Recherche">
                <label><b>Faites votre recherche</b></label>
                <input
                    type="text"
                    placeholder="Rechercher..."
                    name="recherche"
                    onChange={this.handleChange}
                    value={this.state.recherche}
                    required
                />
                <label><b>Ce que vous cherchez... </b></label>
                <select
                    type="select"
                    placeholder="Type de recherche"
                    name="cible"
                    onChange={this.handleChange}
                    value={this.state.cible}
                >
                    <option>User</option>
                    <option>Messages</option>
                </select>
                {(this.state.cible === "Messages") ?
                    <SearchMessages
                        recherche={this.state.recherche}
                        home_to_profil={home_to_profil}
                    />
                :
                    <SearchUser
                        recherche={this.state.recherche}
                        home_to_profil={home_to_profil}
                    />
                }
            </div>
        )
    }
}
export default Search;