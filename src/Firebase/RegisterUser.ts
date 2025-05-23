import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./FirebaseConfig";
import { getAuth,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, setDoc, collection, addDoc } from "firebase/firestore";


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)

const createListForUser = async (userId: string) => {
    try {
        const listRef = doc(db, "lists", userId);
        await setDoc(listRef, {
            userId,
            createdAt: new Date()
        });

        // Optional: create first task
        await addDoc(collection(listRef, "tasks"), {
            title: "Welcome task",
            description: "This is your first task!",
            done: false,
        });
    } catch (error) {
        console.error("Failed to create list:", error);
    }
};



const registerUser = async (email: string, password: string, username: string) => {
	try {
		const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

		// Save extra user info in Firestore
		await setDoc(doc(db, "users", user.uid), {
			email: user.email,
			username: username,
			createdAt: new Date()
		});

        await createListForUser(user.uid);
        return { isRegistered: true, user: userCredential };
	} catch (error) {
		console.error(error);
		return { isRegistered: false, error: error };
	}
};

export {registerUser}

