import { Component } from 'react';
import axios from 'axios';
// import firebase from './firebase';

class SearchResults extends Component {
    constructor() {
        super();
        this.state = {
            movieList: '',
            moviePosters: ''
        }
    }

    componentDidUpdate() {
        axios({
            method: 'GET',
            url: `http://www.omdbapi.com/?apikey=9d866534`,
            responseType: 'json',
            params: {
                s: `${this.props.movieTitle}`
            }
        }).then((response) => {
            console.log(response);
        });
    }

    render() {
        // const dbRef = firebase.database().ref();
        // dbRef.on('value', (response) => {
        //     console.log(response.val());
        // });

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