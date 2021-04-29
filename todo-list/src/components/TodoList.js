import React from 'react'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { Flipper, Flipped } from 'react-flip-toolkit'

import { Todo }  from './Todo'
import './TodoList.css';

let ID = 1;
const getId = () => ID++;

const TodoList = (props) => {
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDelete = () => {
    props.onRemoveAll();
    handleCloseDialog();
  }

  const todos = props.todos;
  if (todos.length <= 0) {
    return (<div className="todo-nothing"><p>Nothing to do</p></div>);
  }
  return (
    <div className="todo-list">
      <div className="todo-header">
        <div>Total number of tasks: {todos.length}</div>
        <button className="button" onClick={handleClickOpenDialog}>Remove all</button>
      </div>
      <Flipper flipKey={todos}>
        {todos.map((todo) => {
          return (
            <Flipped key={todo.id} flipId={todo.id}>
              <div className="todo-row">
                <Todo
                  todo={todo}
                  onUndo={props.onUndo}
                  onComplete={props.onComplete}
                  onEdit={props.onEdit}
                  onRemove={props.onRemove}
                />
              </div>
            </Flipped>
          );
        })}
      </Flipper>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Are you sure you want to delete all ToDo items?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deleting all todo items cannot be reverted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export { TodoList }