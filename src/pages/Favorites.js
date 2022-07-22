import React from 'react';
import Header from './Header';

class Favorites extends React.Component {
  render() {
    return (
      <div data-testid="page-favorites">
        <h1>Favorites</h1>
        <Header />
      </div>
    );
  }
}

export default Favorites;
