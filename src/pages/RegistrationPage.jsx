import { useState ,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const RegistrationPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector((state) => state.user);
  
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      username,
      email,
      password,
    };
    
    dispatch(registerUser(userData));
  };

  
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (isAuthenticated) {
        navigate('/');
      }
    }, 500); 

    return () => clearTimeout(timeoutId); 
  }, [isAuthenticated, navigate]);


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Register</h2>
       
        {error && <p className="text-red-500 text-center">{error}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="text-center text-gray-600">
          Already have an account?{' '}
          <Link
            to="/login"
            className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationPage;
