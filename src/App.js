import { Component } from 'react';
import Header from './Header.js';
import SearchResults from './SearchResults.js';
import Nominees from './Nominees.js';
import Footer from './Footer.js';
import './sass/App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>

        <main>
          <Nominees/>
          <SearchResults/>
        </main>
        
        <Footer/>
      </div>
    )
  }

}

export default App;
