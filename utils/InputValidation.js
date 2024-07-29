const validateEmptyUsername = (username) => {
    return username.trim().length === 0;
};

const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

const validateEmptyEmail = (email) => {
    return email.trim().length === 0
}

const validateEmptyPassword = (password) => {
    return password.trim().length === 0
}

const validatePassword = (password) => {
    return password.length < 6;
};



export const validateForm = ({ username, email, password }) => {
    let errors = {};
    let isValid = true;

    if (!validateEmptyUsername(username)) {
        errors.username = 'Username is required';
        isValid = false;
    }

    if (!validateEmail(email)) {
        errors.email = 'Please enter a valid Email ID';
        isValid = false;
    }

    if (!validateEmptyEmail(email)) {
        errors.email = 'Email ID is required';
        isValid = false;
    }

    if (!validateEmptyPassword(password)) {
        errors.password = 'Password is required';
        isValid = false;
    }

    if (!validatePassword(password)) {
        errors.password = 'Password must have at least 6 characters';
        isValid = false;
    }

    return { errors, isValid };
};
