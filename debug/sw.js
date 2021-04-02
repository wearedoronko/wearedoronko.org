
        /* eslint-disable */
        // ServiceWorker revision: rev1eVfCh
        importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');
        workbox.setConfig({ debug: false });
        workbox.core.skipWaiting();
        workbox.core.clientsClaim();
        workbox.precaching.cleanupOutdatedCaches(true);
        workbox.precaching.precacheAndRoute([{"url":"/?launch=homescreen","revision":"rev1eVfCh"},{"url":"/","revision":"rev1eVfCh"},{"url":"/article/five-unique-points","revision":"rev1eVfCh"},{"url":"/article/a-day-in-doronko","revision":"rev1eVfCh"},{"url":"/article/jike-furusato-mura","revision":"rev1eVfCh"},{"url":"/article/about","revision":"rev1eVfCh"},{"url":"/article/dorofes","revision":"rev1eVfCh"},{"url":"/staff","revision":"rev1eVfCh"}]);
        workbox.routing.registerRoute(
          ({url}) => url.pathname.includes('/img/'),
          new workbox.strategies.StaleWhileRevalidate(),
        );
      