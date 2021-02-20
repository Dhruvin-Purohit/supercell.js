import BaseClient from '../base/struct/Client';
import getTag from '../base/utils/getTag';
import Player from './struct/Player';
import Club from './struct/Club';
import Brawler from './struct/Brawler';
import PlayerBattleLog from './struct/PlayerBattleLog';

export default class Client extends BaseClient {
	public constructor(options: ClientOptions) {
		let baseOptions = {
			url: options.url || 'https://api.brawlstars.com/v1',
			token: options.token,
		};
		super(baseOptions);

		this.url = baseOptions.url;
		this.token = baseOptions.token;
	}

	public async getPlayer(tag: string) {
		let res = await this.api.get('/players/%23' + getTag(tag));
		if (res.status === 200) {
			return {
				data: new Player(res.data),
				res: res,
			};
		} else {
			//Just so they get to know if something is wrong or not etc. event can be listened for and action can be taken.
			this.emit('getPlayerError', this, res, getTag(tag));
			return {
				data: undefined,
				res: res,
			};
		}
	}

	public async getClub(tag: string) {
		let res = await this.api.get('/clubs/%23' + getTag(tag));
		if (res.status === 200) {
			return {
				data: new Club(res.data),
				res: res,
			};
		} else {
			//Just so they get to know if something is wrong or not etc. event can be listened for and action can be taken.
			this.emit('getClubError', this, res, getTag(tag));
			return {
				data: undefined,
				res: res,
			};
		}
	}

	public async getBrawlers() {
		let res = await this.api.get('/brawlers/');
		if (res.status === 200) {
			let brawlers = [];
			for (let br in res.data) {
				brawlers.push(new Brawler(br));
			}
			return {
				data: brawlers,
				res: res,
			};
		} else {
			this.emit('getBrawlerError', this, res);
			return {
				data: undefined,
				res: res,
			};
		}
	}

	public async getPlayerBattleLog(tag: string) {
		let res = await this.api.get('/players/' + getTag(tag) + '/battlelog');
		if (res.status === 200) {
			//Also need to do another check to see if the player has actually played a battle or not.
			let battles = [];
			for (let battle in res.data.something) {
				//needs to get fixed
				battles.push(new PlayerBattleLog(battle));
			}
			return {
				data: battles,
				res: res,
			};
		} else {
			this.emit('getPlayerBattleLogError', this, res, getTag(tag));
			return {
				data: undefined,
				res: res,
			};
		}
	}
}
