import PropTypes from 'prop-types';
import React from 'react';

export default class MusicCard extends React.Component {
  render() {
    const {
      previewUrl,
      trackCensoredName,
      trackId,
      isChecked,
      favorita,
    } = this.props;

    return (
      <div>
        <div>
          <span>{ trackCensoredName }</span>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
          </audio>
          <label htmlFor={ trackId }>
            Favorita
            <input
              data-testid={ `checkbox-music-${trackId}` }
              type="checkbox"
              id={ trackId }
              onChange={ favorita }
              checked={ isChecked }
            />
          </label>
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string,
  trackCensoredName: PropTypes.string,
  trackId: PropTypes.string,
  isChecked: PropTypes.bool,
  favorita: PropTypes.func,
}.isRequired;
