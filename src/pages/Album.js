import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from './MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

export default class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      cargAlbum: true,
      musAlbum: [],
      fav: [],
      favif: [],
    };
  }

  componentDidMount() {
    this.achaMus();
  }

  achaMus = async () => {
    const { match } = this.props;
    const { id } = match.params;
    const gMusic = await getMusics((id));
    const favs = await getFavoriteSongs();
    this.setState({
      musAlbum: gMusic,
      favif: gMusic.filter((fil) => fil.kind === 'song'),
      cargAlbum: false,
      fav: [...favs],
    });
  };

favorita = async (event) => {
  const { id, checked } = event.target;
  const { favif } = this.state;
  const idInt = favif.find((fin) => fin.trackId === Number(id));
  this.setState((prev) => ({
    cargAlbum: true,
    fav: checked ? [...prev.fav, idInt] : prev.fav
      .filter((fav) => fav.trackId !== id),
  }));

  if (checked) {
    await addSong(idInt);
  } else {
    await removeSong(idInt);
  }
  this.setState({ cargAlbum: false });
};

render() {
  const {
    musAlbum,
    cargAlbum,
    fav,
  } = this.state;

  return (
    <div data-testid="page-album">
      <h1>Album</h1>
      <Header />
      {cargAlbum ? <Loading />
        : (
          <div>
            <img
              src={ musAlbum[1].artworkUrl100 }
              alt={ musAlbum[1].collectionName }
            />
            <div data-testid="artist-name">
              {musAlbum[0].artistName}
            </div>
            <div data-testid="album-name">
              {musAlbum[0].collectionName}
            </div>

            { musAlbum.filter((fil, i) => i !== 0).map((ma) => (
              <MusicCard
                key={ ma.trackId }
                trackCensoredName={ ma.trackName }
                previewUrl={ ma.previewUrl }
                trackId={ ma.trackId }
                isChecked={
                  fav.find((fin) => fin.trackId === ma.trackId)
                }
                favorita={ this.favorita }
              />
            ))}
          </div>
        )}
    </div>
  );
}
}
Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;
