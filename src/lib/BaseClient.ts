import { fetchURL } from '../utils/utils';
import qs from 'querystring';

export class BaseClient {

	private token: string;
	private timeout: number;
	private baseUrl: string;

	public constructor(options: ClientOptions) {
		this.token = options.token;
		this.baseUrl = options.baseUrl;
		this.timeout = options.timeout || 0;
	}

	public get(path: string, options?: any) {
		return fetchURL(`${this.baseUrl}/${path}?${this.query(options)}`, this.token, this.timeout);
	}

	public parseTag(tag: string): string {
		return encodeURIComponent(`#${tag.toUpperCase().replace(/O/g, '0').replace('#', '')}`);
	}

	public query(opts: any) {
		return opts ? qs.stringify(opts) : '';
	}

}

interface ClientOptions {
	baseUrl: string;
	timeout?: number;
	token: string;
}
