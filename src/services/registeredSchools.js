import { collection, getDocs, updateDoc, doc, getFirestore } from 'firebase/firestore';
import { app } from '../configs/firebase.config';

const db = getFirestore(app);

// Fetch all schools from Firestore
export const registeredSchools = async () => {
  try {
    const schoolsCollection = collection(
      db,
      'admin/MmwTJpDWtFzHxd7zj2Vv/schoolsRegistered'
    );
    const snapshot = await getDocs(schoolsCollection);

    const schoolData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return schoolData;
  } catch (error) {
    console.error('Error fetching schools:', error);
    throw new Error('Could not fetch schools');
  }
};

// Toggle subscription status for a school
export const toggleSubscription = async (schoolId, subscribed) => {
  try {
    const schoolDocRef = doc(
      db,
      `admin/MmwTJpDWtFzHxd7zj2Vv/schoolsRegistered/${schoolId}`
    );

    await updateDoc(schoolDocRef, { subscribed });
  } catch (error) {
    console.error('Error toggling subscription:', error);
    throw new Error('Could not update subscription status');
  }
};
