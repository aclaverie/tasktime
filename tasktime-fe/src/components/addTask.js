import React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function AddTask(props){
  const symbol = (props.sign) ? <RemoveIcon size="small" /> : <AddIcon size="small" />;
  return(
      <div className="app-compose">
          <Button 
              variant="outlined" 
              size="large" 
              onClick={props.handleClick} 
              endIcon={symbol}>
                  New Task 
          </Button>
      </div>
  );
}

export default AddTask;