import * as firebase from 'firebase';
import '@firebase/auth';
import settings from './config.json';

  // Your web app's Firebase configuration
  const firebaseConfig = settings.FIREBASE_CONFIG; 

firebase.initializeApp(firebaseConfig);
export default firebase;