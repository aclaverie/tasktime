import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { useState, useEffect } from 'react';

function Search(props) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [tasksD, setTasksD] = useState([]);
  // This loading allows for the Search List to be reloaded any time open for updated listing
  const loading = open;

  useEffect(() => {
    //Set loading to be true from focus
    let active = true;
    //Check loading to get Tasks Listing else break out
    //Do not get Tasks Listing
    if (!loading) {
      return undefined;
    }
    //Use of iFFY to automatically asynchornously fetch Tasks Data to extract Assignees (prop: who)
    (async () => {
      await fetch(`https://timetaskapi.onrender.com/api/tasks`)
        .then(response => {
          return response.json();
        })
        .then(data => {
          if (!data.error) {
            const selOpt = [];
            //A default option to show all records from dropdown
            selOpt[0] = 'Full List';
            if (data.length !== 1) {
              //Extract the who for assignee to use in search drop list
              data.map((d, key) => ( selOpt[key+1] = d.who ));
              //create unique records simply remove dubplicates
              const uniqueData = [...new Set(selOpt)];
              //Set Search Dropdown with unique Assignee Listing
              if (active) { setTasksD([...uniqueData]); }
            } else {
              data.map((d, key) => ( selOpt[key] = d.who ));
              if (active) { setTasksD([...selOpt]); }
            }
          } else if (data.error === 'No records found.') {
            setOpen(false);        
          }
        })
    })();
    //Set active action to false
    return () => {
      active = false;
    };
  }, [loading, props.Searched, inputValue]);

  useEffect((props) => {
    (async () => {
      const url = (inputValue === 'Full List') ? `https://timetaskapi.onrender.com/api/tasks` : `https://timetaskapi.onrender.com/api/tasks?who=${inputValue}`;
      await fetch(url)
        .then(response => {
          return response.json();
        })
        .then(data => {
          if (!data.error) {
            props.Searcher([...data]);
          }
        })
    })();
  }, [inputValue, props.Searched]);

  return (
    <div className='search'>
      <Autocomplete
        open={open}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        isOptionEqualToValue={(option, value) => option.id === value.id}
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