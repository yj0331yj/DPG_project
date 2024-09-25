import React, { useState } from 'react';
import { Lightbulb } from 'lucide-react';
import OpenAIConnectionForm from './OpenAIConnectionForm';

const ConnectionPopup = ({ onClose, onConfirm }) => {
  const [showOpenAIForm, setShowOpenAIForm] = useState(false);

  const handleCreateConnection = () => {
    setShowOpenAIForm(true);
  };

  if (showOpenAIForm) {
    return <OpenAIConnectionForm onClose={() => setShowOpenAIForm(false)} onSave={onConfirm} />;
  }

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-[32rem] flex flex-col">
        <div className="p-6 flex-1">
          <h2 className="text-lg font-semibold mb-4">연결</h2>
          <button
            onClick={handleCreateConnection}
            className="bg-teal-500 text-white p-4 rounded-md flex items-center mb-4 w-full hover:bg-teal-600 transition-colors"
          >
            <div className="mr-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-lg">연결 생성</span>
          </button>
          <div className="flex items-start mb-4">
            <Lightbulb className="text-yellow-400 mr-2 mt-1" size={20} />
            <p className="text-gray-600 text-sm">
              OpenAI(ChatGPT, Whisper, DALL-E)에 대한 연결을 생성하는 방법에 대한 자세한 정보는 <a href="#" className="text-purple-600 hover:underline">온라인 도움말</a>을 참조하세요.
            </p>
          </div>
        </div>
        <div className="p-6 border-t flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md mr-2"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-purple-600 text-white rounded-md"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConnectionPopup;
