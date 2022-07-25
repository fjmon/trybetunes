import React from 'react';
import { Link, Route } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      isLoading: true,
    };
  }

  componentDidMount() {
    this.gUser();
  }

  gUser = async () => {
    const gUse = await getUser();
    this.setState({
      nome: gUse.name,
      isLoading: false,
    });
  }

  render() {
    const { nome, isLoading } = this.state;
    return (
      <header data-testid="header-component">
        <div data-testid="header-user-name">
          { isLoading
            ? <Loading />
            : (<span className="user-name">{nome}</span>)}
        </div>
        <Route>
          <Link
            to="/search"
            data-testid="link-to-search"
          >
            Search
          </Link>
          <Link
            to="/favorites"
            data-testid="link-to-favorites"
          >
            Favorites
          </Link>
          <Link
            to="/profile"
            data-testid="link-to-profile"
          >
            Profile
          </Link>
        </Route>
      </header>
    );
  }
}
