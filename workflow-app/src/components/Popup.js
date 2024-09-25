import React, { useState } from 'react';
import { Search, FileSpreadsheet, Mail, MessageSquare, Brain, Calendar, Cloud, Database, FileText, Trello, GitBranch, Linkedin, Facebook, Instagram, Globe, Rss, Share2, Code, CheckSquare, MessageCircle, PenTool, FileJson, Image, Edit, Headphones, FileAudio, ShieldCheck, AudioLines, FolderPlus, Upload, List, FileSearch, FilePlus2, XCircle, Terminal } from 'lucide-react';
import ConnectionPopup from './ConnectionPopup';

const AppItem = ({ icon, name, count, color, onSelect }) => (
  <div className="flex flex-col items-center p-2 hover:bg-gray-100 cursor-pointer" onClick={() => onSelect({ icon, name, color })}>
    <div className={`p-4 rounded-full mb-2`} style={{ backgroundColor: color }}>
      {React.cloneElement(icon, { color: 'white', size: 32 })}
    </div>
    <span className="text-center text-sm font-medium">{name}</span>
    <span className="bg-gray-200 rounded-full px-2 py-1 text-xs mt-1">{count}</span>
  </div>
);

const XIcon = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.5 3.75L19.5 20.25" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19.5 3.75L4.5 20.25" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const OpenAIFunctionsPopup = ({ onClose, onSelectFunction }) => {
  const [showConnectionPopup, setShowConnectionPopup] = useState(false);
  const [selectedFunction, setSelectedFunction] = useState(null);

  const functions = [
    { 
      name: "배치 완료 감시", 
      description: "배치 작업이 완료되면 트리거됩니다.",
      icon: <CheckSquare size={24} />
    },
    {
      name: "AI 어시스턴트에게 메시지 보내기",
      description: "지정된 혹은 새로 생성된 스레드에 메시지를 보내고 원활하게 실행합니다. 이 작업은 함수 호출의 인수를 지정된 URL로 보낼 수 있습니다 (POST HTTP 메소드만 가능). Assistants v2와 호환됩니다.",
      icon: <MessageCircle size={24} />
    },
    {
      name: "텍스트 완성 (프롬프트) 생성 (GPT-3, GPT-3.5, GPT-4)",
      description: "프롬프트 또는 채팅에 대한 텍스트 완성을 생성합니다.",
      icon: <PenTool size={24} />
    },
    {
      name: "텍스트를 구조화된 데이터로 변환",
      description: "프롬프트 텍스트에서 정보를 식별하고 구조화된 데이터로 반환합니다.",
      icon: <FileJson size={24} />
    },
    {
      name: "이미지 분석 (Vision)",
      description: "지정된 지침에 따라 이미지를 분석합니다.",
      icon: <Image size={24} />
    },
    {
      name: "이미지 생성",
      description: "DALL-E를 사용하여 이미지를 생성합니다.",
      icon: <Image size={24} />
    },
    {
      name: "이미지 편집",
      description: "이미지를 편집하거나 확장합니다.",
      icon: <Edit size={24} />
    },
    {
      name: "음성 번역 (Whisper)",
      description: "오디오를 한국어로 번역합니다.",
      icon: <Headphones size={24} />
    },
    {
      name: "음성 텍스트 변환 (Whisper)",
      description: "오디오를 텍스트로 변환합니다.",
      icon: <FileAudio size={24} />
    },
    {
      name: "콘텐츠 조절",
      description: "텍스트가 OpenAI의 콘텐츠 정책을 위반하는지 분류합니다.",
      icon: <ShieldCheck size={24} />
    },
    {
      name: "오디오 생성",
      description: "텍스트 입력과 설정을 기반으로 오디오 파일을 생성합니다.",
      icon: <AudioLines size={24} />
    },
    {
      name: "벡터 저장소에 파일 추가",
      description: "지정된 벡터 저장소에 파일을 추가하거나, 지정되지 않은 경우 구성에 따라 새 벡터 저장소를 생성합니다.",
      icon: <FolderPlus size={24} />
    },
    {
      name: "파일 업로드",
      description: "OpenAI 플랫폼 전체에서 사용할 파일을 업로드합니다.",
      icon: <Upload size={24} />
    },
    {
      name: "배치 목록 조회",
      description: "배치 목록을 검색합니다.",
      icon: <List size={24} />
    },
    {
      name: "배치 세부 정보 조회",
      description: "지정된 배치의 세부 정보를 검색합니다.",
      icon: <FileSearch size={24} />
    },
    {
      name: "배치 생성",
      description: "API 호출 배치를 생성하고 실행합니다.",
      icon: <FilePlus2 size={24} />
    },
    {
      name: "배치 취소",
      description: "\"진행 중\" 상태의 배치를 취소합니다. 배치는 최대 10분 동안 \"취소 중\" 상태가 되며, 이후 \"취소됨\" 상태로 변경되어 출력 파일에서 부분 결과(있는 경우)를 확인할 수 있습니다.",
      icon: <XCircle size={24} />
    },
    {
      name: "API 호출 실행",
      description: "임의의 승인된 API 호출을 수행합니다.",
      icon: <Terminal size={24} />
    }
  ];

  const handleFunctionSelect = (func) => {
    setSelectedFunction(func);
    setShowConnectionPopup(true);
  };

  const handleConfirmConnection = () => {
    onSelectFunction(selectedFunction);
    onClose();
  };

  if (showConnectionPopup) {
    return <ConnectionPopup onClose={() => setShowConnectionPopup(false)} onConfirm={handleConfirmConnection} />;
  }

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-[32rem] max-h-[80vh] flex flex-col">
        <div className="p-6 flex-1 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">OpenAI 기능 선택</h2>
          <div className="grid grid-cols-1 gap-4">
            {functions.map((func, index) => (
              <button
                key={index}
                className="p-4 border rounded-md hover:bg-gray-100 text-left flex items-center"
                onClick={() => handleFunctionSelect(func)}
              >
                {func.icon}
                <div className="ml-4">
                  <div className="font-semibold">{func.name}</div>
                  <div className="text-sm text-gray-600">{func.description}</div>
                </div>
              </button>
            ))}
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
  );
};

const Popup = ({ onClose, isExpanded, onSelectIcon }) => {
  const [showOpenAIFunctions, setShowOpenAIFunctions] = useState(false);

  const handleSelectIcon = (iconData) => {
    if (iconData.name === "OpenAI") {
      setShowOpenAIFunctions(true);
    } else {
      onSelectIcon(iconData);
      onClose();
    }
  };

  const handleSelectOpenAIFunction = (functionData) => {
    onSelectIcon({ ...functionData, icon: <Brain size={24} />, color: "#10A37F" });
    onClose();
  };

  if (showOpenAIFunctions) {
    return <OpenAIFunctionsPopup onClose={() => setShowOpenAIFunctions(false)} onSelectFunction={handleSelectOpenAIFunction} />;
  }

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
