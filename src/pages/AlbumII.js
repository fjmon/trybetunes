import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

export default class AlbumII extends React.Component {
  render() {
    const {
      index,
      artworkUrl100,
      collectionName,
      collectionId,
      artistName,
    } = this.props;

    return (
      <li key={ index }>
        <img src={ artworkUrl100 } alt={ collectionName } />
        <div>
          <Link
            to={ `/album/${collectionId}` }
            data-testid={ `link-to-album-${collectionId}` }
          >
            {collectionName}

          </Link>
        </div>
        <div>
          {artistName}
        </div>
      </li>
    );
  }
}

AlbumII.propTypes = {
  artistName: PropTypes.string,
  artworkUrl100: PropTypes.string,
  collectionId: PropTypes.number,
  collectionName: PropTypes.string,
  index: PropTypes.number,
}.isRequired;
