/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */

// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add any other
// code you'd like.
// You can also remove this file if you'd prefer not to use a
// service worker, and the Workbox build step will be skipped.

import firebase from 'firebase/compat/app';
import 'firebase/compat/messaging';
// import { getMessaging } from 'firebase/messaging';
// import { onBackgroundMessage } from 'firebase/messaging/sw';
import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

// Firebase
import pushIcon from 'assets/images/pushIcon.png';

declare const self: ServiceWorkerGlobalScope;

clientsClaim();

// Precache all of the assets generated by your build process.
// Their URLs are injected into the manifest variable below.
// This variable must be present somewhere in your service worker file,
// even if you decide not to use precaching. See https://cra.link/PWA
precacheAndRoute(self.__WB_MANIFEST);

// Set up App Shell-style routing, so that all navigation requests
// are fulfilled with your index.html shell. Learn more at
// https://developers.google.com/web/fundamentals/architecture/app-shell
const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$');
registerRoute(
  // Return false to exempt requests from being fulfilled by index.html.
  ({ request, url }: { request: Request; url: URL }) => {
    // If this isn't a navigation, skip.
    if (request.mode !== 'navigate') {
      return false;
    }

    // If this is a URL that starts with /_, skip.
    if (url.pathname.startsWith('/_')) {
      return false;
    }

    // If this looks like a URL for a resource, because it contains
    // a file extension, skip.
    if (url.pathname.match(fileExtensionRegexp)) {
      return false;
    }

    // Return true to signal that we want to use the handler.
    return true;
  },
  createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html'),
);

// An example runtime caching route for requests that aren't handled by the
// precache, in this case same-origin .png requests like those from in public/
registerRoute(
  // Add in any other file extensions or routing criteria as needed.
  ({ url }) =>
    url.origin === self.location.origin && url.pathname.endsWith('.png'),
  // Customize this strategy as needed, e.g., by changing to CacheFirst.
  new StaleWhileRevalidate({
    cacheName: 'images',
    plugins: [
      // Ensure that once this runtime cache reaches a maximum size the
      // least-recently used images are removed.
      new ExpirationPlugin({ maxEntries: 50 }),
    ],
  }),
);

// This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Any other custom service worker logic can go here.

// Firebase Push Notifications
const urlParams = new URLSearchParams(location.search);
const firebaseConfig = Object.fromEntries(urlParams);
// console.log('firebaseConfig', firebaseConfig);
firebase.initializeApp(firebaseConfig);
// console.log('app', app);
// const messaging = getMessaging(app);
// console.log('see me2');
// onBackgroundMessage(messaging, (payload) => {
//   console.log('Received background message ', payload);

//   if (payload.notification) {
//     const notificationTitle = payload.notification.title ?? 'New Message';
//     const notificationOptions = {
//       body: payload.notification.body,
//       icon: pushIcon,
//     };

//     self.registration.showNotification(notificationTitle, notificationOptions);
//   }
// });

// I think the thing I need to investigate is trying to run this code only after registration is complete.
// I think the whole mess is happening because this code assumes the service worker is ready but its not

// I don't know why the v9 version of firebase doesn't work but when I revert to the v8 (compat) version it does
firebase.messaging().onBackgroundMessage((payload) => {
  console.log('Received background message ', payload);
  console.log('pushIcon', pushIcon);

  if (payload.notification) {
    const notificationTitle = payload.notification.title ?? 'New Message';
    const notificationOptions = {
      body: payload.notification.body,
      // TODO: Figure out why the icon isn't working
      icon: pushIcon,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  }
});
