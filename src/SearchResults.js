import { Component } from 'react';
import axios from 'axios';
import firebase from './firebase';
import noImage from './assets/noImage.png';

class SearchResults extends Component {
    constructor() {
        super();
        this.state = {
            movieList: [],
            isNominationsMaxed: false
        }
    }

    // Adds a nominee to the nominations list in Firebase.
    handleAddNominee(event) {
        const dbRef = firebase.database().ref('nominations/' + event.target.id);
        const movieToNominate = this.state.movieList.filter( (movie) => { return movie.imdbID === event.target.id })[0];

        dbRef.set(movieToNominate);
    }

    componentDidMount() {
        const dbRef = firebase.database().ref();

        // Detects changes in Firebase data, and on trigger updates the state variables which in turn triggers the components to re-render on the screen.
        dbRef.on('value', (response) => {
            let movies = [];
            let maxed = this.state.isNominationsMaxed;
            
            if(response.val()['searchResults']) {
                movies = response.val()['searchResults'].movieData;
            }
            
            if(response.val()['nominations'] && Object.keys(response.val()['nominations']).length >= 5) {
                maxed = true;
            } else {
                maxed = false;
            }

            this.setState({
                movieList: movies,
                isNominationsMaxed: maxed
            });
        });
    }

    componentDidUpdate() {
        // Makes an API call to OMDB API and if successful, will update the database to contain the results.
        axios({
            method: 'GET',
            url: `https://www.omdbapi.com/?apikey=9d866534`,
            responseType: 'json',
            params: {
                s: `${this.props.movieTitle}`,
            }
        }).then((response) => {
            const dbRef = firebase.database().ref('searchResults');

            dbRef.set({ movieData: response.data.Search });
        }).catch((error) => {

        });

        
    }

    displayMovies(movies) {
        return movies.map((movie) => {
            return (
                <li key={movie.imdbID}>
                    <h2>{movie.Title}</h2>
                    <h3>{movie.Year}</h3>
                    <div>
                        <img src={movie.Poster !== "N/A" ? movie.Poster : noImage } alt={`movie poster of ${movie.Title}`} />
                    </div>
                    <button id={movie.imdbID} onClick={(event) => { this.handleAddNominee(event) }} disabled={this.state.isNominationsMaxed}>Nominate</button>
                </li>
            );
        });
    }

    render() {
        return (
            <div className="SearchResults">
                <div className="wrapper">
                    <ul>
                        {this.displayMovies(this.state.movieList)}
                    </ul>
                </div>
            </div>
        )
    }
}

export default SearchResults;