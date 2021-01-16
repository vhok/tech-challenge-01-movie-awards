import { useEffect, useState } from "react";
import firebase from './firebase';
import noImage from './assets/noImage.png';

const Nominees = () => {
    const [nominations, setNominations] = useState([]);

    useEffect(() => {
        const dbRef = firebase.database().ref('nominations');

        dbRef.on('value', (response) => {
            const currentNominations = [];

            for(let nominee in response.val()) {
                currentNominations.push(response.val()[nominee]);
            }

            setNominations(currentNominations);
        });
        
    }, []);

    const handleRemove = (event) => {
        const dbRef = firebase.database().ref('nominations');

        // // to remove the first portion 'nominee_' so that movieID can be used directly to reference database record.
        const movieID = event.target.id.slice(8);

        dbRef.child(movieID).remove();
    }

    const displayNominations = () => {
        return  nominations.map( (nominee) => {
            return (
                <li key={`nominee_${nominee.imdbID}`}>
                    <h2>{nominee.Title}</h2>
                    <h3>{nominee.Year}</h3>
                    <div className={nominations.length >= 5 ? "Nominees__div-img--selected" : null}>
                        <img src={nominee.Poster !== "N/A" ? nominee.Poster : noImage} alt={`movie poster of ${nominee.Title}`} />
                    </div>
                    <button id={`nominee_${nominee.imdbID}`} onClick={handleRemove} >Remove</button>
                </li>
            );
        })
    }
    
    return (
        <div className="Nominees">
            <div className={`wrapper ${nominations.length >= 5 ? "Nominees__div-wrapper--selected" : null}`} >
                <h2 className={ nominations.length >= 5 ? "Nominees__h2-banner--selected" : null} >Nominees:</h2>
                <ul>
                    {displayNominations()}
                </ul>
            </div>
        </div>
    )
}

export default Nominees;