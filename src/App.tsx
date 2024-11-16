import React from 'react';
import { LoginForm } from './components/auth/LoginForm';
import { Dashboard } from './components/dashboard/Dashboard';
import { useAuthStore } from './store/authStore';

function App() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return (
    <div className="min-h-screen bg-gray-50">
      {isAuthenticated ? (
        <Dashboard />
      ) : (
        <div className="min-h-screen flex items-center justify-center px-4">
          <LoginForm />
        </div>
      )}
    </div>
  );
}

export default App;