import React, { useState } from 'react';
import Header from './components/Header/Header';
import { Routes, Route, BrowserRouter } from "react-router-dom"
import Panel from './pages/Panel/Panel';
import Sidebar from './components/Sidebar/Sidebar';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const App = () => {
  const [isShowBar, setIsShowBar] = useState(false);
  return (
    <div>
      <BrowserRouter>
        <Header
          title='Энергия'
          logo='/assets/images/logo.svg'
          onShowMobileSidebar={() => setIsShowBar(prevState => !prevState)}
        >
        </Header>
        <div style={{display: 'flex', height: '93vh'}}>
          <Sidebar isShow={isShowBar}/>  
          <DndProvider backend={HTML5Backend}>
            <div style={{flex: '1', overflowX: 'hidden'}}>
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
