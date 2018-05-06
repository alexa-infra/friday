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
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              {this.props.header}
              <button type="button" className="close" onClick={e => this.props.onClose()}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {this.props.body}
            </div>
            <div className="modal-footer">
              <button type="button" onClick={e => this.props.onClose()}>
                Close
              </button>
              {this.props.footer}
            </div>
          </div>
        </div>
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
