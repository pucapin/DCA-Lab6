import { doc, updateDoc } from 'firebase/firestore';
import { db } from './FirebaseConfig';

export async function updateTaskState(listId: string, taskId: string, done: boolean) {
  try {
    const taskRef = doc(db, 'lists', listId, 'tasks', taskId);
    await updateDoc(taskRef, { done });
    console.log('Task updated successfully');
  } catch (error) {
    console.error('Error updating task:', error);
  }
}
