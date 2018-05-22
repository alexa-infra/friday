import React, { Component } from 'react'
import Modal from './modal'
import { FormText, FormSelect } from './form'


const RepeatOptions = {
  "No repeat": "none",
  "Day": "daily",
  "Week": "weekly",
  "2 Weeks": "biweekly",
  "Month": "monthly",
  "Year": "annually",
}

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
    repeatIn: 24,
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
  handleRepeatInChange = event => {
    this.setState({repeatIn: parseInt(event.target.value)})
  }
  getDate() {
    if (!this.state.date)
      return ''
    return this.state.date.format('YYYY-MM-DD')
  }
  renderRepeatIn() {
    if (this.state.repeat !== null)
      return null
    return (
      <div className="form-group">
        <label>Repeat in:</label>
        <div className="field">
          <input type="number"
                 value={this.state.repeatIn}
                 onChange={this.handleRepeatInChange} />
          <button type="button"
                  onClick={() => this.props.repeatIn(this.state)}
                  disabled={this.props.editDisabled}>
            Repeat
          </button>
        </div>
      </div>
    )
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
                    disabled={true} />
        { this.renderRepeatIn() }
      </div>
    )
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
