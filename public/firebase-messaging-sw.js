importScripts('https://www.gstatic.com/firebasejs/7.9.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.9.1/firebase-messaging.js');
if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: "AIzaSyACkH6XDr_u1qx9AMUWH1yI2ekAN698mNA",
        authDomain: "fay-buc.firebaseapp.com",
        databaseURL: "https://fay-buc.firebaseio.com",
        projectId: "fay-buc",
        storageBucket: "fay-buc.appspot.com",
        messagingSenderId: "833240716894",
        appId: "1:833240716894:web:e036d87f2c72cce237c6cf",
        measurementId: "G-CLE9H4GLKP"
    });
    firebase.messaging();
    //background notifications will be received here
    firebase.messaging().setBackgroundMessageHandler((payload) => console.log('payload', payload));
}