import React from 'react'
import TodoImportance from './TodoImportance'
import TodoDeadline from './TodoDeadline'
import './TodoItem.css'

const statusClass = (flag) =>
  'todo-status'+ (flag? '' : ' todo-status-uncompleted') +
    ' glyphicon glyphicon-' + (flag? 'check' : 'unchecked')

const statusTitle = (flag) =>
  flag? 'Done' : 'Click to make it Done'

const TodoItem = ({ item, onEdit, onRemove, onComplete }) => (
  <li className="list-group-item list-group-item-warning">
    <h4 className="list-group-item-heading">
      <span className={statusClass(item.completed)} title={statusTitle(item.completed)} onClick={item.completed? null : (e) => { e.preventDefault(); onComplete(item.id) }}></span>
      <span>{item.title}</span>
      <TodoImportance value={item.level} />
      <TodoDeadline value={item.deadline} />
      <a href="#" className="item-control pull-right" onClick={(e) => { e.preventDefault(); onRemove(item.id) }} title="Remove" >
        <span className="glyphicon glyphicon-remove"></span>
      </a>
      {!item.completed &&
      <a href="#" className="item-control pull-right" onClick={(e) => { e.preventDefault(); onEdit(item.id) }} title="Edit" >
        <span className="glyphicon glyphicon-pencil"></span>
      </a>
      }
    </h4>
    <p className="list-group-item-text">
      {item.description}
    </p>
  </li>
)

export default TodoItem
