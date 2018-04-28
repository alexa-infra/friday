import React from 'react';
import { connect } from 'react-redux'
import { LoginPage } from '../components'
import { auth } from '../actions'

const LoginPageContainer = ({ onLogin }) => (
  <LoginPage onLogin={onLogin} />
);

const mapDispatch = (dispatch) => {
  return {
    onLogin: (name, password) => dispatch(auth.login(name, password)),
  };
}

export default connect(null, mapDispatch)(LoginPageContainer);
