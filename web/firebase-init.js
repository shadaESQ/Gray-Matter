import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDMzI4b3nrqxWDpXsq6ObLjh-BzQq2pwSs",
    authDomain: "gray-matter-2ad47.firebaseapp.com",
    databaseURL: "https://gray-matter-2ad47-default-rtdb.firebaseio.com",
    projectId: "gray-matter-2ad47",
    storageBucket: "gray-matter-2ad47.appspot.com",
    messagingSenderId: "119177876478",
    appId: "1:119177876478:web:3e71b9cf747693d07226af"
  };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app); 

// تأكد من أن الوظائف معرفة بشكل صحيح ومستوردة في x3.js إذا كنت تستخدم modules.
export function login(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Inside your module, define validateForm like this:
           window.validateForm = function() {
          
       };

        })
        .catch((error) => {
            alert('Login Failed: ' + error.message);
        });
}

uth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        console.log('Logged in as:', userCredential.user.uid);
        res.send("تم تسجيل الدخول بنجاح!");
    })
    .catch((error) => {
        console.error('Login failed:', error);
        res.status(401).send("فشل في تسجيل الدخول!");
    });
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
const database = firebase.database();

module.exports = database;

// Save the new user's data
db.ref('users').push(newUser)
  .then(() => console.log('Data saved successfully!'))
  .catch(error => console.error('Error saving data: ', error));