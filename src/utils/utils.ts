import fetch from 'node-fetch';

export function validateTag(msg: string, encode = false): string | false {
	if (!msg) return false;
	const tag = msg.toUpperCase().replace(/O/g, '0').replace('#', '');
	const tagRegex = /[0289PYLQGRJCUV]{3,9}/g;
	const result = tagRegex.exec(tag);
	return result ? encode ? encodeURIComponent(`#${result[0]}`) : `#${result[0]}` : false;
}

export async function fetchURL(url: string, token: string, timeout: number) {
	const res = await fetch(url, {
		headers: {
			Authorization: `Bearer ${token}`,
			Accept: 'application/json'
		},
		timeout
	}).catch(() => null);

	if (!res) return { ok: false, status: 504 };
	const parsed = await res.json().catch(() => null);
	if (!parsed) return { ok: false, status: res.status };

	const cacheControl = res.headers.get('cache-control');
	const MAX_AGE = cacheControl ? Number(cacheControl!.split('=')[1]) : 0;
	return Object.assign(parsed, {
		maxAge: MAX_AGE,
		status: res.status,
		ok: res.status === 200
	});
}