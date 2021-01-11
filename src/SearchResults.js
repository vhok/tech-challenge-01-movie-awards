import { Component } from 'react';
import axios from 'axios';
// import firebase from './firebase';

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
                <div>
                    <img src={movie.Poster} alt={`movie poster of ${movie.Title}`}/>
                </div>
                <button>Nominate</button>
            </li>
            );
        });
    }

    componentDidUpdate(prevProp, prevState) {
        axios({
            method: 'GET',
            url: `http://www.omdbapi.com/?apikey=9d866534`,
            responseType: 'json',
            params: {
                s: `${this.props.movieTitle}`,
                /**
                 * NOTE: This API shows 10 results per page and doesn't allow one to request all results at once. 
                 */
            }
        }).then((response) => {
            if(prevState.movieList === this.state.movieList) {
                this.setState({
                    movieList: response.data.Search
                });
            }
        }).catch( (error) => {
            console.log("Temporary console error message no results.");
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
                    <ul>
                        {this.displayMovies(this.state.movieList)}
                    </ul>
                </div>
            </div>
        )
    }
}

export default SearchResults;