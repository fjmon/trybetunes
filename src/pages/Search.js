import React from 'react';
import Header from './Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      isButtonDisabled: true,
    };
  }

  caracteres = (event) => {
    const { value } = event.target;
    if (value.length >= 2) this.setState({ isButtonDisabled: false });
  };

  render() {
    const { isButtonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <h1>Search</h1>
        <Header />
        <form className="search-form">
          <label htmlFor="search-artist-input">
            <input
              name="artist"
              data-testid="search-artist-input"
              onChange={ this.caracteres }
              id="artist"
              type="text"
            />
            <button
              data-testid="search-artist-button"
              disabled={ isButtonDisabled }
              type="button"
              onClick={ this.pesquisar }
            >
              Pesquisar
            </button>
          </label>
        </form>
      </div>
    );
  }
}

export default Search;
