import React, { Component } from 'react'
import Modal from './modal'

const EditEventModal = props => {
  const show = props.currentItem !== null;
  return <Modal in={show} header={ <h1>Hello</h1> } body={ 'World' }
                footer={ '' }
                onClose={props.hideEdit} />
}

const FormText = ({name, value, onChange}) => (
  <div className="form-group">
    <label>{name}:</label>
    <input type="text"
           value={value}
           onChange={onChange} />
  </div>
)

const RepeatOptions = {
  "No repeat": "none",
  "Day": "daily",
  "Week": "weekly",
  "2 Weeks": "biweekly",
  "Month": "monthly",
  "Year": "annualy",
}

const FormSelect = ({name, value, values, onChange}) => (
  <div className="form-group">
    <label>{name}:</label>
    <select value={value} onChange={onChange}>
      {Object.entries(values).map(([key, val]) => (
        <option key={val} value={val}>{key}</option>
      ))}
    </select>
  </div>
)

class NewEventModal extends Component {
  state = {
    name: '',
    icon: '',
    repeat: 'none',
    date: null,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.date !== nextProps.newEventDate)
      return {date: nextProps.newEventDate}
    return null;
  }

  handleNameChange = event => {
    this.setState({name: event.target.value})
  }
  handleIconChange = event => {
    this.setState({icon: event.target.value})
  }
  handleRepeatChange = event => {
    this.setState({repeat: event.target.checked})
  }

  renderModal() {
    return (
      <div className="new-event-form">
        <FormText name="Name" value={this.state.name}
                  onChange={this.handleNameChange} />
        <FormText name="Icon" value={this.state.icon}
                  onChange={this.handleIconChange} />
        <FormSelect name="Repeat" value={this.state.repeat}
                    values={RepeatOptions}
                    onChange={this.handleRepeatChange} />
      </div>
    )
  }
  render() {
    return (
      <Modal in={this.props.newEventDate !== null}
             header={<h1>Create new event</h1>}
             body={this.renderModal()}
             footer={<input type="submit" value="Create" />}
             onClose={this.props.hideEdit}
             onSubmit={() => this.props.createNew(this.state)} />
    )
  }
}

export { NewEventModal, EditEventModal }

export default EditEventModal
