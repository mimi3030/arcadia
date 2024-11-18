import {
	getApp,
	getApps,
	initializeApp,
	type FirebaseOptions,
} from "firebase/app"
import { getDatabase } from "firebase/database"
import { getStorage } from "firebase/storage"

const firebaseOptions: FirebaseOptions = {
	apiKey: "AIzaSyB4dAsxKf8flPTgpEmGHzpWgOMwJF4NcNw",
	authDomain: "arcadia-840c2.firebaseapp.com",
	databaseURL:
		"https://arcadia-840c2-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "arcadia-840c2",
	storageBucket: "arcadia-840c2.firebasestorage.app",
	messagingSenderId: "692504554704",
	appId: "1:692504554704:web:3b5537c8acd7a2450c02d5",
	measurementId: "G-K1V7TCS8J7",
}

const firebaseApp =
	getApps().length > 0 ? getApp() : initializeApp(firebaseOptions)
export const db = getDatabase(firebaseApp)
export const storage = getStorage(firebaseApp)
