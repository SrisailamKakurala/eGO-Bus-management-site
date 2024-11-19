// src/services/fetchSchoolData.js
import { getDatabase, ref, get } from "firebase/database";
import { app } from "../configs/firebase.config"; // Ensure the path to firebase.config is correct

export const fetchSchoolData = async (schoolId) => {
  try {
    const db = getDatabase(app); // Initialize the database using the app object
    const schoolRef = ref(db, `schools/${schoolId}`); // Correctly point to the S001 node
    const snapshot = await get(schoolRef);

    if (snapshot.exists()) {
      return snapshot.val(); // Return the school data from Firebase
    } else {
      throw new Error("No school data found for S001.");
    }
  } catch (error) {
    console.error("Error fetching data:", error); // Log error details
    throw new Error("Failed to fetch data: " + error.message);
  }
};
