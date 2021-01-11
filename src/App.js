import { Component } from 'react';
import Header from './Header.js';
import SearchResults from './SearchResults.js';
import Nominees from './Nominees.js';
import Footer from './Footer.js';
import './sass/App.scss';

class App extends Component {
  constructor() {
    super();
    this.state = {
      movieTitle: ''
    }
  }

  getMovieTitle = (movieQuery) => {
    this.setState({movieTitle: movieQuery});
  }

  render() {
    return (
      <div className="App">
        <Header callbackFromApp={this.getMovieTitle}/>

        <main>
          <Nominees/>
          <SearchResults movieTitle={this.state.movieTitle}/>
        </main>
        
        <Footer/>
      </div>
    )
  }

}

export default App;
