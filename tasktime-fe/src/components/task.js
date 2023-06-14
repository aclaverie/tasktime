import { Checkbox, FormControl, FormControlLabel, TextField } from '@mui/material';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import { useState } from 'react';



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
    console.log(name);
    setEdit((prevData) => {
      return{
      ...prevData,
        [name]: type === "checkbox" ? checked : value
      }})
      console.log(edit);
  }

  const taskList = props.taskList.map((task) => {
    return(
      <form>
        <div key={task.id} className="task-box">
          <div className='box-top'>
            <FormControl >
              <FormControlLabel
                control={<Checkbox />}
                label="Task"
                name="task"
                checked={task.task}
                onChange={handleChange}
                />
            </FormControl>      
            <div >Task:<br /> {task.task}</div>
            <div >Assignee:<br /> {task.who}</div>
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
              DueDate: {task.dueDate}
            </div>
          </div>
          <div className='box-button'>
            <Button
              style={{marginRight: 12}}
              variant="outlined" 
              size="small" 
              onClick={handleChange} 
              startIcon={<EditIcon />}>
                Edit 
            </Button>
            <Button 
              variant="outlined" 
              size="small" 
              onClick={handleChange} 
              startIcon={<DeleteIcon />}>
                Remove 
            </Button>
          </div>
        </div>
      </form>
    );
  })
  return (taskList);
}

export default TaskList;