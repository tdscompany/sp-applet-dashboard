import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
//   measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

// export function writeProjectData(projectId, title, spotifyId) {
//   const db = getDatabase();
//   set(ref(db, 'projects/' + spotifyId), {
//     title: title,
//     projectId: projectId,
//   });
// };

// export function readProjectData(spotifyId) {
//   const db = getDatabase();
//   const readProjectRef = ref(db, 'projects/' + spotifyId);
//   onValue(readProjectRef, (snapshot) => {
//     const data = snapshot.val();
//     console.log(data)
//     if (data === null) return false;
//   })
//   return true;
// };


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);