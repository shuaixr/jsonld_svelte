/// <reference lib="webworker" />
import { version, files, build } from '$service-worker';
declare const self: ServiceWorkerGlobalScope;
const ASSETS = `cache${version}`;

const to_cache = build.concat(files);
self.addEventListener('install', (event) => {
	event.waitUntil(
		caches
			.open(ASSETS)
			.then((cache) => cache.addAll(to_cache))
			.then(() => {
				self.skipWaiting();
			})
	);
});

self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.keys().then(async (keys) => {
			// delete old caches
			for (const key of keys) {
				if (key !== ASSETS) await caches.delete(key);
			}

			self.clients.claim();
		})
	);
});
self.addEventListener('fetch', (event) => {
	if (event.request.url.startsWith(self.location.origin)) {
		event.respondWith(
			(async function () {
				const cache = await caches.open(ASSETS);
				const cachedResponse = await cache.match(event.request);
				const networkResponsePromise = fetch(event.request);

				event.waitUntil(
					(async function () {
						const networkResponse = await networkResponsePromise;
						await cache.put(event.request, networkResponse.clone());
					})()
				);

				// Returned the cached response if we have one, otherwise return the network response.
				return cachedResponse || networkResponsePromise;
			})()
		);
	}
});
