import React from 'react';

import ReactDOM from 'react-dom';
import { AppWrapper } from 'react-tec';
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getPerformance } from 'firebase/performance';

import { App } from 'App';
import { settings } from 'config/settings';
import { AppProvider, SideNavActiveProvider, TitleBarProvider } from 'contexts';

import './index.css';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const app = initializeApp({
  apiKey: settings.FIREBASE_API_KEY,
  authDomain: settings.FIREBASE_AUTH_DOMAIN,
  databaseURL: settings.FIREBASE_DATABASE_URL,
  projectId: settings.FIREBASE_PROJECT_ID,
  storageBucket: settings.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: settings.FIREBASE_MESSAGING_SENDER_ID,
  appId: settings.FIREBASE_APP_ID,
  measurementId: settings.FIREBASE_MEASUREMENT_ID,
});
if (settings.FIREBASE_PERFORMANCE) {
  getPerformance(app);
  getAnalytics(app);
}

ReactDOM.render(
  <React.StrictMode>
    <AppWrapper
      theme={{
        primary: '#5a2d36',
        white: '#FFFFFF',
        lightestGray: '#f3f3f3',
        lighterGray: '#f0f0f0',
        lightGray: '#dfdfdf',
        gray: '#b8b8b8',
        darkGray: '#7e7e7e',
        darkerGray: '#464646',
        black: '#181d20',
      }}
    >
      <AppProvider>
        <SideNavActiveProvider>
          <TitleBarProvider>
            <App />
          </TitleBarProvider>
        </SideNavActiveProvider>
      </AppProvider>
    </AppWrapper>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
