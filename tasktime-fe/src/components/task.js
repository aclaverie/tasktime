import React from 'react';
import TaskBox from './taskbox';


function TaskList(props) {
  const taskList = props.taskList.map((task) => {
    return (
      <form className="task-box" key={task._id}>
        <TaskBox data={task} RecToDelete={props.RecDelete} />
      </form>
    );
  })
  return (taskList);
}

export default TaskList;