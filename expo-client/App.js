import React, { useState, useRef } from 'react';
import { Alert, Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import axios from 'axios'

import firebase from './firebase';
import settings from './config.json';
var querystring = require('querystring');

/*
**
  This app will have two input boxes: (1) for the phone number; and (2) for the verification code. 
  Each with designated buttons that will execute our verification process.
**
*/
export default function App() {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');

  const [verificationId, setVerificationId] = useState(null);
  const [token, setToken] = useState(null);

  const recaptchaVerifier = useRef(null);

  // const getTest = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:8080/test')
  //     console.log(response)
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

  // useEffect(() => {
  //   getTest()
  // }, [])

  // Function to be called when requesting for a verification code
  const sendVerification = () => {

    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
      .then(setVerificationId);
  }
  
  // Function to be called when confirming the verification code that we received
  // from Firebase via SMS
  const confirmCode = () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      code
    );
    firebase
      .auth()
      .signInWithCredential(credential)
      .then((result) => {
          result.user.getIdToken()
            .then(async token => {
              console.log("TOKEN : " + token)
              // fetch('http://localhost:8080/verify', {
              //   method: 'POST',
              //   headers: {
              //     'Content-Type': 'application/json'
              //   },
              //   body: JSON.stringify({ token })
              // })

              //console.log("axios.post(" + settings.COURTQUE_SERVER_NEW_USER_URL+")");

              var data = {
                name: name,
                phoneNumber: phoneNumber,
                verificationId: token
              };

              console.log("querystring : " + querystring.stringify(data));
              
              const response = await axios.post(settings.COURTQUE_SERVER_NEW_USER_URL, querystring.stringify(data), {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                }
              })
              .then(()=>{setToken(token);})
              .catch(error => {
                console.log("confirm code failed with " + error);
                var message = "Could not confirm user - "; 
                
                if (error.response) {
                  switch (error.response.status) {
                    case 422:
                      message += "Phone Number already confirmed";
                      break;
                    default:
                      message += "error code : " + error.status;
                      break;
                  }
                } else {
                  message += "error code : " + error.status;
                }

                Alert.alert(
                  "Confirm failed!",
                  message,
                  [
                    {
                      text:"OK"
                    }
                  ],
                  {
                    cancelable: false
                  }
                );
              });
            })
            .catch(error => console.log(error))

        // Make Ajax call to server w token
      });
  }

  console.log(process.env.COURTQUE_SERVER_NEW_USER_URL);

  return (
    <View style = { styles.container }>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebase.app().options}
      />
      <View style={styles.fieldSet}>
          <Text style={styles.legendRequired}
          >* Your Name</Text>

        <TextInput
            placeholder="Name"
            keyboardType="ascii-capable"
            onChangeText={setName}
            />
      </View>

      <View style={styles.fieldSet}>
          <Text style={styles.legendRequired}
          >* Phone Number</Text>
        <TextInput
            placeholder="Phone Number"
            keyboardType="phone-pad"
            onChangeText={setPhoneNumber}
            autoCompleteType="tel"
            />
      </View>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.button} 
          onPress={sendVerification}>
          <Text 
            style={styles.buttonText}
            >Send Verification</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.fieldSet}>
          <Text
            style={styles.legendReadOnly}
            >Verification ID</Text>
          <Text>
            {verificationId === null || verificationId.trim() === "" ? "N/A" : verificationId.trim()}
          </Text> 
      </View>

      <View style={styles.fieldSet}>
        <Text
          style={styles.legendRequired}
          >* Confirmation Code</Text>
        <TextInput
          style={styles.fieldName}
          placeholder="Confirmation Code"
          onChangeText={setCode}
          keyboardType="number-pad"
        />
      </View>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.button} 
          onPress={confirmCode}>
          <Text
            style={styles.buttonText}>Confirm Code</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.fieldSet}>
          <Text
            style={styles.legendReadOnly}
            >Token</Text>
          <Text>
            {token === null || token.trim() === "" ? "N/A" : token.trim()}
          </Text> 
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  },
  row: {
    padding: 5,
    flexDirection: "row",
    justifyContent: "center"
  },
  button: {
    padding: 5,
    borderColor: "#000000",
    borderWidth: 1,
    fontWeight: "bold",
    fontSize: 24,
    borderRadius: 5
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 24,
  },
  fieldSet:{
    marginTop: 14,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    paddingHorizontal: 10,
    paddingBottom: 10,
    paddingTop:11,
    borderRadius: 5,
    borderWidth: 1,
    alignItems: 'center',
    borderColor: '#000',

    flexDirection: "row",
    justifyContent: "center"
  },
  legendRequired:{
      position: 'absolute',
      top: -15,
      left: 10,
      paddingTop: 3,
      paddingBottom: 3,
      paddingLeft: 6,
      paddingRight: 6,
      backgroundColor: "#0073bd",
      color: "#ffffff",
      fontWeight: "bold",
      borderRadius: 5
    },
    legendReadOnly:{
      position: 'absolute',
      top: -15,
      left: 10,
      paddingTop: 3,
      paddingBottom: 3,
      paddingLeft: 6,
      paddingRight: 6,
      backgroundColor: "#595959",
      color: "#ffffff",
      fontWeight: "bold",
      borderRadius: 5
    }
})



