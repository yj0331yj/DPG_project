import React, { useState } from 'react';
import { ChevronDown, Lightbulb } from 'lucide-react';

const OpenAIConnectionForm = ({ onClose, onSave }) => {
  const [connectionName, setConnectionName] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [organizationId, setOrganizationId] = useState('');

  const handleSave = () => {
    onSave({ connectionName, apiKey, organizationId });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-[32rem] flex flex-col">
        <div className="p-6 flex-1">
          <h2 className="text-lg font-semibold mb-4">OpenAI 연결</h2>
          <div className="space-y-4">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <ChevronDown size={16} className="mr-1" />
                연결 이름
              </label>
              <input
                type="text"
                value={connectionName}
                onChange={(e) => setConnectionName(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <ChevronDown size={16} className="mr-1" />
                API 키
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
              <div className="flex items-start mt-1">
                <Lightbulb className="text-yellow-400 mr-2 mt-1" size={16} />
                <p className="text-xs text-gray-600">
                  <a href="https://platform.openai.com/account/api-keys" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">OpenAI 계정 API 키</a>에서 API 키를 생성하세요.
                </p>
              </div>
            </div>
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <ChevronDown size={16} className="mr-1" />
                조직 ID
              </label>
              <input
                type="text"
                value={organizationId}
                onChange={(e) => setOrganizationId(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
              <div className="flex items-start mt-1">
                <Lightbulb className="text-yellow-400 mr-2 mt-1" size={16} />
                <p className="text-xs text-gray-600">
                  <a href="https://platform.openai.com/account/org-settings" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">OpenAI 조직 설정</a>에서 조직 ID를 확인하세요.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 border-t flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md mr-2"
          >
            닫기
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-purple-600 text-white rounded-md"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default OpenAIConnectionForm;
