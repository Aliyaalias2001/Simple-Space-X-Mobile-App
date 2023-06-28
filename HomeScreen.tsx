// HomeScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery, useMutation, gql } from '@apollo/client';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  rocketItem: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  rocketImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  rocketName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  rocketCountry: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
  },
  createButton: {
    marginTop: 20,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  createButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  popupContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    padding: 10,
    backgroundColor: 'lightgray',
    borderRadius: 5,
  },
});

const ROCKET_QUERY = gql`
  query GetRockets {
    rockets {
      id
      name
      country
      image
    }
  }
`;

const CREATE_ROCKET_MUTATION = gql`
  mutation CreateRocket($input: RocketInput!) {
    createRocket(input: $input) {
      id
      name
      country
      image
    }
  }
`;

const UPDATE_ROCKET_MUTATION = gql`
  mutation UpdateRocket($input: RocketInput!) {
    updateRocket(input: $input) {
      id
      name
      country
      image
    }
  }
`;

const DELETE_ROCKET_MUTATION = gql`
  mutation DeleteRocket($id: ID!) {
    deleteRocket(id: $id)
  }
`;

const HomeScreen = () => {
  const [showPopup, setShowPopup] = useState(true);

  const { loading, error, data } = useQuery(ROCKET_QUERY);

  const [createRocket] = useMutation(CREATE_ROCKET_MUTATION, {
    onCompleted: () => {
      Alert.alert('Success', 'Rocket created successfully');
    },
    onError: (error) => {
      Alert.alert('Error', error.message);
    },
    refetchQueries: [{ query: ROCKET_QUERY }],
  });

  const [updateRocket] = useMutation(UPDATE_ROCKET_MUTATION, {
    onCompleted: () => {
      Alert.alert('Success', 'Rocket updated successfully');
    },
    onError: (error) => {
      Alert.alert('Error', error.message);
    },
    refetchQueries: [{ query: ROCKET_QUERY }],
  });

  const [deleteRocket] = useMutation(DELETE_ROCKET_MUTATION, {
    onCompleted: () => {
      Alert.alert('Success', 'Rocket deleted successfully');
    },
    onError: (error) => {
      Alert.alert('Error', error.message);
    },
    refetchQueries: [{ query: ROCKET_QUERY }],
  });

  const handleCreateRocket = () => {
    createRocket({
      variables: {
        input: {
          name: 'New Rocket',
          country: 'Unknown',
        },
      },
    });
  };

  const handleUpdateRocket = (rocket) => {
    updateRocket({
      variables: {
        input: {
          id: rocket.id,
          name: 'Updated Rocket',
          country: 'Updated Country',
        },
      },
    });
  };

  const handleDeleteRocket = (rocket) => {
    Alert.alert(
      'Confirm Deletion',
      `Are you sure you want to delete ${rocket.name}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            deleteRocket({
              variables: {
                id: rocket.id,
              },
            });
          },
        },
      ],
      { cancelable: true }
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {showPopup && (
        <View style={styles.popupContainer}>
          <Text>Welcome to the app!</Text>
          <TouchableOpacity onPress={() => setShowPopup(false)}>
            <Text>Dismiss</Text>
          </TouchableOpacity>
        </View>
      )}

      {data.rockets.map((rocket) => (
        <View key={rocket.id} style={styles.rocketItem}>
          <Image source={{ uri: rocket.image }} style={styles.rocketImage} />
          <Text style={styles.rocketName}>Name: {rocket.name}</Text>
          <Text style={styles.rocketCountry}>Country: {rocket.country}</Text>
          <TouchableOpacity onPress={() => handleUpdateRocket(rocket)}>
            <Text>Update Rocket</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDeleteRocket(rocket)}>
            <Text>Delete Rocket</Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity style={styles.createButton} onPress={handleCreateRocket}>
        <Text style={styles.createButtonText}>Create Rocket</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
