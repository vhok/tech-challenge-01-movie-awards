import { useState } from 'react';
// import firebase from './firebase';

const Header = (props) => {
    const [movieTitle, setMovieTitle] = useState('');

    const handleSearch = (event) => {
        event.preventDefault();
        props.callbackFromApp(movieTitle);
    }
    
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
                        <img src="https://placebear.com/g/800/300" alt="Banner"/>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;