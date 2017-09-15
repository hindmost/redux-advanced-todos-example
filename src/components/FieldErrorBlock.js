import React from 'react'

const FieldErrorBlock = ({ name, text, formErrors }) => formErrors[name]?
  (<span className="help-block">
      {formErrors[name] === 'invalid'? text : 'This field is required'}
    </span>)
  : null

export default FieldErrorBlock
