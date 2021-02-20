export default class Brawler {
    public constructor(json: any) {
        this.gadgets = json.gadgets
        this.starPowers = json.starPowers
        this.name = json.name
        this.id = json.id
    }
    public gadgets?: {name: any, id: number}//any because they show {} when it should be ""
    public starPowers?: {name: any, id: number}
    public name: string//still shows {} but i guess it is ""
    public id: number
}