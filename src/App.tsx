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
        <div style={{display: 'flex'}}>
          <Sidebar/>  
          <div style={{flex: 2}}>
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
