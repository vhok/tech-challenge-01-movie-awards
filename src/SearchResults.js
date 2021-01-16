import { Component } from 'react';
import axios from 'axios';
import firebase from './firebase';

class SearchResults extends Component {
    constructor() {
        super();
        this.state = {
            movieList: []
        }
    }

    displayMovies(movies) {
        return movies.map( (movie) => {
            return (
            <li key={movie.imdbID}>
                <h2>{movie.Title}</h2>
                <h3>{movie.Year}</h3>
                <div>
                    <img src={movie.Poster} alt={`movie poster of ${movie.Title}`}/>
                </div>
                <button>Nominate</button>
            </li>
            );
        });
    }

    componentDidMount() {
        const dbRef = firebase.database().ref();

        dbRef.on('value', (response) => {
            this.setState({
                movieList: response.val().movieData
            });
        });
    }

    componentDid
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
                const dbRef = firebase.database().ref();

                dbRef.set({movieData: response.data.Search});
            }
        }).catch( (error) => {
            console.log("Temporary console error message no results.");
        });
    }

    render() {
        return (
            <div className="SearchResults">
                <div className="wrapper">
                    <h2>Potential Nominees:</h2>
                    <ul>
                        {this.displayMovies(this.state.movieList)}
                    </ul>
                </div>
            </div>
        )
    }
}

export default SearchResults;