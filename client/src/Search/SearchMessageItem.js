import React from 'react';

const SearchMessageItem = (props) => {

    const{home_to_profil, resultat} = props;
    return (
        <div className="Message">
            <button onClick={event => home_to_profil(resultat.id_auteur,resultat.login_auteur, false)}>
                {resultat.login_auteur}
            </button>
            <> said : </>
            <b>{resultat.message}</b>
            <span>{resultat.likes.length+" likes"}</span>
        </div>
    )
}
export default SearchMessageItem;