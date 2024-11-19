// src/services/uploadService.js
import { getDatabase, ref, set } from "firebase/database";
import { app } from "../configs/firebase.config";

/**
 * Upload formatted data to Firebase Realtime Database.
 * @param {Object} formattedData - The data to upload.
 * @returns {Promise<string>} - Success message or error.
 */
export const uploadToFirebase = async (formattedData) => {
  const db = getDatabase(app);

  try {
    const schoolsRef = ref(db, "schools");
    await set(schoolsRef, formattedData);
    return "Upload Successful!";
  } catch (error) {
    throw new Error("Upload Failed: " + error.message);
  }
};
