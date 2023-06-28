import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  rocketImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  rocketName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  rocketDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  rocketDetails: {
    fontSize: 14,
    color: 'gray',
  },
});

const DetailScreen = ({ route }) => {
  const { rocket } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: rocket.image }} style={styles.rocketImage} />
      <Text style={styles.rocketName}>{rocket.name}</Text>
      <Text style={styles.rocketDescription}>{rocket.description}</Text>
      <Text style={styles.rocketDetails}>Country: {rocket.country}</Text>
      <Text style={styles.rocketDetails}>Active: {rocket.active ? 'Yes' : 'No'}</Text>
      <Text style={styles.rocketDetails}>Cost per Launch: ${rocket.costPerLaunch}</Text>
      <Text style={styles.rocketDetails}>Success Rate: {rocket.successRate}%</Text>
    </View>
  );
};

export default DetailScreen;
