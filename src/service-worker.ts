/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */


import { store } from 'store/store';
import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';
import { CacheFirst } from 'workbox-strategies';


declare const self: ServiceWorkerGlobalScope;

clientsClaim();



precacheAndRoute(self.__WB_MANIFEST);
precacheAndRoute(store.getState().video.videos)
registerRoute(
  ({ request }) => request.destination === 'video',
  new CacheFirst({
    cacheName: 'video-cache',
    plugins: [

    ],
  })
);
const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$');
registerRoute(

  ({ request, url }: { request: Request; url: URL }) => {

    if (request.mode !== 'navigate') {
      return false;
    }
    if (url.pathname.startsWith('/_')) {
      return false;
    }
    if (url.pathname.match(fileExtensionRegexp)) {
      return false;
    }
    return true;
  },
  createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html')
);

registerRoute(
  ({ url }) => {
    return url.origin === self.location.origin && url.pathname.endsWith('.png'),
      new StaleWhileRevalidate({
        cacheName: 'images',
        plugins: [
          new ExpirationPlugin({ maxEntries: 50 }),
        ],
      })
  }
);
// registerRoute(
//   ({ url }) => {
//     console.log(url)
//     return store.getState().video.videos.includes(url);
//   },
//   new StaleWhileRevalidate({
//     cacheName: 'videos-cache',
//   })
// );
// This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
