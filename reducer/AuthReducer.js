// Define action types
export const ActionTypes = {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
};

// Define the initial state
const initialState = {
    user: null,
};

// Create the reducer function
export const AuthReducer = (state, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN:
            return {
                ...state,
                user: action.payload, // Update user data on login
            };
        case ActionTypes.LOGOUT:
            return {
                ...state,
                user: null, // Clear user data on logout
            };
        default:
            return state;
    }
};
