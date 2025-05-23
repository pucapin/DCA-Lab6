import { getAuth } from "firebase/auth";
import { signOut } from "firebase/auth";
import Navigate from "../utils/Navigate";

const logoutUser = async () => {
  const auth = getAuth();
  try {
    await signOut(auth);
    console.log('User logged out successfully');
    Navigate('/')

} catch (error) {
    console.error('Error logging out:', error);
  }
};

export {logoutUser}
