import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Switch, Image, Alert, Text, TouchableOpacity } from 'react-native';
import { CommonActions } from '@react-navigation/native';

export const ProfileScreen = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  };

  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          onPress: () => {
            // Perform any additional logout logic if needed (e.g., clearing data)

            // Reset the navigation stack and navigate to the Login screen
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'Login Screen' }], // Navigate to the Login screen
              })
            );
          },
        },
      ]
    );
  };

  const menuItems = [
    { title: 'Profile information' },
    { title: 'Order History' },
    { title: 'Location' },
    { title: 'Payment Method' },
    { title: 'Gift Voucher' },
    { title: 'Refer a friend' },
    { title: 'Share App Info' },
    { title: 'Play Store' },
    { title: 'Other Apps' },
    { title: 'Visit our company website' },
    { title: 'Contact Us' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/images/profile_image.png')} style={styles.profileImage} />
        <View style={styles.userInfo}>
          <Text style={styles.headerText}>Hi Rehan,</Text>
          <Text style={styles.headerText}>rehan@test.com</Text>
        </View>
      </View>

      {menuItems.map((item, index) => (
        <TouchableOpacity key={index} style={styles.listItem}>
          <Text style={styles.listItemText}>{item.title}</Text>
        </TouchableOpacity>
      ))}

      <View style={styles.listItem}>
        <Text style={styles.listItemText}>Push notification</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      <TouchableOpacity style={styles.listItem} onPress={handleLogout}>
        <Text style={styles.listItemText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    padding: 20,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  userInfo: {
    marginLeft: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 5,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  listItemText: {
    fontSize: 16,
  },
});

export default ProfileScreen;
