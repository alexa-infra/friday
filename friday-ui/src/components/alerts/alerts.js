import React from 'react';
import classNames from 'classnames';
import { Alerts } from '../../constants';
import { connect } from 'react-redux';
import { alerts } from '../../actions';
import './alerts.css';


const Alert = ({ item, onDismissAlert }) => {
  const { message, type } = item;
  return (
    <div className={classNames({
      'alert': true,
      'alert-success': type === Alerts.SUCCESS,
      'alert-info': type === Alerts.INFO,
      'alert-warning': type === Alerts.WARNING,
      'alert-error': type === Alerts.ERROR,
    })}>
      <div className="message">
        <strong>{type}</strong>
        {' '}{message}
      </div>
      <button type="button" className="close" onClick={onDismissAlert}>
        <span>&times;</span>
      </button>
    </div>
  )
}

let AlertList = ({ items, dismissAlert }) => (
  <div className="alert-list">
    {
      items.map(it => <Alert key={it.id}
                             item={it}
                             onDismissAlert={() => dismissAlert(it)} />)
    }
  </div>
);

AlertList = connect(
  state => state.alerts,
  dispatch => ({
    dismissAlert: item => dispatch(alerts.dismissAlert(item.id)),
  })
)(AlertList);

export default AlertList;
