import React from 'react'
import classNames from 'classnames'
import { Alerts } from '../constants'
import './alerts.css'


export const Alert = ({ id, message, type, onDismissAlert }) => {
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
      <button type="button" className="close" onClick={e => onDismissAlert(id)}>
        <span>&times;</span>
      </button>
    </div>
  )
}

export const AlertList = props => (
  <div className="alert-list">
    {props.children}
  </div>
)
