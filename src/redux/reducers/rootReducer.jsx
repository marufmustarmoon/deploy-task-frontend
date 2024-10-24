import { combineReducers } from 'redux';
// Import your reducers here
import userReducer from './userReducer'; // Adjust the path as necessary
import taskReducer from './taskReducer'; // Adjust the path as necessary

// Combine your reducers
const rootReducer = combineReducers({
  user: userReducer,
  tasks: taskReducer,
});

// Export the root reducer as default
export default rootReducer;
