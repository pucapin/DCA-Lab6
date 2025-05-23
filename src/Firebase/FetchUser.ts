import { getFirestore, doc, getDoc } from "firebase/firestore";

const db = getFirestore();

async function fetchUserInfo(userId: string) {
  const infoRef = doc(db, "users", userId);
  const infoSnap = await getDoc(infoRef);
  if (infoSnap.exists()) {
    return infoSnap.data();
  } else {
    console.warn("No user info found");
    return null;
  }
}

export {fetchUserInfo}