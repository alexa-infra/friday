import React from 'react'
import './form.css'


export const FormText = ({name, value, onChange, disabled}) => (
  <div className="form-group">
    <label>{name}:</label>
    <input type="text"
           value={value}
           onChange={onChange}
           disabled={disabled || false}/>
  </div>
)

export const FormSelect = ({name, value, values, onChange, disabled}) => (
  <div className="form-group">
    <label>{name}:</label>
    <select value={value} onChange={onChange} disabled={disabled || false}>
      {Object.entries(values).map(([key, val]) => (
        <option key={val} value={val}>{key}</option>
      ))}
    </select>
  </div>
)
