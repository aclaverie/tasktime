import React from 'react';
import { useState } from 'react';
import { Checkbox, FormControl, FormControlLabel, TextField } from '@mui/material';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';




function TaskList(props){

  const [edit, setEdit] = useState({
    id: '',
    task: '',
    who: '',
    dueDate: '',
    done: false,
  })

  function handleChange(e){
    e.preventDefault();
    const {name, value, type, checked} = e.target;
    // console.log(name);
    setEdit((prevData) => {
      return{
      ...prevData,
        [name]: type === "checkbox" ? checked : value
      }})
      console.log(edit);
  }

  const taskList = props.taskList.map((task) => {
    return(
      <form className="task-box">
        <div key={task.id} >
          <div className='box-top'>
            <FormControl fullWidth >
              <FormControlLabel
                name="task"
                value={task.task}
                control={<TextField label="Task" variant="outlined" fullWidth />}
                onChange={handleChange}
                />
            </FormControl>
            <FormControl >
              <FormControlLabel
                name="who"
                value={task.who}
                control={<TextField label="Assignee" variant="outlined" />}
                onChange={handleChange}
                />
            </FormControl>
          </div>
          <div className='box-bottom'>
            <div >
              <FormControl >
                <FormControlLabel
                  control={<Checkbox />}
                  label="Done"
                  name="done"
                  checked={task.done}
                  onChange={handleChange}
                  />
              </FormControl>  
            </div>
            <div >
              <FormControl >
                <FormControlLabel
                  name="dueDate"
                  value={task.dueDate}
                  control={<TextField label="Due Date" variant="outlined" />}
                  onChange={handleChange}
                  />
              </FormControl>
            </div>
          </div>
          <div className='tasklist-btn'>
            <FormControl fullWidth >
              <Button
                className="task-edit-btn"
                variant="contained"
                color="warning" 
                size="small" 
                onClick={handleChange} 
                startIcon={<EditIcon />}>
                  Edit 
              </Button>
            </FormControl>
            <FormControl fullWidth >
              <Button
                className="task-remove-btn"
                variant='outlined'
                color="error"
                size="small" 
                onClick={handleChange} 
                startIcon={<DeleteIcon />}>
                  Remove 
              </Button>
            </FormControl>            
          </div>
        </div>
      </form>
    );
  })
  return (taskList);
}

export default TaskList;