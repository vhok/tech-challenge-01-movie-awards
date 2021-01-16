import { Component } from 'react';
import axios from 'axios';
import firebase from './firebase';
import noImage from './assets/noImage.png';

class SearchResults extends Component {
    constructor() {
        super();
        this.state = {
            movieList: [],
            isNominationsMaxed: false,
            isResults: true
        }
    }

    handleAddNominee(event) {
        const dbRef = firebase.database().ref('nominations/' + event.target.id);
        const movieToNominate = this.state.movieList.filter( (movie) => { return movie.imdbID === event.target.id })[0];

        dbRef.set(movieToNominate);
    }

    componentDidMount() {
        const dbRef = firebase.database().ref();

        dbRef.on('value', (response) => {
            let movies = [];
            let maxed = false;

            if(response.val()['searchResults']) {
                movies = response.val()['searchResults'].movieData;

            }
            
            if(response.val()['nominations'] && Object.keys(response.val()['nominations']).length >= 5 ) {
                maxed = true;
            }

            this.setState({
                movieList: movies,
                isNominationsMaxed: maxed
            });
        });


    }

    componentDidUpdate(prevProp, prevState) {
        axios({
            method: 'GET',
            url: `http://www.omdbapi.com/?apikey=9d866534`,
            responseType: 'json',
            params: {
                s: `${this.props.movieTitle}`,
            }
        }).then((response) => {
            if(prevState.movieList === this.state.movieList) {
                const dbRef = firebase.database().ref('searchResults');

                dbRef.set({movieData: response.data.Search});
            }
        }).catch( (error) => {
            console.log("Temporary console error message no results.");
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