import React from 'react'
import dayjs from 'dayjs';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteIcon from '@material-ui/icons/Favorite';

import './Todo.css';

const Todo = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleCloseMenu();
    props.onEdit(props.todo.id)
  }

  const handleRemove = () => {
    handleCloseMenu();
    props.onRemove(props.todo.id)
  }

  return (
    <Card>
      <CardHeader
        action={
          <IconButton aria-label="settings" onClick={(event) => {setAnchorEl(event.currentTarget)}}>
            <MoreVertIcon />
          </IconButton>
        }
        title={props.todo.name}
        subheader={`Due on ${dayjs(props.todo.dueDate).format('D.M.YYYY')}`}
      />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleRemove}>Remove</MenuItem>
      </Menu>

      <CardContent>
        <Typography color="textSecondary" component="p">
          {props.todo.description}
        </Typography>
        {props.todo.completed && <Typography color="textPrimary">DONE</Typography>}      
      </CardContent>
      <CardActions disableSpacing>
        {props.todo.completed
          ? <Button variant="contained" color="primary" disableElevation onClick={() => props.onUndo(props.todo.id)}>UNDO</Button>
          : <Button variant="contained" color="primary" disableElevation onClick={() => props.onComplete(props.todo.id)}>DONE</Button> }
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export { Todo }