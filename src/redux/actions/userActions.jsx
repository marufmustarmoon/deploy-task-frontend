import api from '../../services/api';

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: 'USER_LOGIN_REQUEST' });

    const { data } = await api.post('/auth/login', { email, password });
    dispatch({ type: 'USER_LOGIN_SUCCESS', payload: data });

    // Save user info without token expiration logic
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: 'USER_LOGIN_FAILURE', payload: error.response?.data?.message });
  }
};

// Action for user logout
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: 'USER_LOGOUT' });
};

// Action for user registration
export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: 'USER_REGISTRATION_REQUEST' });

    const { data } = await api.post('/auth/register', userData);

    dispatch({ type: 'USER_REGISTRATION_SUCCESS', payload: data });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: 'USER_REGISTRATION_FAILURE', payload: error.response?.data?.message });
  }
};
