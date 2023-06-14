import React from 'react';
import { useState } from 'react';
import Search from './search';
import AddTask from './addTask';
import WriteTask from './writeTask';
import TaskList from './task';


function Timetask(){
  const [compose, setCompose] = useState(false);
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const loading = open && tasks.length === 0;

  function openTask(){
    setShow(prevOpen => !prevOpen);
    setCompose(prevCompose => !prevCompose);    
  }

  React.useEffect(() => {
    (async () => {
      await fetch("http://localhost:4000/api/tasks")
        .then(response => {
          return response.json();
      })
        .then(data => {
          // console.log(data);
          setTasks([...data]);
      })
    })();
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setTasks([]);
    }
  }, [open]);

  return(
    <div>
      <div>
        <Search />
        <div className='task-btn'>
          <AddTask handleClick={openTask} sign={show} />
          {compose && <WriteTask />}
        </div>
      </div>
      <div>
        <TaskList taskList={tasks}/>
      </div>
    </div>
  )
}

export default Timetask;