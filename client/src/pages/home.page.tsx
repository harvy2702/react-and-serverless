import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth.store';

export function HomePage() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = useCallback(async () => {
    await logout();
    navigate('/login');
  }, [logout, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <div className="text-center">
          <div className="mb-6">
            {user?.avatar && (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-indigo-100"
              />
            )}
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome back!
            </h1>
            <p className="text-xl text-indigo-600 font-semibold">
              {user?.name || 'User'}
            </p>
            <p className="text-gray-600 mt-1">
              {user?.email}
            </p>
          </div>

          <div className="border-t border-gray-200 pt-6 mt-6">
            <p className="text-sm text-gray-500 mb-4">
              You're successfully logged in with Google via Azure Entra ID
            </p>
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
