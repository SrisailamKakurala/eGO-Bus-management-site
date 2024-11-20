// authService.js
import { getFirestore, doc, getDoc } from "firebase/firestore";
import {app} from "../configs/firebase.config";

const db = getFirestore(app);

export const authenticateUser = async (schoolID, password) => {

  try {
    // Fetch the admin document from Firestore
    const adminDoc = doc(db, "admin", "MmwTJpDWtFzHxd7zj2Vv"); 

    const docSnapshot = await getDoc(adminDoc);

    // Check if the document exists
    if (docSnapshot.exists()) {
      const adminData = docSnapshot.data();

      // Check if the provided credentials match the ones stored in Firestore
      if (adminData.id === schoolID && adminData.pass === password) {
        return { isAdmin: true };  // return a success response
      } else {
        throw new Error("Invalid credentials.");  // throw error for invalid credentials
      }
    } else {
      throw new Error("Admin credentials not found.");  // throw error if no admin data found
    }
  } catch (error) {
    throw new Error("Authentication failed: " + error.message);  // return error message in case of failure
  }
};
