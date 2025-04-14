import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaLock, FaUser, FaSignInAlt, FaQrcode, FaHome, FaInfoCircle } from 'react-icons/fa';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // First check if API server is accessible
  const checkApiAccess = async () => {
    try {
      const response = await fetch('http://api.dynamic-balancig.com/api/admin/test');
      return response.ok;
    } catch (error) {
      console.error('API server not accessible:', error);
      return false;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // First check if API is accessible
      const apiAccessible = await checkApiAccess();
      if (!apiAccessible) {
        setError('API server is not accessible. Please ensure the server is running.');
        setLoading(false);
        return;
      }

      console.log('Attempting login with:', { username, password });
      
      const response = await fetch('http://api.dynamic-balancig.com/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      console.log('Login response status:', response.status);
      
      // Always parse the response, even if it's an error
      const data = await response.json().catch(e => {
        console.error('Error parsing JSON response:', e);
        return { message: 'Server error: Invalid response format' };
      });
      
      console.log('Login response data:', data);

      if (response.ok && data.token) {
        // Store auth token in localStorage
        console.log('Received token:', data.token);
        localStorage.setItem('adminToken', data.token);
        console.log('Token stored in localStorage:', localStorage.getItem('adminToken'));
        
        // Verify token was stored correctly
        const storedToken = localStorage.getItem('adminToken');
        if (!storedToken) {
          console.error('Failed to store token in localStorage');
          setError('Authentication error: Failed to store token');
          return;
        }
        
        console.log('Login successful, redirecting to admin panel');
        // Redirect to admin panel
        navigate('/admin');
      } else {
        setError(data.message || 'Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed: ' + (error.message || 'Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  // Check for dark mode preference
  const [darkMode, setDarkMode] = useState(false);
  
  useEffect(() => {
    // Check if user prefers dark mode
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
    
    // Listen for changes in color scheme preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => setDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-indigo-50 to-blue-100'}`}>
      {/* Navigation */}
      <nav className={`px-6 py-4 ${darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FaQrcode className={`h-6 w-6 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
            <span className="font-bold text-xl">QuickQR Pro</span>
          </div>
          <div className="flex space-x-4">
            <Link to="/" className={`flex items-center space-x-1 ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
              <FaHome className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <button 
              onClick={toggleDarkMode} 
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-100 text-gray-700'}`}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </nav>
      
      <div className="flex-grow flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <div className={`p-4 rounded-full ${darkMode ? 'bg-indigo-900' : 'bg-indigo-100'}`}>
              <FaLock className={`h-12 w-12 ${darkMode ? 'text-indigo-300' : 'text-indigo-600'}`} />
            </div>
          </div>
          <h2 className={`mt-6 text-center text-3xl font-extrabold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Admin Login
          </h2>
          <p className={`mt-2 text-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Enter your credentials to access the admin panel
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className={`${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'} py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 transition-all duration-300 transform hover:scale-[1.01]`}>
            {error && (
              <div className={`mb-4 ${darkMode ? 'bg-red-900/30 border-red-800 text-red-300' : 'bg-red-50 border-red-200 text-red-700'} border px-4 py-3 rounded-lg relative flex items-center`} role="alert">
                <FaInfoCircle className="flex-shrink-0 mr-2" />
                <span className="block sm:inline">{error}</span>
              </div>
            )}
          
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label htmlFor="username" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Username
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className={`h-5 w-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={`block w-full pl-10 sm:text-sm rounded-md border-0 py-2.5 ${darkMode 
                      ? 'bg-gray-700 text-white placeholder-gray-400 focus:ring-indigo-400' 
                      : 'bg-white text-gray-900 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'}`}
                    placeholder="Admin username"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className={`h-5 w-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`block w-full pl-10 sm:text-sm rounded-md border-0 py-2.5 ${darkMode 
                      ? 'bg-gray-700 text-white placeholder-gray-400 focus:ring-indigo-400' 
                      : 'bg-white text-gray-900 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'}`}
                    placeholder="Admin password"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-lg text-sm font-medium text-white ${darkMode 
                    ? 'bg-indigo-700 hover:bg-indigo-600 focus:ring-offset-gray-900' 
                    : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-all duration-200 transform hover:-translate-y-0.5`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Authenticating...
                    </>
                  ) : (
                    <>
                      <FaSignInAlt className="mr-2 -ml-1 h-5 w-5" />
                      Sign in to Admin Panel
                    </>
                  )}
                </button>
              </div>
              
              <div className={`mt-4 text-center text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                <p>Default credentials: admin / quickqr2025</p>
                <p className="mt-1">For demonstration purposes only</p>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className={`py-4 text-center text-sm ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
        <p>&copy; {new Date().getFullYear()} QuickQR Pro. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AdminLogin;
