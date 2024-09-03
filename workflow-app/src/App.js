import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MainDashboard } from './components/MainDashboard';
import { NewScenario } from './components/NewScenario';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import BottomToolbar from './components/BottomToolbar';

function App() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <Router>
      <div className="flex h-screen overflow-hidden">
        <Sidebar
          isExpanded={isExpanded}
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
        />
        <div className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${isExpanded ? 'ml-64' : 'ml-16'}`}>
          <TopBar isExpanded={isExpanded} />
          <div className="flex-1 overflow-hidden">
            <Routes>
              <Route path="/" element={<MainDashboard isExpanded={isExpanded} />} />
              <Route path="/new-scenario" element={<NewScenario isExpanded={isExpanded} />} />
              {/* 다른 라우트들을 여기에 추가하세요 */}
            </Routes>
          </div>
          <BottomToolbar isExpanded={isExpanded} />
        </div>
      </div>
    </Router>
  );
}

export default App;
