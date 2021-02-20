import PlayerBrawler from './PlayerBrawler';

/**
 * Get a player from raw json response.
 */
export default class Player {
	constructor(json: any) {
		this.json = json;
		this.isQualifiedFromChampionshipChallenge =
			json.isQualifiedFromChampionshipChallenge || false;
		this.iqfcc = json.isQualifiedFromChampionshipChallenge || false;
		this._3v3Victories = json['3v3Victories'] || 0;
		this._3v3Wins = json['3v3Victories'];
		this.icon = json.icon;
		this.iconId = json.icon.id;
		this.tag = json.tag;
		this.name = json.name;
		this.trophies = json.trophies || 0;
		this.expLevel = json.expLevel || 1; //i guess it is 1 when u start.
		this.expPoints = json.expPoints || 0;
		this.highestTrophies = json.highestTrophies || 0;
		this.powerPlayPoints = json.powerPlayPoints || 0;
		this.PPPoints = json.powerPlayPoints || 0;
		this.highestPowerPlayPoints = json.highestPowerPlayPoints || 0;
		this.highestPPPoints = json.highestPowerPlayPoints || 0;
		this.soloVictories = json.soloVictories || 0;
		this.soloWins = json.soloVictories || 0;
		this.duoVictories = json.duoVictories || 0;
		this.duoWins = json.duoVictories || 0;
		this.totalVictories =
			this.soloVictories + this.duoVictories + this._3v3Victories;
		this.totalWins =
			this.soloVictories + this.duoVictories + this._3v3Victories;
		this.bestRoboRumbleTime = json.bestRoboRumbleTime || 0;
		this.bestRRTime = json.bestRoboRumbleTime || 0;
		this.bestTimeAsBigBrawler = json.bestTimeAsBigBrawler || 0;
		this.bestTimeABB = json.bestTimeAsBigBrawler || 0;
		this.brawlerss = json.brawlers;
		this.nameColor = json.nameColor;
		this.nameColorHex = '#' + json.nameColor.slice(4);
	}

	public json: any;
	public club?: { tag: string; name: string };
	public isQualifiedFromChampionshipChallenge: boolean;
	public iqfcc: boolean;
	public _3v3Victories: number; //had to do _ because variable names cannot start with "_"
	public _3v3Wins: number; // "
	public icon?: { id: number };
	public iconId?: number;
	public tag: string;
	public name: string;
	public trophies: number;
	public expLevel: number;
	public expPoints: number;
	public highestTrophies: number;
	public powerPlayPoints: number;
	public PPPoints: number;
	public highestPowerPlayPoints: number;
	public highestPPPoints: number;
	public soloVictories: number;
	public soloWins: number;
	public duoVictories: number;
	public duoWins: number;
	public totalVictories: number;
	public totalWins: number;
	public bestRoboRumbleTime: number;
	public bestRRTime: number;
	public bestTimeAsBigBrawler: number;
	public bestTimeABB: number;
	public brawlerss: any;
	public get brawlers() {
		let brawlers = [];
		for (let brawler in this.brawlerss) {
			brawlers.push(new PlayerBrawler(brawler));
		}
		return brawlers;
	}
	public nameColor: string;
	public nameColorHex: string;
}
module.exports = Player;
