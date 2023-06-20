import React from 'react';
import { useState, useEffect } from 'react';
import { Alert } from '@mui/material';
import Search from './search';
import AddTask from './addTask';
import WriteTask from './writeTask';
import TaskList from './task';

function Timetask() {
  const [compose, setCompose] = useState(false);
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [recDelete, setRecDelete] = useState(false);
  const [marker, setMarker] = useState("info");
  const [notify, setNotify] = useState("Click in Search Assignee and type name to filter list, then select to show all to do tasks for that selection.");
  const [tasks, setTasks] = useState([]);
  const loading = open && tasks.length === 0;

  useEffect(() => {
    (async () => {
      await fetch(`https://timetaskapi.onrender.com/api/tasks`)
        .then(response => {
          return response.json();
        })
        .then(data => {
          if (!data.error) {
            setTasks([...data]);
            setOpen(open => !open);
            if (recDelete) {
              Notifier(data, 'delete');
            }
          } else if (data.error === 'No records found.') {
            setTasks([]);
            Notifier(data, 'none');
          }
        })
    })();
  }, [loading, saved, recDelete]);

  function Notifier(data, flag) {
    switch (flag) {
      case ('save'):
        if (!data.error) {
          setMarker("success");
          setNotify(`Last saved: Task "${data.task}" assigned to ${data.who} due on ${data.dueDate} was saved successfully!`);
        } else {
          setMarker("error");
          setNotify(`Last submission did not save, error: ${data.error}`);
        }
        break;
      case ('standard'):
        if (!data.error) {
          setMarker("info");
          setNotify(`Click in Search Assignee and type name to filter list, then select to show all to do tasks for that selection.`);
        }
        break;
      case ('delete'):
        setMarker("error");
        setNotify('Record has been deleted!');
        break;
      case ('none'):
        setMarker("info");
        setNotify('Add a new task!');
        break;
      default:
        setMarker("info");
        setNotify(`Click in Search Assignee and type name to filter list, then select to show all to do tasks for that selection.`);
        break;
    }
  }

  function saveNewTask(newTask) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask)
    };
    const url = `https://timetaskapi.onrender.com/api/tasks`;
    (async () => {
      await fetch(url, requestOptions)
        .then(response => {
          return response.json();
        })
        .then(data => {
          Notifier(data, 'save');
          setSaved(prevSa => !prevSa);
        })
    })();
    
  }

  function openTask() {
    setShow(prevOpen => !prevOpen);
    setCompose(prevCompose => !prevCompose);
    if (tasks.length === 0) {
      Notifier(tasks, 'none');
    } else if (tasks.length !== 0) {
      Notifier(tasks, 'standard');
    }
  }

  return (
    <div className='over-box'>
      <div className='box-in-box'>
        <Search Searcher={setTasks} Searched={recDelete} />
        <Alert severity={marker}>{notify}</Alert>
        <div className='add-box'>
          <AddTask handleClick={openTask} sign={show} />
          {compose && <WriteTask Saving={saveNewTask} />}
        </div>
      </div>
      <div>
        <TaskList taskList={tasks} RecDelete={setRecDelete} />
      </div>
    </div>
  )
}

export { Timetask };


