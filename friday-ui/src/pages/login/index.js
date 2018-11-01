import LoginForm from './form';
import { connect } from 'react-redux';
import { auth } from '../../actions';


const mapDispatch = dispatch => ({
  onSubmit: ({name, password}) => dispatch(auth.login(name, password)),
});

export default connect(null, mapDispatch)(LoginForm);
