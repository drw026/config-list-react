import React from 'react';
import AddConfiguration from "./components/AddConfiguration/AddConfiguration";
import ConfigurationList from "./components/ConfigurationList/ConfigurationList";
import './App.scss';

function App() {
  return (
    <div className="App">
      <div className="container">
          <AddConfiguration />
          <ConfigurationList />
      </div>
    </div>
  );
}

export default App;
