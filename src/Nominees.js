import { useEffect, useState } from "react";
import firebase from './firebase';

const Nominees = () => {
    const [nominations, setNominations] = useState([]);

    useEffect(() => {
        const dbRef = firebase.database().ref('nominations');

        dbRef.on('value', (response) => {
            console.log(Object.keys(response.val()).length);
            const currentNominations = [];

            for(let nominee in response.val()) {
                currentNominations.push(response.val()[nominee]);
            }

            setNominations(currentNominations);
        });
        
    }, []);

    const displayNominations = () => {
        return  nominations.map( (nominee) => {
            return (
                <li>
                    <h2>{nominee.Title}</h2>
                    <h3>{nominee.Year}</h3>
                    <div>
                        <img src={nominee.Poster} alt={`movie poster of ${nominee.Title}`} />
                    </div>
                    <button id={nominee.imdbID} >Remove</button>
                </li>
            );
        })
    }
    
    return (
        <div className="Nominees">
            <div className="wrapper">
                <h2>Nominees:</h2>
                <ul>
                    {displayNominations()}
                </ul>
            </div>
        </div>
    )
}

export default Nominees;