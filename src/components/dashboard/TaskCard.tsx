import React from 'react';
import { Task } from '../../types';
import { Clock, CheckCircle, Loader2 } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onClick: (task: Task) => void;
}

export function TaskCard({ task, onClick }: TaskCardProps) {
  const statusIcons = {
    pending: <Clock className="h-5 w-5 text-yellow-500" />,
    processing: <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />,
    completed: <CheckCircle className="h-5 w-5 text-green-500" />
  };

  const platformColors = {
    facebook: 'bg-blue-100 text-blue-800',
    instagram: 'bg-pink-100 text-pink-800',
    linkedin: 'bg-blue-100 text-blue-800',
    web: 'bg-purple-100 text-purple-800'
  };

  return (
    <div
      onClick={() => onClick(task)}
      className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100"
    >
      <div className="flex justify-between items-start mb-4">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${platformColors[task.platform]}`}>
          {task.platform}
        </span>
        {statusIcons[task.status]}
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {task.type.charAt(0).toUpperCase() + task.type.slice(1).replace('-', ' ')}
      </h3>
      
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {task.description}
      </p>
      
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>
          {new Date(task.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}