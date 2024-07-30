export const initialState = {
    email: '',
    newPassword: '',
    confirmNewPassword: '',
    emailError: '',
    newPasswordError: '',
    confirmNewPasswordError: '',
    isLoading: false,
    showNewPassword: false,
    showConfirmNewPassword: false,
};

export const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_EMAIL':
            return { ...state, email: action.payload };
        case 'SET_NEW_PASSWORD':
            return { ...state, newPassword: action.payload };
        case 'SET_CONFIRM_NEW_PASSWORD':
            return { ...state, confirmNewPassword: action.payload };
        case 'SET_EMAIL_ERROR':
            return { ...state, emailError: action.payload };
        case 'SET_NEW_PASSWORD_ERROR':
            return { ...state, newPasswordError: action.payload };
        case 'SET_CONFIRM_NEW_PASSWORD_ERROR':
            return { ...state, confirmNewPasswordError: action.payload };
        case 'SET_LOADING':
            return { ...state, isLoading: action.payload };
        case 'TOGGLE_SHOW_NEW_PASSWORD':
            return { ...state, showNewPassword: !state.showNewPassword };
        case 'TOGGLE_SHOW_CONFIRM_NEW_PASSWORD':
            return { ...state, showConfirmNewPassword: !state.showConfirmNewPassword };
        case 'CLEAR_FORM':
            return { ...initialState };
        default:
            return state;
    }
};
