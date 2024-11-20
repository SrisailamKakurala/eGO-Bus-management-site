import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../configs/firebase.config";

const db = getFirestore(app);

// Authenticate User
export const authenticateUser = async (schoolID, password) => {
  try {
    // Admin authentication
    const adminDoc = doc(db, "admin", "MmwTJpDWtFzHxd7zj2Vv");
    const adminSnapshot = await getDoc(adminDoc);

    if (adminSnapshot.exists()) {
      const adminData = adminSnapshot.data();

      if (adminData.id === schoolID && adminData.pass === password) {
        return { isAdmin: true }; // Admin login success
      }
    }

    // School authentication
    const schoolDoc = doc(db, "admin", "MmwTJpDWtFzHxd7zj2Vv", "schoolsRegistered", schoolID);
    const schoolSnapshot = await getDoc(schoolDoc);

    if (schoolSnapshot.exists()) {
      const schoolData = schoolSnapshot.data();
      console.log("School Data Retrieved:", schoolData);

      // Debug the field values
      console.log("Password in Firestore:", schoolData.password);
      console.log("Password provided:", password);
      console.log("Subscription in Firestore:", schoolData.subscription);

      // Check conditions
      if (schoolData.password === password && schoolData.subscribed === true) {
        return { isAdmin: false, schoolID }; // Management login success
      } else if (schoolData.subscribed === false) {
        throw new Error("School subscription is not active. Please contact eGO Bus.");
      } else {
        throw new Error("Invalid school credentials.");
      }
    } else {
      throw new Error("School not found.");
    }


    // If neither admin nor school matches
    throw new Error("Invalid School ID or Password.");
  } catch (error) {
    throw new Error("Authentication failed: " + error.message);
  }
};
