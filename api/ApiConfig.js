import axios from 'axios';

// Define base URLs for different environments
const BASE_URL = {
    EMULATOR: "http://10.0.2.2:3000", // For emulator when posting data
    SYSTEM: "http://192.168.218.171:3000", // For fetching data from the system
};

// Create an Axios instance for the emulator
const axiosEmulatorInstance = axios.create({
    baseURL: BASE_URL.EMULATOR,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Create an Axios instance for the system
const axiosSystemInstance = axios.create({
    baseURL: BASE_URL.SYSTEM,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Export the instances
export { axiosEmulatorInstance, axiosSystemInstance, BASE_URL };
