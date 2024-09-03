import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Settings, Plus, ArrowLeft } from 'lucide-react';

export const TopBar = ({ isExpanded }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isNewScenarioPage = location.pathname === '/new-scenario';

  return (
    <div className="bg-white border-b">
      <div className="flex justify-between items-center p-4">
        {isNewScenarioPage ? (
          <>
            <div className="flex items-center">
              <button onClick={() => navigate(-1)} className="mr-4">
                <ArrowLeft size={24} />
              </button>
              <h1 className="text-2xl font-bold">새 시나리오</h1>
            </div>
            <div></div>  {/* 우측 여백을 위한 빈 div */}
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold">내 팀</h1>
            <div className="flex space-x-2">
              <button className="px-3 py-2 border rounded-md flex items-center">
                <Settings size={16} className="mr-2" />
                팀 설정
              </button>
              <button
                className="px-3 py-2 bg-sky-400 text-white rounded-md flex items-center"
                onClick={() => navigate('/new-scenario')}
              >
                <Plus size={16} className="mr-2" />
                새 시나리오 만들기
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
