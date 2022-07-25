import React from 'react';
import { Route } from 'react-router-dom';
import Header from './Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import AlbumII from './AlbumII';

export default class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      isButtonDisabled: true,
      procAlbum: [],
      retBusca: true,
      valor: '',
      valorProc: '',
      encontroNegado: false,
    };
  }

  caracter = (event) => {
    const { value } = event.target;
    const NUM_MIN = 2;
    if (value.length >= NUM_MIN) this.setState({ isButtonDisabled: false });
    if (value.length < NUM_MIN) this.setState({ isButtonDisabled: true });
    this.setState({
      valor: value,
    });
  };

  procurar = async () => {
    const { valor,
      valorProc,
    } = this.state;
    const searchAlbumAPI = await searchAlbumsAPI(valor);
    this.setState({ procAlbum: searchAlbumAPI });
    this.setState({ retBusca: false });
    this.setState({ valorProc: valor });
    if (valor.length > 0) this.setState({ valor: '' });
    if (valorProc.length === 0) this.setState({ encontroNegado: true });
  };

  render() {
    const { isButtonDisabled,
      procAlbum,
      retBusca,
      valorProc,
      valor,
      encontroNegado,
    } = this.state;
    return (
      <div data-testid="page-search">
        <h1>Search</h1>
        <Header />
        <form className="search-form">
          <label htmlFor="search-artist-input">
            <input
              name="artist"
              data-testid="search-artist-input"
              onChange={ this.caracter }
              value={ valor }
              id="artist"
              type="text"
            />
            <button
              data-testid="search-artist-button"
              disabled={ isButtonDisabled }
              type="button"
              onClick={ this.procurar }
            >
              Pesquisar
            </button>
          </label>
        </form>
        <div>
          {(procAlbum.length > 0 && <div>{`Resultado de álbuns de: ${valorProc}`}</div>)}
          {procAlbum.length === 0 && encontroNegado
          && <div>Nenhum álbum foi encontrado</div>}
          <ul>
            <Route>
              { procAlbum.map((ma, index) => (<AlbumII
                key={ index }
                ma={ ma }
                artworkUrl100={ ma.artworkUrl100 }
                collectionName={ ma.collectionName }
                collectionId={ ma.collectionId }
                artistName={ ma.artistName }
              />))}
            </Route>
          </ul>
        </div>
        {retBusca}
        {procAlbum.collectionName}
        {valorProc}
      </div>
    );
  }
}
