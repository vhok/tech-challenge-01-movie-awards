// import axios from 'axios';


const Header = () => {
    const handleSearch = (event) => {
        event.preventDefault();
        // console.log("HI THIS IS A TEST");
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
                            <input type="text" id="search"/>
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