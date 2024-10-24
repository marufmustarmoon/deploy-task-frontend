import api from '../../services/api';

export const clearError = () => ({
  type: 'CLEAR_LOGIN_ERROR',
});

// Action to log in the user
export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch(clearError());
    // Clear previous errors by dispatching USER_LOGIN_REQUEST
    dispatch({ type: 'USER_LOGIN_REQUEST', payload: null }); // Reset error

    const { data } = await api.post('/auth/login', { email, password });
    dispatch({ type: 'USER_LOGIN_SUCCESS', payload: data });

    // Save user info without token expiration logic
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    const errorMessage =
      error.response?.data?.errors?.[0]?.msg || error.response?.data?.message || error.message;

    dispatch({ type: 'USER_LOGIN_FAILURE', payload: errorMessage });
  }
};

// Action for user logout
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: 'USER_LOGOUT' });
};

// Action to register a new user
export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch(clearError());
    // Clear previous errors by dispatching USER_REGISTRATION_REQUEST
    dispatch({ type: 'USER_REGISTRATION_REQUEST', payload: null }); // Reset error

    const { data } = await api.post('/auth/register', userData);

    dispatch({ type: 'USER_REGISTRATION_SUCCESS', payload: data });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    const errorMessage =
      error.response?.data?.errors?.[0]?.msg || error.response?.data?.message || error.message;

    dispatch({ type: 'USER_REGISTRATION_FAILURE', payload: errorMessage });
  }
};
