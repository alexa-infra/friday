import React from 'react';
import './loginPage.css';


class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: '', password: ''};
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleNameChange(event) {
    this.setState({name: event.target.value});
  }
  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.onLogin(this.state.name, this.state.password);
  }
  render() {
    return (
      <form className="login-form" onSubmit={this.handleSubmit}>
        <div className="lead">
          Login to your account
        </div>
        <div className="form-group">
          <label>Name:</label>
          <input type="text"
                 value={this.state.name} onChange={this.handleNameChange} />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password"
                 value={this.state.password} onChange={this.handlePasswordChange} />
        </div>
        <div className="messages">
        </div>
        <div className="buttons">
          <input type="submit" value="Log in" />
        </div>
      </form>
    );
  }
}

export default LoginForm;
