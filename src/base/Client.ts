import { EventEmitter } from "events";
import BSClient from '../brawlStars/Client'

/**
 * The base client for interacting with the supercell api's
 */
export default class Client extends EventEmitter {
    public constructor(BSClientOptions: ClientOptions/*, COCClientOptions: ClientOptions, CRClientOptions: ClientOptions*/) {
        super();
        this.BSClient = new BSClient(BSClientOptions)
    }
    public BSClient: BSClient
}

export default interface Client extends EventEmitter {
    BSClient: BSClient
}