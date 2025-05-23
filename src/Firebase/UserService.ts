import { UserType } from "../utils/Types";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./FirebaseConfig";


export async function fetchUsers(): Promise<UserType[]> {
    //Obtener users por medio de FB
    const usersRef = collection(db, "users"); // colección users
    const snapshot = await getDocs(usersRef);
    // por cada user en el doc se almacena la información y se
    //devuelven los users

    const users: UserType[] = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
            ...data,
            id: doc.id,
            username: data.username || "Unknown"
        }
    })
    return users;
}