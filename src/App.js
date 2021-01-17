import { Component } from 'react';
import Header from './Header.js';
import SearchResults from './SearchResults.js';
import Nominees from './Nominees.js';
import Footer from './Footer.js';
import './sass/App.scss';

/** GENERAL NOTES
 * 
 * COMPONENTS ( 4 MAIN ONES )
 * 
 * - Header: Controls the header for the website. 
 *   It also manages the search bar and any information that the user types into it.
 * 
 * - Nominees: Displays the nominations and buttons so the user may remove them.
 * 
 * - SearchResults: Accepts submissions from the search bar, performs API calls, retrieves and displays movies.
 * 
 * - Footer: Lists author and provides link to portfolio website.
 * 
 * APPROACH
 * - Class based vs function based: I wanted to practice using both class based and function based implementations. 
 *   Therefore, this app will show a mix of both methods. I believe a huge portion of class based implementations exist in production.
 *   As the industry trend shifts to using functional based React, it's important to know both.
 * 
 * - Data flow: The majority of the data flow is centralized around the Firebase database and having components interact with the database
 *   directly. This makes it easier to coordinate different components rather than passing data betweens comopnents or having all the code
 *   in one big component. The only exception is where the search bar passes its submitted value from the 
 *   the Header component to Nominatees for API call.
 * 
 *    Searching for movies:
 *    USER SUBMITS QUERY -> AXIOS MAKES API CALL TO OMDB -> MOVIES ARE PUSHED TO FIREBASE -> DATA CHANGE EVENT SETS STATE -> SET STATE TRIGGERS RE-RENDER -> USER SEES MOVIE LIST ON SCREEN
 * 
 *    Adding to nominations:
 *    USER CLICKS NOMINATE -> EVENT HANDLER PUSHES MOVIE OBJECT TO FIREBASE -> DATA CHANGE EVENT SETS STATE -> SET STATE TRIGGERS RE-RENDER -> USER SEES NOMINEES LIST ON SCREEN
 *    (This also works identically for removing nominations)
 */


 // The App component houses all other components and display them to the page.
 // The only thing worth note is that it receives queries from Header and passes it to Nominees.
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
