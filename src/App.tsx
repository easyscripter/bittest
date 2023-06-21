import React from 'react';
import Header from './components/Header/Header';
import { Routes, Route, BrowserRouter } from "react-router-dom"
import Panel from './pages/Panel/Panel';
import Sidebar from './components/Sidebar/Sidebar';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header
          title='Энергия'
          logo='/assets/images/logo.svg'
        >
        </Header>
        <div style={{display: 'flex', height: '93vh'}}>
          <Sidebar/>  
          <div style={{width: '100%'}}>
            <Routes>
              <Route path='/panel' Component={Panel}/>
            </Routes>
          </div>
        </div>

      </BrowserRouter>
    </div>
  );
}

export default App;
