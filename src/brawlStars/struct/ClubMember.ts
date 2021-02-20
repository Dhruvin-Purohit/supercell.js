export default class ClubMember {
    public constructor(jsonClubMember: any) {
        this.iconID = jsonClubMember.icon.id || 0
        this.tag = jsonClubMember.tag
        this.name = jsonClubMember.name
        this.trophies = jsonClubMember.trophies
        this.nameColor = jsonClubMember.nameColor
        this.nameColorHex =  '#' + jsonClubMember.nameColor.slice(4)
    }
    public iconID: number
    public tag: string
    public name: string
    public trophies: number
    public nameColor: string
    public nameColorHex: string
}