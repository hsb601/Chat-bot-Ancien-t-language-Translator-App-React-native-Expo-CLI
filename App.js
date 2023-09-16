import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Image, ImageBackground, ActivityIndicator, TouchableOpacity } from 'react-native';
import * as React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Profile from './pages/profile';
import HomeScreen from './pages/home';
import LoginScreen from './pages/login';
import SignupScreen from './pages/signup';
import AboutScreen from './pages/about';
import PromptScreen from './pages/prompt';
import { FontAwesome5 } from '@expo/vector-icons';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import {useEffect,useState} from 'react';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useUserData } from './pages/authHelpers';
const Drawer = createDrawerNavigator();

export default function App() {
  const { image, userName, isLogged, setIsLogged } = useUserData();

  return (
        <SafeAreaView style={{ flex: 1 }}>
          <NavigationContainer>

              <Drawer.Navigator
                initialRouteName={isLogged ? 'Home' : 'Login'}
                drawerStyle={styles.drawerStyle}
                drawerContent={(props) => (
                  <DrawerContentScrollView {...props}>
                    <View style={styles.drawerHeaderContainer}>
                      <ImageBackground source={require('./assets/a.jpg')} style={styles.drawerHeaderBackground}>

                      <Image style={styles.userImage}
                      source={image ? { uri: image } : require('./assets/profile_icon.jpg')}
                      />

                        <Text style={styles.userName}>{userName}</Text>
                      </ImageBackground>
                    </View>
                    <DrawerItemList {...props} />
                  </DrawerContentScrollView>
                )}
              >
                <Drawer.Screen name="Profile" component={Profile} />
                <Drawer.Screen name="Home" component={HomeScreen} />
                <Drawer.Screen name="About" component={AboutScreen} />
                <Drawer.Screen name="Login">
                  {props => (
                    <LoginScreen {...props} onLogin={() => setIsLogged(true)} />
                  )}
                </Drawer.Screen>
                <Drawer.Screen name="Signup" component={SignupScreen} />
                <Drawer.Screen name="Prompt" component={PromptScreen} />
              </Drawer.Navigator>

          </NavigationContainer>
        </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  drawerStyle: {
    backgroundColor: '#F5F5F5',
    width: '80%',
  },
  drawerHeaderContainer: {
  marginTop:51.5,
    height: 200,
  },
  drawerHeaderBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'blue',
  },
  userImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userName: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
   buttonText: {
      fontSize: 18,
      marginHorizontal: 12,
      color: 'black',
      fontWeight: '500',
    },
    bt: {
        marginTop: 10,
        width: 250,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#deb887',
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
});

