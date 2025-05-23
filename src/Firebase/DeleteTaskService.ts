import { doc, deleteDoc } from "firebase/firestore";
import { db } from "./FirebaseConfig";

export async function deleteTask(listId: string, taskId: string): Promise<void> {
  const taskRef = doc(db, `lists/${listId}/tasks/${taskId}`);
  await deleteDoc(taskRef);
}
