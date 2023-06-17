import React from 'react';
import { useState } from 'react';
import { Checkbox, FormControl, FormControlLabel, TextField } from '@mui/material';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function TaskBox(props) {
  console.log(props)
  const [taskEdit, setTaskEdit] = useState(true);
  const [edit, setEdit] = useState({
    id: props.data._id,
    task: props.data.task,
    who: props.data.who,
    dueDate: props.data.dueDate,
    done: props.data.done
  })

  function handleChange(e) {
    e.preventDefault();
    const { name, value, type, checked } = e.target;
    // console.log(name);
    setEdit((prevData) => {
      return {
        ...prevData,
        [name]: type === "checkbox" ? checked : value
      }
    })
    // console.log(edit);
  }

  function setItEditable(e) {
    e.preventDefault();
    setTaskEdit(prevEd => !prevEd);
  }

  function ToSaveEdit(e){
    e.preventDefault();
    // props.SaveEdit.SaveEdit(edit);
  }

  // const edBtn = <Button
  //   className="task-edit-btn"
  //   variant="contained"
  //   color="warning"
  //   size="small"
  //   name="Edit"
  //   onClick={setItEditable}
  //   startIcon={<EditIcon />}>
  //   Edit
  // </Button>;

  // const subBtn = <Button
  //   className="task-edit-btn"
  //   variant="contained"
  //   color="warning"
  //   size="small"
  //   name="Submit"
  //   onClick={props.saveIt(edit)}
  //   startIcon={<EditIcon />}>
  //   Submit
  // </Button>

  // const buttonSym = (taskEdit) ? edBtn : subBtn;



  return (
    <div key={edit.id} >
      <div className='box-top'>
        <FormControl fullWidth >
          <FormControlLabel
            disabled={taskEdit}
            name="task"
            value={edit.task}
            control={<TextField label="Task" variant="outlined" fullWidth />}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl >
          <FormControlLabel
            disabled={taskEdit}
            name="who"
            value={edit.who}
            control={<TextField label="Assignee" variant="outlined" />}
            onChange={handleChange}
          />
        </FormControl>
      </div>
      <div className='box-bottom'>
        <div >
          <FormControl >
            <FormControlLabel
              disabled={taskEdit}
              control={<Checkbox />}
              label="Done"
              name="done"
              checked={edit.done}
              onChange={handleChange}
            />
          </FormControl>
        </div>
        <div >
          <FormControl >
            <FormControlLabel
              disabled={taskEdit}
              name="dueDate"
              value={edit.dueDate}
              control={<TextField label="Due Date" variant="outlined" />}
              onChange={handleChange}
            />
          </FormControl>
        </div>
      </div>
      <div className='tasklist-btn'>
        <FormControl fullWidth >
          {!taskEdit && <Button
            className="task-edit-btn"
            variant="contained"
            color="warning"
            size="small"
            name="Edit"
            onClick={setItEditable}
            startIcon={<EditIcon />}>
            Edit
          </Button>}
          {taskEdit && <Button
            className="task-edit-btn"
            variant="contained"
            color="warning"
            size="small"
            name="Submit"
            onClick={ToSaveEdit}
            startIcon={<EditIcon />}>
            Submit
          </Button>}
        </FormControl>
        <FormControl fullWidth >
          <Button
            className="task-remove-btn"
            variant='outlined'
            color="error"
            size="small"
            onClick={setItEditable}
            startIcon={<DeleteIcon />}>
            Remove
          </Button>
        </FormControl>
      </div>
    </div>
  )
}

export default TaskBox;