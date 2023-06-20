import React from 'react';
import { useState } from 'react';
import { Checkbox, FormControl, FormControlLabel, TextField } from '@mui/material';
import { Button } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';

function WriteTask(props) {
  const [value, setValue] = useState('');
  const [newTask, setNewTask] = useState({
    task: '',
    desc: '',
    who: '',
    dueDate: '',
    done: false,
  })

  function handleSubmit(e) {
    e.preventDefault();
    const dDate = value.$d.toLocaleDateString();
    setNewTask((prevData) => {
      prevData.dueDate = dDate;
      return {
        prevData
      }
    });
    props.Saving(newTask);
    setNewTask({
      task: '',
      desc: '',
      who: '',
      dueDate: '',
      done: false,
    });
    setValue('');
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setNewTask((prevTask) => {
      return {
        ...prevTask,
        [name]: (type === "checked") ? checked : value,
      }
    });
  }

  return (
    <form className='form-box'>
      <div className='box-top'>
        <FormControl fullWidth >
          <FormControlLabel
            name="task"
            value={newTask.task}
            control={<TextField label="Task Name" variant="outlined" fullWidth />}
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
      <div className='box-middle'>
        <FormControl fullWidth>
          <FormControlLabel
            name="desc"
            value={newTask.desc}
            control={<TextField label="Description" variant="outlined" fullWidth />}
            onChange={handleChange}
          />
        </FormControl>
      </div>
      <div className='box-bottom'>
        <div >
          <FormControl >
            <FormControlLabel
              name="done"
              checked={newTask.done}
              control={<Checkbox />}
              label="Done"
              onChange={handleChange}
            />
          </FormControl>
        </div>
        <div >
          <FormControl >
            <FormControlLabel
              name="dueDate"
              value={value}
              onChange={(newValue) => setValue(newValue)}
              control={
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DateField']}>
                    <DateField label="DueDate" value={value}
                      onChange={(newValue) => setValue(newValue)} />
                  </DemoContainer>
                </LocalizationProvider>
              }
            />
          </FormControl>
        </div>
      </div>
      <div className='box-btn'>
        <FormControl fullWidth >
          <Button variant='contained' onClick={handleSubmit} color="error" >Submit</Button>
        </FormControl>
      </div>
    </form>
  )
}

export default WriteTask;