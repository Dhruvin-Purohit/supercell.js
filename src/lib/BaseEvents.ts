import { EventEmitter } from 'events';
import { Store } from './Store';
import { Throttler } from '../utils/Throttler';
import { fetchURL } from '../utils/utils';
import { AsyncQueue } from '../utils/AsyncQueue';

export class BaseEvents extends EventEmitter {

	public clans: Store = new Store();
	public players: Store = new Store();
	public wars: Store = new Store();

	public rateLimit: number;
	public refreshRate: number;

	private tokens: string[];

	private baseUrl: string;
	private timeout: number;

	private throttler: Throttler;
	private activeToken = 0;
	private queue: AsyncQueue = new AsyncQueue();

	public isInMaintenance = Boolean(false);

	public constructor(options: EventsOption) {
		super();

		this.baseUrl = options.baseUrl || 'https://api.clashofclans.com/v1';
		this.timeout = options.timeout || 0;
		this.tokens = options.tokens;
		this.rateLimit = options.rateLimit || 10;
		this.refreshRate = options.refreshRate || 2 * 60 * 1000;
		this.throttler = new Throttler(this.rateLimit * this.tokens.length);
	}

	public async checkMaintenace(): Promise<void> {
		const data = await this.fetch(`/clans?limit=1&minMembers=${Math.floor(Math.random() * 40) + 10}`);
		if (data.status === 503 && !this.isInMaintenance) {
			this.isInMaintenance = Boolean(true);
			this.emit('maintenanceStart');
		} else if (data.status === 200 && this.isInMaintenance) {
			this.isInMaintenance = Boolean(false);
			this.emit('maintenanceEnd');
		}
		setTimeout(this.checkMaintenace.bind(this), 0.5 * 60 * 1000);
	}

	private get token(): string {
		const token = this.tokens[this.activeToken];
		this.activeToken = (this.activeToken + 1) >= this.tokens.length ? 0 : (this.activeToken + 1);
		return token!;
	}

	public async fetch(path: string): Promise<any> {
		await this.queue.wait();
		try {
			return await fetchURL(`${this.baseUrl}${path}`, this.token, this.timeout);
		} finally {
			await this.throttler.throttle();
			this.queue.shift();
		}
	}

}

interface EventsOption {
	tokens: string[];
	baseUrl?: string;
	timeout?: number;
	rateLimit?: number;
	refreshRate?: number;
}
