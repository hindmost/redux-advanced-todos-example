import React from 'react'
import TodoItem from './TodoItem'
import './TodoList.css'

const TodoList = ({ list, onEditItem, onRemoveItem, onCompleteItem }) => 
  list.length? (
    <ul className="list-group todo-list">
    {list.map(item => 
      <TodoItem item={item} onEdit={onEditItem} onRemove={onRemoveItem} onComplete={onCompleteItem} />
    )}
    </ul>
  ) : (
    <p>No todos found</p>
  )

export default TodoList
