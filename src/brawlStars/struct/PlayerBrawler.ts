import Brawler from './Brawler';

export default class PlayerBrawler extends Brawler {
	public constructor(json: any) {
		super(json);
		this.rank = json.rank || 1;
		this.trophies = json.trophies || 0;
		this.highestTrophies = json.highestTrophies || 0;
		this.power = json.power || 0;
    }

	public rank: number;
	public trophies: number;
	public highestTrophies: number;
	public power: number;
}
