export default class PlayerBattleLog {
	public constructor(json: any) {
		this.battle = json.battle;
		this.battleTime = json.battleTime;
		this.event = json.event;
	}

	public battle: any; //again that {} thing.
	public battleTime: string;
	public event: { mode: string; id: number; map: any }; //again that {} thing.
}
