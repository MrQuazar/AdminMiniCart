import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDwN90HSz0gNQ0cfdYZ_vzL9ZioCQHGgEM",
    authDomain: "minicart-f10c8.firebaseapp.com",
    projectId: "minicart-f10c8",
    storageBucket: "minicart-f10c8.appspot.com",
    messagingSenderId: "593395738188",
    appId: "1:593395738188:web:99a0aad84cd23e1785b6e9",
    measurementId: "G-19NVFJ1WX1",
    databaseURL: "https://minicart-f10c8-default-rtdb.asia-southeast1.firebasedatabase.app"
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export default fire;