import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';



function Search(props) {
  const [open, setOpen] = useState(false);
  // const [active, setActive] = useState(true);
  const [tasksD, setTasksD] = useState([]);
  const loading = open && tasksD.length === 0;


  React.useEffect(() => {
    // //Set loading to be true from focus
    let active = true;
    //Check loading to get Tasks Listing else break out
    //Do not get Tasks Listing
    if (!loading) {
      return undefined;
    }
    //Use of iFFY to automatically asynchornously fetch Tasks Data to extract Assignees (prop: who)
    (async () => {
      await fetch("http://localhost:4000/api/tasks")
        .then(response => {
          return response.json();
        })
        .then(data => {
          const selOpt = [];
          //Extract the who for assignee to use in search drop list
          const whoData = data.map((d) => {
            return selOpt[d._id] = d.who;
          });
          //create unique records simply remove dubplicates
          const uniqueData = [...new Set(whoData)];
          //Set Tasks Listing
          if (active) {
            setTasksD([...uniqueData]);
          }
        })
    })();
    //Set active action to false
    return () => {
      active = false;
    };
  }, [loading]);

  //
  React.useEffect(() => {
    if (!open) {
      setTasksD([]);
    }
  }, [open]);

  //Handle search clicked to return records
  function choosen(e) {
    // console.log(e.target.value);
    props.Searcher(e.target.value);
  }

  return (
    <div className='search'>
      <Autocomplete
        sx={{}}
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
        options={tasksD.map((d) => (d))}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Assignee"
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