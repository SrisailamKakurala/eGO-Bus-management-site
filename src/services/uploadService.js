import { getDatabase, ref, set } from "firebase/database";
import { app } from "../configs/firebase.config";

/**
 * Upload formatted data to Firebase Realtime Database.
 * @param {Object} formattedData - The data to upload.
 * @returns {Promise<Object>} - An object containing the success message or error.
 */
export const uploadToFirebase = async (formattedData) => {
  const db = getDatabase(app);

  try {
    // Check if formattedData is valid and contains at least one schoolID
    if (!formattedData || Object.keys(formattedData).length === 0) {
      throw new Error("No data to upload. The formattedData object is empty or invalid.");
    }

    // Upload data to Firebase
    const schoolsRef = ref(db, "schools");
    await set(schoolsRef, formattedData);

    // Check if the upload includes any schoolID keys
    const schoolID = Object.keys(formattedData);
    if (schoolID.length === 0) {
      throw new Error("Upload successful but no schoolID keys found in the uploaded data.");
    }

    return {
      message: "Upload successful",
      schoolID, // Return all schoolIDs uploaded
    };
  } catch (error) {
    console.error("Error during upload to Firebase:", error.message);
    throw new Error("Upload Failed: " + error.message);
  }
};
