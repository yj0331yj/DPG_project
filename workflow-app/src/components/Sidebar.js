import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Share2, Palette, Link as LinkIcon, Globe, MoreVertical } from 'lucide-react';

const SidebarIcon = ({ Icon, title, to, active, isExpanded }) => {
  return (
    <Link
      to={to}
      className={`
        flex items-center w-full px-3 py-3 my-1
        rounded-md transition-all duration-200 ease-in-out
        ${active ? 'bg-white/20' : 'hover:bg-white/10'}
      `}
      aria-label={title}
    >
      <Icon className="text-white" size={20} />
      {isExpanded && (
        <span className="ml-4 text-white text-sm font-medium overflow-hidden whitespace-nowrap">
          {title}
        </span>
      )}
    </Link>
  );
};

export const Sidebar = ({ isExpanded, onMouseEnter, onMouseLeave }) => {
  const location = useLocation();

  return (
    <div
      className={`
        bg-gradient-to-b from-sky-300 to-blue-900
        flex flex-col justify-between transition-all duration-300 ease-in-out
        fixed left-0 top-0 h-screen
        ${isExpanded ? 'w-64' : 'w-16'} p-2
      `}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="space-y-1">
        <SidebarIcon Icon={Home} title="조직" to="/" active={location.pathname === '/'} isExpanded={isExpanded} />
        <SidebarIcon Icon={Users} title="팀" to="/team" active={location.pathname === '/team'} isExpanded={isExpanded} />
        <SidebarIcon
          Icon={Share2}
          title="시나리오"
          to="/new-scenario"
          active={location.pathname === '/new-scenario'}
          isExpanded={isExpanded}
        />
        <SidebarIcon Icon={Palette} title="템플릿" to="/templates" active={location.pathname === '/templates'} isExpanded={isExpanded} />
        <SidebarIcon Icon={LinkIcon} title="연결" to="/connections" active={location.pathname === '/connections'} isExpanded={isExpanded} />
        <SidebarIcon Icon={Globe} title="웹훅" to="/webhooks" active={location.pathname === '/webhooks'} isExpanded={isExpanded} />
      </div>
      <div>
        <SidebarIcon Icon={MoreVertical} title="더 보기" to="/more" active={location.pathname === '/more'} isExpanded={isExpanded} />
      </div>
    </div>
  );
};
