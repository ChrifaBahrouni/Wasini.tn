import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCetp3x15t4Y3kjvtrki4uX8Lz8iAJtmio",
  authDomain: "wasini-dbf51.firebaseapp.com",
  projectId: "wasini-dbf51",
  storageBucket: "wasini-dbf51.appspot.com",
  messagingSenderId: "794581397105",
  appId: "1:794581397105:web:6a085577ce597c425335d0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);