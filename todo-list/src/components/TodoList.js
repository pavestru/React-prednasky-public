import React from 'react'
import { Todo }  from './Todo'
import './TodoList.css';

let ID = 1;
const getId = () => ID++;

const TodoList = (props) => {
  const todos = props.todos;
  if (todos.length <= 0) {
    return (<div className="todo-nothing"><p>Nothing to do</p></div>);
  }
  return (
    <div className="todo-list">
      <div className="todo-header">
        <div>Total number of tasks: {todos.length}</div>
        <button className="button" onClick={() => props.onRemoveAll()}>Remove all</button>
      </div>
      {todos.map((todo) => {
        return (
          <div className="todo-row" key={getId()}>
            <Todo todo={todo} ></Todo>
            <div>
              {todo.completed
                ? <button className="button button-done" onClick={() => props.onUndo(todo.id)}>UNDO</button>
                : <button className="button button-done" onClick={() => props.onComplete(todo.id)}>DONE</button> }
              <button className="button" onClick={() => props.onEdit(todo.id)}>Edit</button>  
              <button className="button button-del" onClick={() => props.onRemove(todo.id)}>x</button>
            </div>              
          </div>
        )
      })}
    </div>
  )
}

export { TodoList }