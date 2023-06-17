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
  const [error, setError] = useState(false);
  const [marker, setMarker] = useState("info");
  const [notify, setNotify] = useState("Click in Search Assignee and type name to filter list, then select assignee and hit enter to show to do tasks.");
  const [tasks, setTasks] = useState([]);
  const loading = open && tasks.length === 0;

  function saveNewTask(newTask) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask)
    };
    const url = `http://localhost:4000/api/tasks`;
    (async () => {
      await fetch(url, requestOptions)
        .then(response => {
          return response.json();
        })
        .then(data => {
          if (!data.error) {
            setNotify(`Last saved: Task "${data.task}" assigned to ${data.who} due on ${data.dueDate} was saved successfully!`);
            setSaved(true);
            setError(false);
          } else {
            setNotify(`Last submission did not save, error: ${data.error}`);
            setSaved(false);
            setError(true);
          }
        })
    })();
  }

  function Filtered(serachTerm) {
    const url = `http://localhost:4000/api/tasks?who=${serachTerm}`;
    (async () => {
      await fetch(url)
        .then(response => {
          return response.json();
        })
        .then(data => {
          // console.log(data)
          // if (!data.error) {
          //   setNotify(`Last saved: Task "${data.task}" assigned to ${data.who} due on ${data.dueDate} was saved successfully!`);
          //   setSaved(true);
          //   setError(false);
          // } else {
          //   setNotify(`Last submission did not save, error: ${data.error}`);
          //   setSaved(false);
          //   setError(true);
          // }
        })
    })();
  }



  function SaveEdit(newTask) {
    const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask)
    };
    const url = `http://localhost:4000/api/tasks/${newTask._id}`;
    (async () => {
      await fetch(url, requestOptions)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data)
          // if (!data.error) {
          //   // setTasks([]);
          //   setSaved(true);
          //   return data;
          // }
        })
        .catch(err => {
          return err;
        })
    })();
    //console.log(result());
  }

  function openTask() {
    setShow(prevOpen => !prevOpen);
    setCompose(prevCompose => !prevCompose);
    
    setNotify("Click in Search Assignee and type name to filter list, then select assignee and hit enter to show to do tasks.");
    setMarker("info");
    setSaved(false);
    setError(false);
  }



  useEffect(() => {
    (async () => {
      await fetch("http://localhost:4000/api/tasks")
        .then(response => {
          return response.json();
        })
        .then(data => {
          // console.log(data);
          setTasks([...data]);
          setOpen(open => !open);
        })
    })();
  }, [loading]);

  // React.useEffect(() => {
  //   if (!open) {
  //     setTasks([]);
  //   }
  // }, [open]);

  useEffect(() => {
    if (!saved && !error) {
      setMarker("info");
    } else if (saved && !error) {
      setMarker("success");
    } else if (!saved && error ) {
      setMarker("error");
    }
  },[saved, error]);

  return (
    <div className='over-box'>
      <div className='box-in-box'>
        <Search Searcher={Filtered} />
        <Alert severity={marker}>{notify}</Alert>
        <div className='add-box'>
          <AddTask handleClick={openTask} sign={show} />
          {compose && <WriteTask Saving={saveNewTask} Notification={saved} />}
        </div>
      </div>
      <div>
        <TaskList taskList={tasks} SaveEdit={SaveEdit} />
      </div>
    </div>
  )
}

export default Timetask;