import React from 'react'

const TodoDeadline = ({ value }) => value?
  (<span className="badge" title="deadline date">{value}</span>)
  : null

export default TodoDeadline
