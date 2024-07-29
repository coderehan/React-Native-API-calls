import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Text, Alert, ActivityIndicator } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { postAPI } from '../api/ApiService';

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
    <View style={styles.container}>
      <Text style={styles.header}>POST Request API Call</Text>

      <View style={styles.inputContainer}>
        <FontAwesome5 name="user" size={20} color="black" style={styles.icon} />
        <TextInput
          placeholder="Employee Name"
          style={[styles.input, employeeNameError ? styles.inputError : null]}
          value={employeeName}
          onChangeText={setEmployeeName}
        />
      </View>
      {employeeNameError ? <Text style={styles.errorText}>{employeeNameError}</Text> : null}

      <View style={styles.inputContainer}>
        <FontAwesome5 name="briefcase" size={20} color="black" style={styles.icon} />
        <TextInput
          placeholder="Job Designation"
          style={[styles.input, jobDesignationError ? styles.inputError : null]}
          value={jobDesignation}
          onChangeText={setJobDesignation}
        />
      </View>
      {jobDesignationError ? <Text style={styles.errorText}>{jobDesignationError}</Text> : null}

      <View style={styles.inputContainer}>
        <FontAwesome5 name="building" size={20} color="black" style={styles.icon} />
        <TextInput
          placeholder="Company"
          style={[styles.input, companyNameError ? styles.inputError : null]}
          value={companyName}
          onChangeText={setCompanyName}
        />
      </View>
      {companyNameError ? <Text style={styles.errorText}>{companyNameError}</Text> : null}

      {isLoading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <Button
          title="POST"
          onPress={handlePost}
          color="#007BFF"
          style={styles.button}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'black',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  inputError: {
    borderColor: 'red',
  },
  icon: {
    paddingHorizontal: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
  },
});

export default HomeScreen;
