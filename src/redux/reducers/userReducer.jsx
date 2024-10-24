const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  isAuthenticated: !!userInfoFromStorage,
  user: userInfoFromStorage,
  loading: false,
  error: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'USER_LOGIN_REQUEST':
      return { ...state, loading: true };

    case 'USER_LOGIN_SUCCESS':
      return { ...state, loading: false, isAuthenticated: true, user: action.payload };

    case 'USER_LOGIN_FAILURE':
      return { ...state, loading: false, error: action.payload };

    case 'USER_LOGOUT':
      return { ...state, isAuthenticated: false, user: null };

    // Registration cases
    case 'USER_REGISTRATION_REQUEST':
      return { ...state, loading: true };

    case 'USER_REGISTRATION_SUCCESS':
      return { ...state, loading: false, isAuthenticated: true, user: action.payload };

    case 'USER_REGISTRATION_FAILURE':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}
