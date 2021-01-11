import { Component } from 'react';
// import firebase from './firebase';

class SearchResults extends Component {

    getMovies(movieQuery) {
        console.log(movieQuery[0]);
        
    }

    render() {
        // const dbRef = firebase.database().ref();
        // dbRef.on('value', (response) => {
        //     console.log(response.val());
        // });
        this.getMovies(this.props.movieTitle);

        return (
            <div className="SearchResults">
                <div className="wrapper">
                    <h2>Potential Nominees:</h2>
                    <p>{this.props.movieTitle}</p>
                </div>

            
            </div>
        )
    }
}

export default SearchResults;