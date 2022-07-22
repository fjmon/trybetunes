import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      isLoading: true,
    };
  }

  componentDidMount() {
    this.gUser();
  }

  gUser = async () => {
    try {
      const gUse = await getUser();
      this.setState({ userName: gUse.name, isLoading: false });
    } catch (erro) {
      return erro;
    }
  }

  render() {
    const { userName, isLoading } = this.state;
    return (
      <header data-testid="header-component">
        <div data-testid="header-user-name">
          { isLoading
            ? <Loading />
            : (<span className="user-name">{userName}</span>)}
        </div>
      </header>);
  }
}
