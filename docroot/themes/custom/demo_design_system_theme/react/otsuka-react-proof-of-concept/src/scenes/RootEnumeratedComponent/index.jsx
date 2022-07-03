import logo from "../../logo.svg";

const RootEnumeratedComponent = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <p>Enumarated components goes here</p>
        <h1>Huraaay : Enumerated Component</h1>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default RootEnumeratedComponent;
