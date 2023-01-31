import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	return json({
		short_name: 'PUBLIC_APP_NAME',
		name: `PUBLIC_APP_NAME`,
		icons: [
			{
				src: '/images/icons-vector.svg',
				type: 'image/svg+xml',
				sizes: '512x512'
			},
			{
				src: '/images/icons-192.png',
				type: 'image/png',
				sizes: '192x192'
			},
			{
				src: '/images/icons-512.png',
				type: 'image/png',
				sizes: '512x512'
			}
		],
		start_url: '/',
		display: 'standalone',
		scope: '/',
		theme_color: '#FFFFFF',

		description: 'PUBLIC_APP_DEACRIPTION'
	});
};
