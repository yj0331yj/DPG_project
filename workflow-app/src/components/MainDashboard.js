import React, { useState } from 'react';
import { FileSpreadsheet, Mail, MessageSquare, Brain, ChevronDown, ChevronUp, Plus } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CollapsibleSection = ({ title, children, isOpen, toggleOpen }) => (
  <div className="border rounded-md my-2">
    <button
      className="w-full flex justify-between items-center p-4 font-semibold"
      onClick={toggleOpen}
    >
      {title}
      {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
    </button>
    {isOpen && <div className="p-4 border-t">{children}</div>}
  </div>
);

const Dashboard = () => {
  const data = [
    { name: '1월', value: 4000 },
    { name: '2월', value: 3000 },
    { name: '3월', value: 2000 },
    { name: '4월', value: 2780 },
    { name: '5월', value: 1890 },
    { name: '6월', value: 2390 },
    { name: '7월', value: 3490 },
  ];

  return (
    <div>
      <h3 className="font-semibold mb-2">운영</h3>
      <div className="h-64 bg-white rounded-md shadow-md p-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const WelcomeMessage = () => (
  <div className="bg-sky-300 p-4 rounded-md my-4">
    <h2 className="text-xl font-bold mb-2">EZFlow에 오신 것을 환영합니다!</h2>
    <p>시작하는 데 도움이 되도록 인기 있는 앱 조합 모음을 준비했습니다.</p>
    <p>또는 원하는 것을 알고 있다면 <a href="#" className="text-blue-600 underline">시나리오 빌더</a>로 바로 이동하여 1600개 이상의 앱을 찾아보세요.</p>
  </div>
);

const TriggerActionSection = () => (
  <div className="my-8">
    <div className="flex justify-between mb-4">
      <div className="text-center">
        <p>이 경우</p>
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
          <FileSpreadsheet size={32} color="white" />
        </div>
        <p className="mt-2">Google 시트</p>
        <p className="text-sm text-gray-600">새 행이 추가됨</p>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="w-8 h-2 bg-gray-300 rounded-full mx-1"></div>
        <div className="w-2 h-2 bg-gray-300 rounded-full mx-1"></div>
        <div className="w-2 h-2 bg-gray-300 rounded-full mx-1"></div>
        <div className="w-2 h-2 bg-gray-300 rounded-full mx-1"></div>
        <div className="w-8 h-2 bg-gray-300 rounded-full mx-1"></div>
      </div>
      <div className="text-center">
        <p>이 작업 수행</p>
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
          <Plus size={32} color="gray" />
        </div>
        <p className="mt-2">작업 선택</p>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <h3 className="font-semibold mb-2">1 - 트리거 선택</h3>
        <div className="space-y-2">
          <TriggerActionItem icon={<FileSpreadsheet size={24} />} name="Google 시트" description="새 행이 추가됨" active />
          <TriggerActionItem icon={<Mail size={24} />} name="Gmail" description="새 이메일  수신됨" />
          <TriggerActionItem icon={<FileSpreadsheet size={24} />} name="Airtable" description="새 레코드 생성됨" />
          <TriggerActionItem icon={<FileSpreadsheet size={24} />} name="Notion" description="새 페이지 생성됨" />
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-2">2 - 작업 선택</h3>
        <div className="space-y-2">
          <TriggerActionItem icon={<Mail size={24} />} name="Gmail" description="이메일 보내기" />
          <TriggerActionItem icon={<MessageSquare size={24} />} name="Slack" description="메시지 보내기" />
          <TriggerActionItem icon={<Brain size={24} />} name="OpenAI Chat GPT" description="완성 생성" />
          <TriggerActionItem icon={<FileSpreadsheet size={24} />} name="Notion" description="페이지 생성" />
        </div>
      </div>
    </div>
  </div>
);

const TriggerActionItem = ({ icon, name, description, active = false }) => (
  <div className={`flex items-center p-3 border rounded-md ${active ? 'border-sky-400' : ''}`}>
    <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${active ? 'bg-sky-400' : 'bg-gray-200'}`}>
      {React.cloneElement(icon, { color: active ? 'white' : 'gray' })}
    </div>
    <div>
      <p className="font-semibold">{name}</p>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

const ExploreSection = () => (
  <div>
    <h3 className="font-semibold mb-2">추천 템플릿</h3>
    <div className="grid grid-cols-3 gap-4">
      <div className="h-32 bg-gray-100 rounded-md"></div>
      <div className="h-32 bg-gray-100 rounded-md"></div>
      <div className="h-32 bg-gray-100 rounded-md"></div>
    </div>
  </div>
);

export const MainDashboard = ({ isExpanded }) => {
  const [openSections, setOpenSections] = useState({
    dashboard: true,
    activeScenarios: true,
    explore: true,
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-grow overflow-y-auto">
        <div className={`p-4 transition-all duration-300 ease-in-out ${isExpanded ? 'ml-16' : 'ml-16'}`}>
          <CollapsibleSection
            title="대시보드"
            isOpen={openSections.dashboard}
            toggleOpen={() => toggleSection('dashboard')}
          >
            <Dashboard />
          </CollapsibleSection>
          <CollapsibleSection
            title="활성 시나리오"
            isOpen={openSections.activeScenarios}
            toggleOpen={() => toggleSection('activeScenarios')}
          >
            <WelcomeMessage />
            <TriggerActionSection />
          </CollapsibleSection>
          <CollapsibleSection
            title="탐색"
            isOpen={openSections.explore}
            toggleOpen={() => toggleSection('explore')}
          >
            <ExploreSection />
          </CollapsibleSection>
        </div>
      </div>
    </div>
  );
};
