import { useState } from 'react';
import action from './assets/action.png';

const Header = (props) => {
    const [movieTitle, setMovieTitle] = useState('');

    // Submits the query to SearchResults component
    const handleSearch = (event) => {
        event.preventDefault();
        props.callbackFromApp(movieTitle);
    }
    
    // Updates the state as user types in their query to search bar.
    const handleChange = (event) => {
        event.preventDefault();
        setMovieTitle([event.target.value]);
    }

    return (
        <header>
            <div className="wrapper">
                <h1><em>The Shoppies</em>: Movie awards for entrepreneurs.</h1>

                <div className="header__div-container">
                    <div className="header__div-search">
                        <h2>Search for your nominees 📽️🏆</h2>
                        <form onSubmit={handleSearch}>
                            <label htmlFor="search">Movie title: </label>
                            <input type="text" id="search" onChange={handleChange} value={movieTitle}/>
                            <button type="submit" id="submit">Search</button>
                        </form>
                    </div>
                    <div className="header__div-img-banner">
                        <img src={action} alt="Banner"/>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;