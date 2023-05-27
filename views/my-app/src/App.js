import logo from './logo.svg';
import './App.css';

function MyButton()
{
  function handleClick(){
    alert('You clicked me!')
  }
  return(
      <button onClick={handleClick} className='button'>
        Click me!

      </button>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          Welcome Angelica!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <div >
          <MyButton className="button" />
        </div>

      </header>

    </div>
  );
}

export default App;
