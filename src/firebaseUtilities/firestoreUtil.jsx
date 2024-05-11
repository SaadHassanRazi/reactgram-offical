import { collection, query, getDocs } from "firebase/firestore";
import { fireDb } from "../firebaseConfig";

export const fetchDataFromFirestore = async (database, collectionStorage) => {
  const q = query(collection(database, collectionStorage));
  const temp = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    temp.push({ ...doc.data(), id: doc.id });
  });
  return temp;
};
export default fetchDataFromFirestore;
