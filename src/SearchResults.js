import { Component } from 'react';
// import firebase from './firebase';

class SearchResults extends Component {


    render () {
        // const dbRef = firebase.database().ref();
        // dbRef.on('value', (response) => {
        //     console.log(response.val());
        // });

        return (
            <div className="SearchResults">
                <div className="wrapper">
                    <h2>Potential Nominees:</h2>
                </div>

            
            </div>
        )
    }
}

export default SearchResults;