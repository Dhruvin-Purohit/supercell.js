import EventEmitter from "node:events";
import * as BSClient from '../brawlStars/Client'

/**
 * The base client for interacting with the supercell api's
 */
export default class Client extends EventEmitter {
    public constrcutor(BSClientOptions: ClientOptions/*, COCClientOptions: ClientOptions, CRClientOptions: ClientOptions*/) {
        //@ts-ignore tf is wrong here?
        super();
        //@ts-ignore
        this.BSClient = new BSClient(BSClientOptions)
    }
    public BSClient: any
}
