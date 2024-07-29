import React, { useState } from 'react';
import { View, Text, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import { postAPI } from '../api/ApiService';
import CommonStyles from '../styles/CommonStyles';
import CustomTextInput from '../styles/CustomTextInput';

export const HomeScreen = ({ navigation }) => {
  const [employeeName, setEmployeeName] = useState('');
  const [jobDesignation, setJobDesignation] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [employeeNameError, setEmployeeNameError] = useState('');
  const [jobDesignationError, setJobDesignationError] = useState('');
  const [companyNameError, setCompanyNameError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePost = async () => {
    let valid = true;

    // Reset error messages
    setEmployeeNameError('');
    setJobDesignationError('');
    setCompanyNameError('');

    if (employeeName.trim().length === 0) {
      setEmployeeNameError('Employee name is required');
      valid = false;
    }

    if (jobDesignation.trim().length === 0) {
      setJobDesignationError('Job Designation is required');
      valid = false;
    }

    if (companyName.trim().length === 0) {
      setCompanyNameError('Company name is required');
      valid = false;
    }

    // If inputs are valid, we will do POST API call
    if (valid) {
      try {
        setIsLoading(true); // Show loading indicator

        const endpoint = "/employees"; // Endpoint for posting employee data
        const body = { employeeName, jobDesignation, companyName };

        // Call the API service to perform POST request
        const response = await postAPI(endpoint, body);

        if (response) {
          console.log("Data submitted successfully:", response);
          Alert.alert("Success", "Data submitted successfully");
          // Clear the form data once data is submitted successfully
          setEmployeeName('');
          setJobDesignation('');
          setCompanyName('');
          navigation.navigate('List'); // Navigate to ListScreen after successful submission
        } else {
          console.warn("Failed to submit data:", response);
          Alert.alert("Error", "Failed to submit data");
        }
      } catch (error) {
        console.error("Error submitting data:", error);
        Alert.alert("Error", "An error occurred while submitting data");
      } finally {
        setIsLoading(false); // Hide loading indicator
      }
    }
  };

  return (
    <View style={CommonStyles.container}>
      <Text style={CommonStyles.header}>POST Request API Call</Text>

      <CustomTextInput
        iconName="user"
        placeholder="Employee Name"
        value={employeeName}
        onChangeText={setEmployeeName}
      />
      {employeeNameError ? <Text style={CommonStyles.errorText}>{employeeNameError}</Text> : null}

      <CustomTextInput
        iconName="briefcase"
        placeholder="Job Designation"
        value={jobDesignation}
        onChangeText={setJobDesignation}
      />
      {jobDesignationError ? <Text style={CommonStyles.errorText}>{jobDesignationError}</Text> : null}

      <CustomTextInput
        iconName="building"
        placeholder="Company"
        value={companyName}
        onChangeText={setCompanyName}
      />
      {companyNameError ? <Text style={CommonStyles.errorText}>{companyNameError}</Text> : null}

      {isLoading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <TouchableOpacity onPress={handlePost} style={CommonStyles.button}>
          <Text style={CommonStyles.buttonText}>Post</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};


