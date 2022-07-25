import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

export default class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      isButtonDisabled: true,
      isLoading: false,
      login: false,
      nome: '',
    };
  }

      caracteres = (event) => {
        const CAR_MIN = 3;
        const { value } = event.target;
        if (value.length <= CAR_MIN) this.setState({ isButtonDisabled: true });
        if (value.length >= CAR_MIN) this.setState({ isButtonDisabled: false });
        this.setState({ nome: value });
      };

      cCreateUser = () => {
        const TIME_CARG = 1000;
        const { nome } = this.state;
        createUser({ name: nome });
        this.setState({ isLoading: true });
        setTimeout(() => this.setState({
          isLoading: false,
          login: true,
          nome: '',
          isButtonDisabled: true,
        }), TIME_CARG);
      };

      render() {
        const {
          isButtonDisabled,
          isLoading,
          login,
          value,
        } = this.state;
        return (
          <div data-testid="page-login">
            { login && <Redirect to="/search" /> }
            { isLoading ? <Loading />
              : (
                <form onSubmit={ value }>
                  <input
                    data-testid="login-name-input"
                    type="text"
                    onChange={ this.caracteres }
                    value={ value }
                  />
                  <button
                    data-testid="login-submit-button"
                    type="button"
                    onClick={ this.cCreateUser }
                    disabled={ isButtonDisabled }
                  >
                    Entrar
                  </button>
                </form>) }
          </div>
        );
      }
}
