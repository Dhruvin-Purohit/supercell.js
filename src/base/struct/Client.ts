import EventEmitter from 'node:events';
import axios, { AxiosInstance } from 'axios';

export default class Client extends EventEmitter {
	public constructor(options: BaseClientOptions) {
		super();
		this.url = options.url;
		this.token = options.token;
	}

	public url: string;

	public token: string;

	//IDK HOW TO INSTANTIATE IT WITHOUT MAKING IT RETURN UNDEFINED AND ALL
	public _api?: AxiosInstance;

	public get api() {
		if (!this._api) {
			this._api = axios.create({
				baseURL: this.url,
				headers: {
					Authorization: 'Bearer ' + this.token,
				},
			});
		}
		return this._api;
	}
}
