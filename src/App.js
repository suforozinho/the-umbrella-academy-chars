import React from 'react';
import store from './redux/store.js';
import { searchCharacter } from './redux/actions.js';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Link
} from "react-router-dom";
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: ''
    }
  }

  onSearchChange = e => {
    this.setState({ searchQuery: e.target.value });
  }

  onSearchClick = e => {
    e.preventDefault();
    store.dispatch(searchCharacter(this.state.searchQuery));
    this.forceUpdate();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Route
              exact
              path="/"
              render={() => {
                  return (
                    <Redirect to="/home" />
                  )
              }}
            />
            <Route path="/home">
              <div className="Search-Wrapper">
                <form className="Search" onSubmit={(e) => e.preventDefault()}>
                  <input type="text" value={this.state.searchQuery} onChange={this.onSearchChange} className="search-bar"/>
                  <button className="search-button" onClick={this.onSearchClick}><i className="fas fa-search"></i></button>
                </form>
              </div>
              <div className="Cards">
                {
                  store.getState().map(character =>
                    <Link to={character.link} className="Card" key={character.name}>
                      <img src={character.imgSrc} alt={character.alt} className="character-image"/>
                      <div className="character-name">{character.name}</div>
                    </Link>
                  )
                }
              </div>
            </Route>
            {
              store.getState().map(character =>
                <Route path={'/' + character.link} key={character.link}>
                  <div className="character-description-section">
                    <img src={character.imgSrc} alt={character.alt} className="character-image-section"/>
                    <div className="character-description-section__info">
                      <h1 className="character-real-name">{character.realname}</h1>
                      <h2 className="character-sub-name">{character.name}</h2>
                      <p className="character-description-section__text">{character.description}</p>
                    </div>
                    <div className="close-button">
                      <Link to="/">x</Link>
                    </div>
                  </div>
                </Route>
              )
            }
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
