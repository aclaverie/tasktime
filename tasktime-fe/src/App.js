import CopyrightIcon from '@mui/icons-material/Copyright';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <div className="head-left">
          <div className="head-logo">
            <img src={ process.env.PUBLIC_URL + 'static/images/Out_of_date_clock_icon.svg.png'}
                  alt="clock logo" width="40px" />
            <img src={ process.env.PUBLIC_URL + 'static/images/tasktime_logo.png'}
                  alt="task time logo" width="120px" />
          </div>
        </div>
        <div className="head-right">
          A To-Do List Application.<br />
          Create, Read, Update, and Delete Your Tasks.
        </div>
      </header>
      
      <main className="container">
        <h4>Welcome to Task Time!</h4>        
      </main>
      <div className="App-footer">
        <div className="footer-info">
          A. V. Claverie  <CopyrightIcon sx={{fontSize: 14, marginRight: 1, marginLeft: 1}} />  Powered By React!
        </div>
      </div>
    </div>
  );
}

export default App;
