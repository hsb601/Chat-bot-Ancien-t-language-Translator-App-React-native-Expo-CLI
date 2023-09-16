
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { auth, firestore } from '../firebase';
 /*<Icon
                color='#964B00'
                name='comments'
                type='font-awesome'
                size={50}
              />*/
export default function SignupScreen({navigation}) {
  const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [retypePassword, setRetypePassword] = useState('');

   const handleSignUp = async () => {
     if (password !== retypePassword) {
       alert('Passwords do not match');
       return;
     }

     try {
       const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
       const user = userCredentials.user;

       // Store user information in Firestore
        const userDocRef = doc(firestore, 'users', user.uid);
             await setDoc(userDocRef, {
               name,
               email,
               password,
               // Additional data you want to store
             });

       console.log('Registered with:', user.email);
       alert('You registered with: ' + user.email);
     } catch (error) {
       alert(error.message);
     }
   };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
     <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <View style={styles.bigCircle}></View>
        <View style={styles.smallCircle}></View>
        <View style={styles.centerizedView}>
          <View style={styles.authBox}>
            <View>
            <Image style={styles.logoBox} source={require('../assets/logo.png')} />
            </View>
            <Text style={styles.loginTitleText}>Signup</Text>
            <View style={styles.hr}></View>
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <TextInput
                style={styles.input}
                autoCapitalize={false}
                keyboardType='user-name'
                value={name}
                 onChangeText={text => setName(text)}
              />
            </View>
             <View style={styles.inputBox}>
                          <Text style={styles.inputLabel}>Email</Text>
                          <TextInput
                            style={styles.input}
                            autoCapitalize={false}
                            keyboardType='email-address'
                           value={email}
                           onChangeText={text => setEmail(text)}
                          />
                        </View>
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                style={styles.input}
                autoCapitalize={false}
                secureTextEntry={true}
                 value={password}
                 onChangeText={text => setPassword(text)}
              />
            </View>
             <View style={styles.inputBox}>
                          <Text style={styles.inputLabel}>Re-enter Password</Text>
                          <TextInput
                            style={styles.input}
                            autoCapitalize={false}
                            secureTextEntry={true}
                           value={retypePassword}
                           onChangeText={text => setRetypePassword(text)}
                          />
                        </View>

            <TouchableOpacity style={styles.loginButton} onPress={handleSignUp}>
              <Text style={styles.loginButtonText}>Signup</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.registerText}>
                Go to Login!
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
         </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  bigCircle: {
    width: Dimensions.get('window').height * 0.7,
    height: Dimensions.get('window').height * 0.7,
    backgroundColor: '#deb887',
    borderRadius: 1000,
    position: 'absolute',
    right: Dimensions.get('window').width * 0.60,
    top: -50,
  },
  smallCircle: {
    width: Dimensions.get('window').height * 0.4,
    height: Dimensions.get('window').height * 0.4,
    backgroundColor: '#deb887',
    borderRadius: 1000,
    position: 'absolute',
    bottom: Dimensions.get('window').width * -0.2,
    right: Dimensions.get('window').width * -0.3,
  },
  centerizedView: {
    width: '100%',
    top: '15%',
  },
  authBox: {
    width: '80%',
    backgroundColor: '#fafafa',
    borderRadius: 20,
    alignSelf: 'center',
    paddingHorizontal: 14,
    marginBottom: 100,
    paddingBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoBox: {
      width: 300,
       height: 180,
       borderRadius: 40,
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 23,
    top: -110,
    marginBottom: -120,
      shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
  },
  loginTitleText: {
    fontSize: 26,
    fontWeight: 'bold',
    color:'black',
  },
  hr: {
    width: '100%',
    height: 1,
    backgroundColor: '#7C4700',
    marginTop: 6,
  },
  inputBox: {
    marginTop: 10,
  },
  inputLabel: {
    fontSize: 18,
    marginBottom: 6,
    color: 'black',
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#dfe4ea',
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  loginButton: {
    backgroundColor: '#7C4700',
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 4,
  },
  loginButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  registerText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color:'black',
  },
  forgotPasswordText: {
    textAlign: 'center',
    marginTop: 12,
    fontSize: 16,
    color:'black',
  },
  scrollViewContainer: {
      flexGrow: 1,
      justifyContent: 'center',
    },
});
