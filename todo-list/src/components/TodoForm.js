import React, {useState} from 'react';
import './TodoForm.css';

const TodoForm = (props) => {

  const [name, setName] = useState(props.todo ? props.todo.name : '')
  const [description, setDescription] = useState(props.todo ? props.todo.description : '');
  const [dueDate, setDueDate] = useState(props.todo ? props.todo.dueDate : '');


  const onFormSubmit = (e) => {
    e.preventDefault(); // prevent full page refresh
    if (props.editing) {
      props.onEdit({id: props.todo.id, name, description, dueDate});
    } else {
      props.onAdd({name, description, dueDate});
    }
    setName('')
    setDescription('')
    setDueDate('')
  }

  return (
    <div className="todo-form">
      <h4>Add TODO</h4>
      <form onSubmit={onFormSubmit}>
        <input required className="form-input" type="text" name="newtodo" value={name} onChange={(e) => setName(e.target.value)} placeholder="Co budes robit?"/>
        <textarea className="form-text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="...pridaj par detailov"></textarea>
        <input required className="form-input" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        <div style={{display: "flex"}}>
        {
          props.editing
          ? <button className="button button-add" disabled={!name || !dueDate}>Edit TODO</button>
          : <button className="button button-add" disabled={!name || !dueDate}>Add TODO</button>
        }
        <button className="button" onClick={props.onCancel}>Cancel</button>              
        </div>
      </form>
    </div>
  )
}

export { TodoForm }