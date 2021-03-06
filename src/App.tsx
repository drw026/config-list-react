import React from 'react';
import AddConfiguration from "./components/AddConfiguration/AddConfiguration";
import ConfigurationListProvider from "./context/ConfigurationListContext";
import ConfigurationList from "./components/ConfigurationList/ConfigurationList";
import './App.scss';

function App() {
  return (
      <ConfigurationListProvider>
          <div className="App">
              <div className="container-fluid">
                  <div className="container">
                      <AddConfiguration/>
                  </div>
                  <ConfigurationList/>
              </div>
          </div>
      </ConfigurationListProvider>
  );
}

export default App;
