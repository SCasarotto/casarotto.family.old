const {
  // Base URL
  REACT_APP_BASE_URL,
  REACT_APP_API_BASE,
  REACT_APP_FIREBASE_API_KEY,
  REACT_APP_FIREBASE_AUTH_DOMAIN,
  REACT_APP_FIREBASE_DATABASE_URL,
  REACT_APP_FIREBASE_PROJECT_ID,
  REACT_APP_FIREBASE_STORAGE_BUCKET,
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  REACT_APP_FIREBASE_APP_ID,
  REACT_APP_FIREBASE_MEASUREMENT_ID,
  REACT_APP_FIREBASE_VAPID_KEY,
} = process.env;

export const settings = {
  VERSION: '0.1.0',
  BASE_URL: REACT_APP_BASE_URL,

  // API
  API_BASE_URL: REACT_APP_API_BASE,
  API_DEBUGGING: process.env.NODE_ENV === 'development',

  // Firebase
  FIREBASE_API_KEY: REACT_APP_FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN: REACT_APP_FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL: REACT_APP_FIREBASE_DATABASE_URL,
  FIREBASE_PROJECT_ID: REACT_APP_FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET: REACT_APP_FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID: REACT_APP_FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID: REACT_APP_FIREBASE_MEASUREMENT_ID,
  FIREBASE_VAPID_KEY: REACT_APP_FIREBASE_VAPID_KEY,
  FIREBASE_PERFORMANCE: process.env.NODE_ENV === 'development',
};
