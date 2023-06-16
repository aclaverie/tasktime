import React from 'react';
import { useState } from 'react';
import { Checkbox, FormControl, FormControlLabel, TextField } from '@mui/material';
import { Button } from '@mui/material';

function WriteTask(){
  const [newTask, setNewTask] = useState({
    task: "",
    who: "",
    dueDate: "",
    done: false,
  })

  function handleSubmit(e){
    e.preventDefault();
    console.log({newTask});
  }

  function handleChange(e){
    e.preventDefault();
    const {name, value, type, checked} = e.target;
    setNewTask((prevTask)=>{
      return {
        ...prevTask,
        [name]: (type === "checked") ? {checked} : {value},
      }
    });
  }
  return(
    <form className='form-box'>
        <div className='box-top'>
          <FormControl fullWidth >
            <FormControlLabel
              name="task"
              value={newTask.task}
              control={<TextField label="Task" variant="outlined" fullWidth />}
              onChange={handleChange}
              />
          </FormControl>
          <FormControl >
            <FormControlLabel
              name="who"
              value={newTask.who}
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
                checked={newTask.done}
                onChange={handleChange}
                />
            </FormControl>  
          </div>
          <div >
          <FormControl >
            <FormControlLabel
              name="dueDate"
              value={newTask.dueDate}
              control={<TextField label="Due Date" variant="outlined" />}
              onChange={handleChange}
              />
          </FormControl>
          </div>
        </div>
        <div className='box-btn'>
          <FormControl fullWidth >
            <Button variant='contained' onClick={handleSubmit} color="warning">Submit</Button>
          </FormControl>
        </div>
    </form>
  )
}

export default WriteTask;