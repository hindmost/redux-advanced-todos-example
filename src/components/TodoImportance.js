import React from 'react'

const levels = ['', 'important', 'highly important']
const TodoImportance = ({ value }) => levels[value]?
  (<span className="badge">{levels[value]}</span>)
  : null

export default TodoImportance
