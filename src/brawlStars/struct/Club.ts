import ClubMember from './ClubMember';

export default class Club {
    constructor(json: any) {
        this.name = json.name
        this.tag = json.tag
        this.desc = json.description || ""
        this.description = json.description || ""
        this.type = json.type
        this.badge = json.badgeId
        this.badgeId = json.badgeId
        this.reqTrophies = json.requiredTrophies || 0
        this.requiredTrophies = json.requiredTrophies || 0
        this.memberss = json.members
    }

    public name: string
    public tag: string
    public desc: string
    public description: string
    public type: string
    public badge: number
    public badgeId: string
    public reqTrophies: string
    public requiredTrophies: string
    public memberss: Array<any>

    public get members() {
        let mmbs = []
        for(let mmb in this.memberss) {
            mmbs.push(new ClubMember(mmb))
        }
        return mmbs
    }
}
