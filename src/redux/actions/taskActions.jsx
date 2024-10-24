import api from '../../services/api';
import { logoutUser } from './userActions';

// Helper function to get the user token
const getUserToken = (getState) => {
  const { user } = getState();
  if (user && user.token) {
    return user.token;
  }
  // Fallback to localStorage if the state is not loaded properly
  const userInfo = localStorage.getItem('userInfo');
  return userInfo ? JSON.parse(userInfo).token : null;
};

// Action to fetch tasks
export const fetchTasks = () => async (dispatch, getState) => {
  try {
    dispatch({ type: 'FETCH_TASKS_REQUEST' });

    const token = getUserToken(getState);

    // Check if the user is authenticated
    if (!token) {
      dispatch(logoutUser()); // Log out if token is missing
      dispatch({ type: 'FETCH_TASKS_FAILURE', payload: 'User not authenticated' });
      return;
    }

    const { data } = await api.get('/tasks', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: 'FETCH_TASKS_SUCCESS', payload: data });
  } catch (error) {
    if (error.response?.status === 401) {
      // If token is invalid (Unauthorized), log the user out
      dispatch(logoutUser());
    }
    dispatch({
      type: 'FETCH_TASKS_FAILURE',
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Action to create a new task
export const createTask = (taskData) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'CREATE_TASK_REQUEST' });

    const token = getUserToken(getState);

    if (!token) {
      dispatch(logoutUser()); // Log out if token is missing
      dispatch({ type: 'CREATE_TASK_FAILURE', payload: 'User not authenticated' });
      return;
    }

    const { data } = await api.post('/tasks', taskData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: 'CREATE_TASK_SUCCESS', payload: data });
  } catch (error) {
    if (error.response?.status === 401) {
      dispatch(logoutUser()); // If token is invalid, log the user out
    }
    dispatch({
      type: 'CREATE_TASK_FAILURE',
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Action to delete a task
export const deleteTask = (taskId) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'DELETE_TASK_REQUEST' });

    const token = getUserToken(getState);

    if (!token) {
      dispatch(logoutUser()); // Log out if token is missing
      dispatch({ type: 'DELETE_TASK_FAILURE', payload: 'User not authenticated' });
      return;
    }

    await api.delete(`/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: 'DELETE_TASK_SUCCESS', payload: taskId });
  } catch (error) {
    if (error.response?.status === 401) {
      dispatch(logoutUser()); // If token is invalid, log the user out
    }
    dispatch({
      type: 'DELETE_TASK_FAILURE',
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Action to update a task
export const updateTask = (taskId, taskData) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'UPDATE_TASK_REQUEST' });

    const token = getUserToken(getState);

    if (!token) {
      dispatch(logoutUser()); // Log out if token is missing
      dispatch({ type: 'UPDATE_TASK_FAILURE', payload: 'User not authenticated' });
      return;
    }

    const { data } = await api.put(`/tasks/${taskId}`, taskData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: 'UPDATE_TASK_SUCCESS', payload: data });
  } catch (error) {
    if (error.response?.status === 401) {
      dispatch(logoutUser()); // If token is invalid, log the user out
    }
    dispatch({
      type: 'UPDATE_TASK_FAILURE',
      payload: error.response?.data?.message || error.message,
    });
  }
};
