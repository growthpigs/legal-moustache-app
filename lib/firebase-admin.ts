import * as admin from 'firebase-admin';

// Ensure environment variables are defined
if (!process.env.FIREBASE_ADMIN_SDK_PRIVATE_KEY || !process.env.FIREBASE_ADMIN_SDK_CLIENT_EMAIL || !process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
  throw new Error('Firebase Admin SDK environment variables are not set.');
}

// Format the private key correctly (replace literal \n with actual newlines for the SDK)
const formattedPrivateKey = process.env.FIREBASE_ADMIN_SDK_PRIVATE_KEY.replace(/\\n/g, '\n');

// Initialize Firebase Admin SDK only if it hasn't been initialized yet
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_ADMIN_SDK_CLIENT_EMAIL,
        privateKey: formattedPrivateKey,
      }),
      // Optional: databaseURL: `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseio.com` // Needed for Realtime Database adapter, not Firestore
    });
    console.log('Firebase Admin SDK Initialized'); // Log success on server start
  } catch (error) {
    console.error('Firebase Admin SDK initialization error:', error);
  }
}

const adminDb = admin.firestore();
const adminAuth = admin.auth(); // If needed for admin operations

export { admin, adminDb, adminAuth }; // Export the initialized admin instance and services
