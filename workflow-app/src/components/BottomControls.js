// components/BottomControls.js
import React from 'react';
import { Play, Clock, Settings, FileText, Zap, Wrench, Webhook } from 'lucide-react';
import { useWorkflow } from '../WorkflowContext';

export const BottomControls = () => {
  const { currentWorkflow, executeWorkflow } = useWorkflow();

  return (
    <div className="h-16 border-t flex items-center justify-between px-4">
      <div className="flex items-center space-x-4">
        <button 
          className="space-x-2 flex items-center" 
          onClick={() => currentWorkflow && executeWorkflow(currentWorkflow._id)}
          disabled={!currentWorkflow}
        >
          <Play className="h-4 w-4" />
          <span>Run once</span>
        </button>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Clock className="h-4 w-4" />
          <span>Manual trigger</span>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button aria-label="Settings">
          <Settings className="h-4 w-4" />
        </button>
        <button aria-label="File">
          <FileText className="h-4 w-4" />
        </button>
        <button aria-label="Zap">
          <Zap className="h-4 w-4" />
        </button>
        <div className="h-8 w-px bg-gray-300"></div>
        <button aria-label="Wrench">
          <Wrench className="h-4 w-4" />
        </button>
        <button aria-label="File">
          <FileText className="h-4 w-4" />
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <button>
          AI
          <span className="ml-1 text-xs bg-purple-200 text-purple-700 px-1 rounded">BETA</span>
        </button>
        <button aria-label="Webhook">
          <Webhook className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

