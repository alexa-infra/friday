import React from 'react'
import Transition from 'react-transition-group/Transition'
import './modal.css'


const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
}

const transitionStyles = {
  entering: { opacity: 0 },
  entered:  { opacity: 1 },
}

class Modal extends React.Component {
  handleSubmit = event => {
    event.preventDefault()
    this.props.onSubmit()
  }
  handleClose = event => {
    this.props.onClose()
  }
  renderModal(state){
    if (state === 'exited') {
      return null
    }
    return (
      <div className="modal"
        style={{
          display: 'block',
          ...defaultStyle,
          ...transitionStyles[state],
        }} tabIndex="-1">
        <form className="modal-dialog" onSubmit={this.handleSubmit}>
          <div className="modal-content">
            <div className="modal-header">
              {this.props.header}
              <button type="button" className="close" onClick={this.handleClose}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {this.props.body}
            </div>
            <div className="modal-footer">
              <button type="button" onClick={this.handleClose}>
                Close
              </button>
              {this.props.footer}
            </div>
          </div>
        </form>
      </div>
    )
  }
  render(){
    return (
      <Transition in={this.props.in} timeout={duration}>
        { state => this.renderModal(state) }
      </Transition>
    )
  }
}

export default Modal
