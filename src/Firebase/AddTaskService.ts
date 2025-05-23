// firebase/addTask.ts
import { db } from './FirebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

export async function addTaskToList(listId: string, title: string, description: string) {
  try {
    const tasksRef = collection(db, 'lists', listId, 'tasks');
    await addDoc(tasksRef, {
      title,
      description,
      done: false,
    });
    console.log('Task added successfully');
  } catch (error) {
    console.error('Error adding task:', error);
  }
}
