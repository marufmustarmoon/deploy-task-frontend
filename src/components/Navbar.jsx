import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/actions/userActions';
import { Link, useNavigate } from 'react-router-dom';


const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

  const logoutHandler = () => {
    dispatch(logoutUser());
    navigate('/login');  
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        
        <Link to="/" className="text-white text-2xl font-bold">
          Task Management Tool
        </Link>

        
        {isAuthenticated && (
          <button
            onClick={logoutHandler}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
