import React, { Component } from 'react'
import Modal from './modal'

const FormText = ({name, value, onChange, disabled}) => (
  <div className="form-group">
    <label>{name}:</label>
    <input type="text"
           value={value}
           onChange={onChange}
           disabled={disabled || false}/>
  </div>
)

const RepeatOptions = {
  "No repeat": "none",
  "Day": "daily",
  "Week": "weekly",
  "2 Weeks": "biweekly",
  "Month": "monthly",
  "Year": "annually",
}

const FormSelect = ({name, value, values, onChange, disabled}) => (
  <div className="form-group">
    <label>{name}:</label>
    <select value={value} onChange={onChange} disabled={disabled || false}>
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
      return {
        date: nextProps.newEventDate,
        name: '',
        icon: '',
        repeat: 'none',
      }
    return null;
  }

  handleNameChange = event => {
    this.setState({name: event.target.value})
  }
  handleIconChange = event => {
    this.setState({icon: event.target.value})
  }
  handleRepeatChange = event => {
    this.setState({repeat: event.target.value})
  }
  getDate() {
    if (!this.state.date)
      return ''
    return this.state.date.format('YYYY-MM-DD')
  }

  renderModal() {
    return (
      <div className="new-event-form">
        <FormText name="Date" value={this.getDate()} disabled={true} />
        <FormText name="Name" value={this.state.name}
                  onChange={this.handleNameChange} />
        <FormText name="Icon" value={this.state.icon}
                  onChange={this.handleIconChange} />
        <FormSelect name="Repeat" value={this.state.repeat || 'none'}
                    values={RepeatOptions}
                    onChange={this.handleRepeatChange} />
      </div>
    )
  }
  renderFooter() {
    return (
      <button type="button"
              disabled={this.props.editDisabled}
              onClick={() => this.props.createNew(this.state)}>
        Create
      </button>
    )
  }
  render() {
    return (
      <Modal in={this.props.newEventDate !== null}
             header={<h1>Create new event</h1>}
             body={this.renderModal()}
             footer={this.renderFooter()}
             onClose={this.props.hideEdit}
             disabled={this.props.editDisabled} />
    )
  }
}

class EditEventModal extends Component {
  state = {
    date: null,
    name: '',
    icon: '',
    repeat: 'none',
    currentItem: null,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.currentItem !== nextProps.currentItem)
      return {
        ...nextProps.currentItem,
        currentItem: nextProps.currentItem,
      }
    return null;
  }

  handleNameChange = event => {
    this.setState({name: event.target.value})
  }
  handleIconChange = event => {
    this.setState({icon: event.target.value})
  }
  handleRepeatChange = event => {
    this.setState({repeat: event.target.value})
  }
  getDate() {
    if (!this.state.date)
      return ''
    return this.state.date.format('YYYY-MM-DD')
  }

  renderModal() {
    return (
      <div className="edit-event-form">
        <FormText name="Date" value={this.getDate()} disabled={true} />

        <FormText name="Name" value={this.state.name}
                  onChange={this.handleNameChange} />
        <FormText name="Icon" value={this.state.icon}
                  onChange={this.handleIconChange} />
        <FormSelect name="Repeat" value={this.state.repeat || 'none'}
                    values={RepeatOptions}
                    onChange={this.handleRepeatChange} />
      </div>
    )
  }
  onUpdateClick = e => {
    e.preventDefault();
    this.props.update(this.state);
  }
  renderFooter() {
    return (
      <div className="buttons">
        <button type="button"
                disabled={this.props.editDisabled}
                onClick={() => this.props.update(this.state)}>
          Update
        </button>
        <button type="button"
                disabled={this.props.editDisabled}
                onClick={() => this.props.delete(this.state)}>
          Delete
        </button>
      </div>
    )
  }
  render() {
    return (
      <Modal in={this.props.currentItem !== null}
             header={<h1>Edit event</h1>}
             body={this.renderModal()}
             footer={this.renderFooter()}
             onClose={this.props.hideEdit}
             disabled={this.props.editDisabled} />
    )
  }
}

export { NewEventModal, EditEventModal }

export default EditEventModal
