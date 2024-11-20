import * as admin from 'firebase-admin';
import * as v2 from 'firebase-functions/v2';

admin.initializeApp();

export const sendPushNotification = v2.database.ref('/notifications/{recipientType}')
  .onWrite(async (change, context) => {
    const { recipientType } = context.params;
    const data = change.after.val();

    if (!data) return null; // No notification to send

    // Define the FCM payload
    const payload = {
      notification: {
        title: recipientType === 'parent' ? "Parent Notification" : "Driver Notification",
        body: data.message,
      },
    };

    try {
      // Get the tokens from your database
      const snapshot = await admin.database().ref(`/tokens/${recipientType}`).once('value');
      const tokens = Object.values(snapshot.val() || {});
      
      if (tokens.length > 0) {
        // Send the notification to all tokens
        await admin.messaging().sendToDevice(tokens, payload);
      } else {
        console.log("No tokens available");
      }
    } catch (error) {
      console.error("Error sending notification:", error);
    }

    return null;
  });
