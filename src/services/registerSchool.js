import { doc, setDoc, getFirestore } from "firebase/firestore";
import {app} from "../configs/firebase.config"

const db = getFirestore(app);

export const registerSchool = async (schoolId, schoolData) => {
  try {
    // Reference the specific document with the given schoolId
    const schoolDocRef = doc(
      db,
      `admin/MmwTJpDWtFzHxd7zj2Vv/schoolsRegistered/${schoolId}`
    );

    // Set the school data in the specified document
    await setDoc(schoolDocRef, schoolData);

    console.log(`School registered successfully with ID: ${schoolId}`);
    return { success: true, id: schoolId, message: "School registered successfully!" };
  } catch (error) {
    console.error("Error registering school:", error);
    return { success: false, message: error.message };
  }
};
