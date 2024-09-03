// WorkflowContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const WorkflowContext = createContext();

export const WorkflowProvider = ({ children }) => {
  const [workflows, setWorkflows] = useState([]);
  const [currentWorkflow, setCurrentWorkflow] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWorkflows();
  }, []);

  const fetchWorkflows = async () => {
    try {
      const response = await fetch('/api/workflows');
      if (!response.ok) {
        throw new Error('Failed to fetch workflows');
      }
      const data = await response.json();
      setWorkflows(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const createWorkflow = async (name, description) => {
    try {
      const response = await fetch('/api/workflows', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description, steps: [] }),
      });
      if (!response.ok) {
        throw new Error('Failed to create workflow');
      }
      const data = await response.json();
      setWorkflows([...workflows, data]);
      setCurrentWorkflow(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const updateWorkflow = async (updatedWorkflow) => {
    try {
      const response = await fetch(`/api/workflows/${updatedWorkflow._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedWorkflow),
      });
      if (!response.ok) {
        throw new Error('Failed to update workflow');
      }
      const data = await response.json();
      setWorkflows(workflows.map(w => w._id === data._id ? data : w));
      setCurrentWorkflow(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const executeWorkflow = async (workflowId) => {
    try {
      const response = await fetch(`/api/workflows/${workflowId}/execute`, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Failed to execute workflow');
      }
      const data = await response.json();
      console.log('Workflow execution result:', data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <WorkflowContext.Provider value={{
      workflows,
      currentWorkflow,
      setCurrentWorkflow,
      createWorkflow,
      updateWorkflow,
      executeWorkflow,
      error,
      setError,
    }}>
      {children}
    </WorkflowContext.Provider>
  );
};

export const useWorkflow = () => useContext(WorkflowContext);

