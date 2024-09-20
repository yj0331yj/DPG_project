import React from 'react';
import { Search, FileSpreadsheet, Mail, MessageSquare, Brain, Calendar, Cloud, Database, FileText, Trello, GitBranch, Linkedin, Facebook, Instagram, Globe, Rss, Share2, Code } from 'lucide-react';

const AppItem = ({ icon, name, count, color, onSelect }) => (
  <div className="flex flex-col items-center p-2 hover:bg-gray-100 cursor-pointer" onClick={() => onSelect({ icon, name, color })}>
    <div className={`p-4 rounded-full mb-2`} style={{ backgroundColor: color }}>
      {React.cloneElement(icon, { color: 'white', size: 32 })}
    </div>
    <span className="text-center text-sm font-medium">{name}</span>
    <span className="bg-gray-200 rounded-full px-2 py-1 text-xs mt-1">{count}</span>
  </div>
);

// Custom X icon component
const XIcon = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.5 3.75L19.5 20.25" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19.5 3.75L4.5 20.25" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Popup = ({ onClose, isExpanded, onSelectIcon }) => {
  const handleSelectIcon = (iconData) => {
    onSelectIcon(iconData);
    onClose();
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"
        onClick={onClose}
      >
        <div
          className={`bg-white rounded-lg shadow-lg w-[32rem] max-h-[80vh] flex flex-col transition-all duration-300 ease-in-out ${
            isExpanded ? 'ml-64' : 'ml-16'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 flex-1 overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">모든 앱</h2>
            <div className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="앱 또는 모듈 검색"
                  className="w-full pl-10 pr-4 py-2 border rounded-md"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <AppItem icon={<FileSpreadsheet size={24} />} name="Google Sheets" count={8} color="#0F9D58" onSelect={handleSelectIcon} />
              <AppItem icon={<Mail size={24} />} name="Gmail" count={15} color="#D44638" onSelect={handleSelectIcon} />
              <AppItem icon={<MessageSquare size={24} />} name="Slack" count={12} color="#4A154B" onSelect={handleSelectIcon} />
              <AppItem icon={<Brain size={24} />} name="OpenAI" count={16} color="#10A37F" onSelect={handleSelectIcon} />
              <AppItem icon={<Calendar size={24} />} name="Google Calendar" count={5} color="#4285F4" onSelect={handleSelectIcon} />
              <AppItem icon={<Cloud size={24} />} name="Dropbox" count={7} color="#0061FF" onSelect={handleSelectIcon} />
              <AppItem icon={<Database size={24} />} name="Airtable" count={9} color="#FCB400" onSelect={handleSelectIcon} />
              <AppItem icon={<FileText size={24} />} name="Notion" count={11} color="#000000" onSelect={handleSelectIcon} />
              <AppItem icon={<Trello size={24} />} name="Trello" count={6} color="#0079BF" onSelect={handleSelectIcon} />
              <AppItem icon={<GitBranch size={24} />} name="GitHub" count={14} color="#181717" onSelect={handleSelectIcon} />
              <AppItem icon={<XIcon size={24} />} name="X" count={3} color="#000000" onSelect={handleSelectIcon} />
              <AppItem icon={<Linkedin size={24} />} name="LinkedIn" count={2} color="#0A66C2" onSelect={handleSelectIcon} />
              <AppItem icon={<Facebook size={24} />} name="Facebook" count={4} color="#1877F2" onSelect={handleSelectIcon} />
              <AppItem icon={<Instagram size={24} />} name="Instagram" count={1} color="#E4405F" onSelect={handleSelectIcon} />
              <AppItem icon={<Globe size={24} />} name="WordPress" count={10} color="#000000" onSelect={handleSelectIcon} />
              <AppItem icon={<Globe size={24} />} name="HTTP" count={8} color="#0000FF" onSelect={handleSelectIcon} />
              <AppItem icon={<Rss size={24} />} name="RSS" count={5} color="#FFA500" onSelect={handleSelectIcon} />
              <AppItem icon={<Code size={24} />} name="Text parser" count={7} color="#FF6347" onSelect={handleSelectIcon} />
            </div>
          </div>
          <div className="p-6 border-t">
            <button
              onClick={onClose}
              className="w-full py-2 bg-red-500 text-white rounded-md"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Popup;
