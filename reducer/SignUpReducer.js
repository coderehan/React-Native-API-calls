export const initialState = {
    username: '',
    email: '',
    password: '',
    usernameError: '',
    emailError: '',
    passwordError: '',
    isLoading: false,
    showPassword: false,
};

export const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_USERNAME':
            return { ...state, username: action.payload };
        case 'SET_EMAIL':
            return { ...state, email: action.payload };
        case 'SET_PASSWORD':
            return { ...state, password: action.payload };
        case 'SET_USERNAME_ERROR':
            return { ...state, usernameError: action.payload };
        case 'SET_EMAIL_ERROR':
            return { ...state, emailError: action.payload };
        case 'SET_PASSWORD_ERROR':
            return { ...state, passwordError: action.payload };
        case 'SET_LOADING':
            return { ...state, isLoading: action.payload };
        case 'TOGGLE_SHOW_PASSWORD':
            return { ...state, showPassword: !state.showPassword };
        case 'CLEAR_FORM':
            return { ...initialState };
        default:
            return state;
    }
};
