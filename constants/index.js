export const FacebookAppId = process.env.NODE_ENV == "production" ? "576930306511457" : '249068886329486';
export const GoogleClientId = "750065301705-dri9grqgk7b9sfgf57oo3pmqqffp1kva.apps.googleusercontent.com"
export default {
    apiHost: process.env.NODE_ENV == "production" ? "https://35.232.6.168/api" : "http://localhost:1337/api"
    // apiHost: process.env.NODE_ENV == "production" ? "https://snappost-api.herokuapp.com/api" : "http://localhost:1337/api"
}

export const backendHost = process.env.NODE_ENV == "production" ? "https://35.232.6.168" : "http://localhost:1337"

export const firebaseConfig = {
    apiKey: "AIzaSyACkH6XDr_u1qx9AMUWH1yI2ekAN698mNA",
    authDomain: "fay-buc.firebaseapp.com",
    databaseURL: "https://fay-buc.firebaseio.com",
    projectId: "fay-buc",
    storageBucket: "fay-buc.appspot.com",
    messagingSenderId: "833240716894",
    appId: "1:833240716894:web:e036d87f2c72cce237c6cf",
    measurementId: "G-CLE9H4GLKP"
};