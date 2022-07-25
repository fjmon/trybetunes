import React from 'react';
import Header from './Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import MusicCard from './MusicCard';

export default class Favorites extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      favoritas: [],
    };
  }

  componentDidMount() {
    this.favCarg();
  }

favCarg = async () => {
  const favorits = await getFavoriteSongs();
  this.setState({
    isLoading: false,
    favoritas: [...favorits],
  });
};

excluiFav = async (event) => {
  this.setState({ isLoading: true });
  const { id, checked } = event.target;
  console.log(id, checked);
  const { favoritas } = this.state;
  const idInt = favoritas.find((fin) => fin.trackId === Number(id));
  if (checked === false) await removeSong(idInt);

  this.setState({ isLoading: false });
};

render() {
  const { isLoading, favoritas } = this.state;
  return (
    <div data-testid="page-favorites">
      <h1>Favorites</h1>
      <Header />
      {isLoading ? <Loading />
        : (
          <div>
            { favoritas.map((ma) => (
              <MusicCard
                key={ ma.trackId }
                type="checkbox"
                trackCensoredName={ ma.trackName }
                previewUrl={ ma.previewUrl }
                trackId={ ma.trackId }
                isChecked={ favoritas.find((fin) => fin.trackId === ma.trackId) }
                favorita={ this.excluiFav }
              />
            ))}
          </div>
        )}
    </div>
  );
}
}
