import firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyDmg1DSr_x3JObwQV4JLeww4djBZOxZ4bQ",
  authDomain: "my-project-1585990484117.firebaseapp.com",
  projectId: "my-project-1585990484117",
  storageBucket: "my-project-1585990484117.appspot.com",
  messagingSenderId: "357154077166",
  appId: "1:357154077166:web:6b865e42b759d9929736ff",
  measurementId: "G-6Q55WKC93S"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase