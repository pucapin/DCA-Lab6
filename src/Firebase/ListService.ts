import { ListType, TasksType} from "../utils/Types";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./FirebaseConfig";


export async function fetchList(userId:string): Promise<ListType> {
    //Obtener users por medio de FB
    const listsRef = collection(db, "lists"); // colección users
    // por cada user en el doc se almacena la información y se
    //devuelven los users
    const q = query(listsRef, where("userId", "==", userId));
    const snapshot = await getDocs(q);

        const doc = snapshot.docs[0]
        return {
            id: doc.id,
            title: doc.data().title,
            userId: doc.data().userId, 
        }
}


export async function fetchTasks(listId: string): Promise<TasksType[]> {
    //Obtener tasks por medio de FB
    const tasksRef = collection(db, "lists", listId, "tasks"); // colección lists, colección tasks
    const snapshot = await getDocs(tasksRef);

    const tasks: TasksType[] = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
            ...data,
            id: doc.id,
            title: data.title,
            description: data.description,
            done: data.done,

        }
    })
    return tasks;
}