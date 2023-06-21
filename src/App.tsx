import React from 'react';
import Header from './components/Header/Header';
import { Routes, Route, BrowserRouter } from "react-router-dom"
import Panel from './pages/Panel/Panel';
import Sidebar from './components/Sidebar/Sidebar';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

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
          <DndProvider backend={HTML5Backend}>
            <div style={{width: '100%'}}>
              <Routes>
                <Route path='/panel' Component={Panel}/>
              </Routes>
            </div>
          </DndProvider>
        </div>

      </BrowserRouter>
    </div>
  );
}

export default App;
