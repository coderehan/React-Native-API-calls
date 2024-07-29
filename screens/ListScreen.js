import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, Text, RefreshControl, StyleSheet, View, ActivityIndicator } from 'react-native';
import { getAPI } from '../api/ApiService';

// Functional component
export const ListScreen = () => {
  // State declaration
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Function to Fetch API Data
  const getAPIData = async () => {
    try {
      const endpoint = "/employees"; // Endpoint for fetching employee data
      const result = await getAPI(endpoint);
      setData(result);
      console.warn('Fetched data:', result);
      console.log("Response from API", result);
    } catch (error) {
      console.warn('Error fetching data:', error);
    } finally {
      setIsLoading(false); // Hide loading indicator
    }
  };

  // Function to handle refreshing
  const onRefresh = async () => {
    setRefreshing(true);
    await getAPIData();
    setRefreshing(false);
  };

  // useEffect runs the getAPIData function when the component first mounts.
  useEffect(() => {
    getAPIData();
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      <Text style={styles.title}>GET Request API Call</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        data.length ? (
          <FlatList
            data={data}
            renderItem={({ item }) => <UserData item={item} />}
            keyExtractor={(item) => item.id.toString()}
          />
        ) : (
          <Text style={styles.noDataText}>No data available</Text>
        )
      )}
    </ScrollView>
  );
};

// This component is for FlatList to render the data in UI
const UserData = ({ item }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>ID: {item.id}</Text>
      <View style={styles.cardDivider} />
      <Text style={styles.boldText}>
        <Text style={styles.boldLabel}>Employee Name: </Text>
        <Text style={styles.text}>{item.employeeName}</Text>
      </Text>
      <Text style={styles.boldText}>
        <Text style={styles.boldLabel}>Job Designation: </Text>
        <Text style={styles.text}>{item.jobDesignation}</Text>
      </Text>
      <Text style={styles.boldText}>
        <Text style={styles.boldLabel}>Company: </Text>
        <Text style={styles.text}>{item.companyName}</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    color: 'black',
    textAlign: 'center',
    marginVertical: 10,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign:'center'
  },
  cardDivider: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginVertical: 10,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  boldLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  boldText: {
    flexDirection: 'row',
  }
});
