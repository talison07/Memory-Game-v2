// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-analytics.js";
import { getFirestore, getDocs, collection, doc, addDoc, updateDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export let firebaseConfig = {
  apiKey: "AIzaSyC1i1t9e_rUziKLxBYQI0HXO3VFeUC6DLg",
  authDomain: "memory-game-e0df1.firebaseapp.com",
  projectId: "memory-game-e0df1",
  storageBucket: "memory-game-e0df1.appspot.com",
  messagingSenderId: "624115738646",
  appId: "1:624115738646:web:84c453421541330ec2ad37",
  measurementId: "G-DD1BMBQ0FM"
};





let app = initializeApp(firebaseConfig);
let analytics = getAnalytics(app);
let db = getFirestore(app);
export let snapshotPlayers;
export let c = collection(db, "Players");
export let snapshot = await getDocs(c)

onSnapshot(c, collection => {
  snapshotPlayers = [];
  collection.forEach(doc => {
    snapshotPlayers.push(doc.data());
    console.log(snapshotPlayers);
  })

}
);


export async function updatePlayerMinutes(player, minutes) {

  snapshot.forEach(async (document) => {

    if (document.data().name === player.name) {
      await updateDoc(doc(db, "Players", document.id), {
        "minutes": minutes
      })
      console.log(document.id)
    }

  })
}

export async function updatePlayerSeconds(player, seconds) {

  snapshot.forEach(async (document) => {

    if (document.data().name === player.name) {
      await updateDoc(doc(db, "Players", document.id), {
      "seconds": seconds
      })
      console.log(document.id)
    }

  })
}


export async function addPlayer(player) {
  addDoc(c, player)
}






