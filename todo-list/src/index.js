import React, {useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import { Header } from './components/Header'
import { TodoForm } from './components/TodoForm'
import { TodoList } from './components/TodoList'

import './styles.css'

// root component
const App = () => {
  const [todos, setTodos] = useState([])
  const [editingId, setEditingId] = useState('');

  const loadTodos = useCallback(async () => {
    await axios.get('http://localhost:3001/todos/').then(response => setTodos(response.data))
  }, [])
  
  useEffect(() => {
    loadTodos();
  }, [loadTodos])

  const addTodo = async (todo) => {
    const newTodo = {
      name: todo.name,
      description: todo.description,
      dueDate: todo.dueDate,
      completed: false
    };
    await axios.post('http://localhost:3001/todos/', newTodo).then(loadTodos)
  }

  const removeTodo = async (id) => {
    console.log('removeTodo called')
    console.log('with id ' + id)
    await axios.delete(`http://localhost:3001/todos/${id}`).then(loadTodos)
  }

  const completeTodo = async (id) => {
    console.log('completeTodo called with id ' + id);
    await axios.put(`http://localhost:3001/todos/${id}`, {completed: true});
    loadTodos();
  }

  const updateTodo = async (todo) => {
    console.log('updateTodo called with id ' + todo.id);
    await axios.put(`http://localhost:3001/todos/${todo.id}`, todo);
    setEditingId('');
    loadTodos();
  }

  const undoTodo = async (id) => {
    console.log('undoTodo called with id ' + id);
    await axios.put(`http://localhost:3001/todos/${id}`, {completed: false});
    loadTodos();
  }


  const removeAll = async () => {
    await axios.delete(`http://localhost:3001/todos/delete/all`);
    loadTodos();
  }

  const startEditing = (id) => {
    setEditingId(id);
  }

  const getMeTodoThatIEdit = () => {
    const todo = todos.find((todo) => todo.id === editingId);
    return todo;
  }

  return (
    <div className="app">
      <div className="container">
        <Header appName="UROB ZMENU 2021" title="TODO list" subtitle="Co mozes urobit dnes, neodkladaj na zajtra!" isVisible={true} />
        <div className="content">
          <TodoForm todo={getMeTodoThatIEdit()} onAdd={addTodo} onUpdate={updateTodo}/>
          <TodoList
            todos={todos}
            onRemove={removeTodo}
            onComplete={completeTodo}
            onUndo={undoTodo}
            onRemoveAll={removeAll}
            onEdit={startEditing}
          />    
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);