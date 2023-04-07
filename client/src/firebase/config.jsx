// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyDX8TSfmtu5ct8V6YNgDf0C2uvDt0dOGvA',
	authDomain: 'note-app-graphql-1b1fc.firebaseapp.com',
	projectId: 'note-app-graphql-1b1fc',
	storageBucket: 'note-app-graphql-1b1fc.appspot.com',
	messagingSenderId: '82822841642',
	appId: '1:82822841642:web:7f3f05889a2ad86e410a53',
	measurementId: 'G-MMKSGE99K2',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);
