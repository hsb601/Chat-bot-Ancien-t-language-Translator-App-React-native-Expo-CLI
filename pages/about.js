import { StyleSheet, Text, TouchableOpacity, View,ImageBackground } from 'react-native';
import { Box, NativeBaseProvider } from 'native-base';
import { Icon } from 'react-native-elements';
import * as Linking from 'expo-linking';
export default function AboutScreen({ navigation }) {
 const openLinkedIn = () => {
    Linking.openURL('https://www.linkedin.com/in/haseeb-khan-997b73257');
  };

 const openGmail = async () => {
     const recipient = 'haseebkhanhk601@gmail.com';
     const subject = 'Hello from the Hebrewly';
     const body = 'Type your message here: ';

     const url = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

     const supported = await Linking.canOpenURL(url);

     if (supported) {
       await Linking.openURL(url);
     } else {
       console.log("Don't know how to open this URL:", url);
     }
   };

  const openTwitter = () => {
    Linking.openURL('https://www.twitter.com'); // Replace with the actual Twitter URL
  };
  return (
   <NativeBaseProvider>
     <ImageBackground source={require('../assets/chatbot.jpeg')} style={{width: '100%', height: '100%'}}>

<View style={styles.container}>
<Box style={styles.cardHeader}>
 <Text  style={styles.subheading}>Ancient language Translator (Hebrewly)</Text>

</Box>
<Box style = {styles.cardBody}>
<Text style={styles.txt}>Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                                        Quaerat autem labore voluptas repudiandae voluptatem veniam
                                        tenetur facere neque omnis aperiam, nam deserunt minima ullam
                                        dolore iste eius assumenda consectetur a!</Text>

<Box style = {styles.footer}>

              <TouchableOpacity style={{ marginLeft: 12 }} onPress={openLinkedIn}>
                      <Icon name='linkedin' type='font-awesome' color='#deb887'/>
                    </TouchableOpacity>
                    <Text style={styles.txt}>LinkedIn</Text>

                    <TouchableOpacity style={{ marginLeft: 32 }} onPress={openGmail}>
                      <Icon name='envelope' type='font-awesome' color='#deb887'/>
                    </TouchableOpacity>
                    <Text style={styles.txt}>Gmail</Text>

                    <TouchableOpacity style={{ marginLeft: 14 }} onPress={openTwitter}>
                      <Icon name='twitter' type='font-awesome' color='#deb887'/>
                    </TouchableOpacity>
                    <Text style={styles.txt}>Twitter</Text>
</Box>
</Box>
</View>
</ImageBackground>
</NativeBaseProvider>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
    height: 60,

    },
         subheading: {
            fontSize: 20,
            fontWeight: '900',
            color: '#deb887',
             paddingHorizontal: 10,
             textAlign: 'center',
          },
           txt:{
              flex: 2,
              fontSize: 15,
              color: '#deb887',
              textAlign: 'left',
              paddingHorizontal: 5,
              fontWeight: '600',
              },
          cardHeader: {
            justifyContent: 'center',
            marginLeft: 1,
            backgroundColor: 'white',
            height: 55,
            width: 331,
            borderColor: '#7C4700',
             borderWidth: 2,

          },
          cardBody:{
           backgroundColor: '#fff',
           height: 148,
           width: 329,
          },

          footer: {
            width: 330,
            paddingVertical: 4,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'white',
            borderColor: '#7C4700',
            borderWidth: 2,
          },
    });
