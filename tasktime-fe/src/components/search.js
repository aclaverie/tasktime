import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';
import { Select } from '@mui/material';
// import { allTaskData } from './model/taskData';



function Search(){
  const [open, setOpen] = useState(false);
  const [tasksD, setTasksD] = useState([]);
  const loading = open && tasksD.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    //Use of iFFY to automatically fetch Tasks Data to extract Assignees (Who)
    (async () => {
      await fetch("http://localhost:4000/api/tasks")
        .then(response => {
          return response.json();
      })
        .then(data => {
          //Extract the who for assignee to use in search
          const whoData = data.map((d)=>( d.who));          
          const uniqueData = [...new Set(whoData)];

          if (active) {
            //create unique records simply remove dubplicates
            setTasksD([...uniqueData]);
          }
        })
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setTasksD([]);
    }
  }, [open]);

function choosen(e){
  console.log(e.target.value);
}

  return (
    <div className='search'>
      <Autocomplete
        id="asynchronous-search"
        fullWidth
        sx={{ width: 720 }}
        open={open}
        onSelect={choosen}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        // isOptionEqualToValue={(option, value) => option.assignee === value}
        // getOptionLabel={(option) => option.assignee}
        options={tasksD.map((option) => (option))}
        loading={loading}
        renderInput={(params) => (
          <TextField
            
            {...params}
            label="Assignee Search"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress color="inherit" size={10} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
  

 
    
      
    </div>
  );
}

export default Search;