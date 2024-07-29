import { axiosEmulatorInstance, axiosSystemInstance } from './ApiConfig';

// Function to perform GET requests
export const getAPI = async (endpoint) => {
    try {
        const response = await axiosSystemInstance.get(endpoint);
        return response.data;
    } catch (error) {
        throw new Error(`GET request failed: ${error.message}`);
    }
};

// Function to perform POST requests
export const postAPI = async (endpoint, body) => {
    try {
        const response = await axiosEmulatorInstance.post(endpoint, body);
        return response.data;
    } catch (error) {
        throw new Error(`POST request failed: ${error.message}`);
    }
};

// Function to perform PUT requests
export const putAPI = async (endpoint, body) => {
    try {
        const response = await axiosEmulatorInstance.put(endpoint, body);
        return response.data;
    } catch (error) {
        throw new Error(`PUT request failed: ${error.message}`);
    }
};
