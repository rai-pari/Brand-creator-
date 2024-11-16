import React from 'react';
import { Task } from '../../types';
import ReactMarkdown from 'react-markdown';
import { useTaskStore } from '../../store/taskStore';
import { Loader2 } from 'lucide-react';

interface TaskDetailsProps {
  task: Task;
  onClose: () => void;
}

export function TaskDetails({ task, onClose }: TaskDetailsProps) {
  const [content, setContent] = React.useState<string>('');
  const { generateContent, isLoading } = useTaskStore();

  const handleGenerateContent = async () => {
    try {
      const generatedContent = await generateContent(task);
      setContent(generatedContent);
    } catch (error) {
      console.error('Error generating content:', error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
          <div className="space-y-4">
            <div className="border-b pb-4">
              <h3 className="text-lg font-medium text-gray-900">Task Details</h3>
              <p className="mt-2 text-sm text-gray-500">
                Platform: {task.platform} | Type: {task.type}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700">Description</h4>
                <p className="mt-1 text-sm text-gray-600">{task.description}</p>
              </div>

              {content ? (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Generated Content</h4>
                  <div className="prose prose-sm max-w-none">
                    <ReactMarkdown>{content}</ReactMarkdown>
                  </div>
                </div>
              ) : (
                <div className="flex justify-center">
                  <button
                    onClick={handleGenerateContent}
                    disabled={isLoading}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                        Generating...
                      </>
                    ) : (
                      'Generate Content'
                    )}
                  </button>
                </div>
              )}
            </div>

            <div className="mt-5 sm:mt-6">
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}