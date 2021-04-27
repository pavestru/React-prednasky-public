import React, { useState } from 'react'
import './Todo.css';
import { TodoForm } from "./TodoForm";

const Todo = (props) => {
  const [editing, setEditing] = useState(false)

  return editing
    ? <TodoForm
        todo={props.todo}
        editing={true}
        onCancel={() => setEditing(false)}
        onEdit={props.onEdit}
      />
    : (
      <div style={{display: "flex"}}>
        <div className="todo">
          <h5 className="todo-name">{props.todo.name}</h5>
          <p className="todo-description">{props.todo.description}</p>
          <p>{props.todo.dueDate}</p>
          {props.todo.completed && <p className="todo-done">DONE</p>}
        </div>
        <div>
          {props.todo.completed
            ? <button className="button button-done" onClick={() => props.onUndo(props.todo.id)}>UNDO</button>
            : <button className="button button-done" onClick={() => props.onComplete(props.todo.id)}>DONE</button> }
          <button className="button" onClick={() => setEditing(true)}>Edit</button>
          <button className="button button-del" onClick={() => props.onRemove(props.todo.id)}>x</button>
        </div>
      </div>
    );
}

export { Todo }