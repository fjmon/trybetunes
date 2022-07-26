import React from 'react';
import { Link, Route } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      nome: {},
      isLoading: false,
    };
  }

  componentDidMount() {
    this.gUser();
  }

  gUser = async () => {
    this.setState({ isLoading: true });
    const gUse = await getUser();
    this.setState({ nome: { ...gUse } });
    this.setState({ isLoading: false });
  }

  render() {
    const { nome, isLoading } = this.state;
    return (
      <div>
        {isLoading
          ? <Loading />
          : (
            <header data-testid="header-component">
              <span
                data-testid="header-user-name"
                className="user-name"
              >
                {nome.name}

              </span>
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
          ) }
      </div>
    );
  }
}
