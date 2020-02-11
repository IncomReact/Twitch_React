import React from 'react';
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import Games from './components/Games/Games'
import './App.scss';

function App() {
  return (
    <div className="App">
      <Header />
      <Sidebar />
      <Games />
    </div>
  );
}

export default App;
