import React from 'react';
import { Link, Route } from 'react-router-dom';
import Header from './Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      user: {},
    };
  }

  componentDidMount() {
    this.cargUser();
  }

  cargUser = async () => {
    this.setState({
      isLoading: true,
    });
    const getUseres = await getUser();
    this.setState({
      user: getUseres,
      isLoading: false,
    });
  }

  render() {
    const { isLoading, user } = this.state;
    return (
      <div data-testid="page-profile">
        <h1>Profile</h1>
        <Header />
        { isLoading ? <Loading />
          : (
            <>
              <img
                data-testid="profile-image"
                src={ user.image }
                alt={ user.name }
              />
              <div>{ user.name }</div>
              <div>{ user.email }</div>
              <div>{ user.description }</div>
              <Route>
                <Link
                  data-testid="link-to-profileedit"
                  to="/profile/edit"
                >
                  Editar perfil
                </Link>
              </Route>

            </>

          ) }
      </div>
    );
  }
}
