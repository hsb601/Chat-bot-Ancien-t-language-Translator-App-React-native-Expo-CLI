import { StyleSheet, Text, View, Alert, TouchableOpacity, Image,  ScrollView,ImageBackground } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import React, { useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import PromptScreen from './prompt';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen({ navigation }) {
  const [selectedAsset, setSelectedAsset] = useState(null);

  const selectFile = async () => {
    try {
      const doc = await DocumentPicker.getDocumentAsync({});
      console.log('Doc:', doc);

      if (!doc.canceled) {
        console.log('File selected successfully');
        const asset = doc.assets[0];
        console.log('URI:', asset.uri);
        console.log('Type:', asset.mimeType);
        console.log('Name:', asset.name);
        console.log('Size:', asset.size);
        setSelectedAsset(asset);
      } else {
        console.log('File selection cancelled');
      }
    } catch (err) {
      console.log('Error selecting file:', err);
    }
  };

  return (

    <View style={styles.container}>
     <ImageBackground source={require('../assets/robotlogo.png')} style={styles.selectedFileImage} >
     <ScrollView>
      <Text style={styles.txt}>Ancient Language Translator Bot</Text>

      {selectedAsset && (
        <View style={styles.selectedFileContainer}>
          <Text style={styles.selectedFileName}>Name: {selectedAsset.name}</Text>
          <Text style={styles.sub_txt}>Type: {selectedAsset.mimeType}</Text>
          <Text style={styles.sub_txt}>Size: {selectedAsset.size}</Text>
          <Image source={{ uri: selectedAsset.uri }} style={styles.selectedFileImage} />

        </View>
      )}
       </ScrollView>
       </ImageBackground>
      <TouchableOpacity style={styles.bt} onPress={() => Alert.alert('Hello i am hello world chat bot!')}>
        <FontAwesome5 name="image" size={28} color="black" />
        <Text style={styles.buttonText}> Image Scan </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bt} onPress={() => navigation.navigate('Prompt')}>
        <FontAwesome5 name="comment" size={28} color="black" />
        <Text style={styles.buttonText}> Prompt </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bt} onPress={selectFile}>
        <FontAwesome5 name="file-upload" size={28} color="black" />
        <Text style={styles.buttonText}> Document Upload </Text>
      </TouchableOpacity>

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#deb887',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
    height: 60,
  },
  txt: {
    flex: 2,
    fontWeight: 'bold',
    fontSize: 30,
    color: 'white',
    textAlign: 'center',

  },
  sub_txt: {
      fontSize: 14,
       fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
    },
  bt: {
    width: 250,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginVertical: 8,
    borderRadius: 4,
    elevation: 2,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    shadowOffset: {
      width: 2,
      height: 2,
    },
  },
  buttonText: {
    fontSize: 18,
    marginHorizontal: 12,
    color: 'black',
    fontWeight: '500',
  },
  selectedFileContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  selectedFileName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  selectedFileImage: {
    width: 320,
    height: 320,
  },
});
