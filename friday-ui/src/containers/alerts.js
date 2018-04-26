import React from 'react'
import { connect } from 'react-redux'
import { alertsSelector } from '../selectors'
import { dismissAlert } from '../actions/alerts'
import { Alert, AlertList } from '../components/alerts'


const AlertsContainer = ({ alerts, onDismissAlert }) => (
  <AlertList>
    {
      alerts.map(it => <Alert key={it.id}
                              onDismissAlert={onDismissAlert}
                              {...it} />)
    }
  </AlertList>
)

const mapDispatchToProps = (dispatch) => {
  return {
    onDismissAlert: id => dispatch(dismissAlert(id))
  }
};

export default connect(alertsSelector, mapDispatchToProps)(AlertsContainer)
