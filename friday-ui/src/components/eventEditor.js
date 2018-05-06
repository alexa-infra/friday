import React from 'react'
import Modal from './modal'

const EditModal = props => {
  const show = props.currentItem !== null;
  return <Modal in={show} header={ <h1>Hello</h1> } body={ 'World' }
                footer={ '' }
                onClose={props.hideEdit} />
}

export default EditModal
