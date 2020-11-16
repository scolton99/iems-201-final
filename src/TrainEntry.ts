import { APIResponse } from './APIRequest';
import MySQL from "./MySQL";
import DB from "./DB";
import moment from 'moment-timezone';

export enum Destination {
    HOWARD= "HOWARD",
    NFTH="95TH"
}

export default class TrainEntry {
    public run_number: number;
    public destination: Destination;
    private db: DB;
    static readonly DB_PROVIDER = MySQL;

    constructor(run_number: number, direction: number) {
        this.run_number = run_number;
        this.destination = direction == 1 ? Destination.HOWARD : Destination.NFTH;
        this.db = new TrainEntry.DB_PROVIDER();
    }

    save_departed() {
        const run: number = this.run_number;
        const time = moment().tz("America/Chicago");
        const day: string = time.format('YYYY-MM-DD');
        const departure_ts: string = time.format('YYYY-MM-DD HH:mm:ss');

        console.log(`Noted train ${run} departed at ${departure_ts}.`);

        this.db.save_train_entry(run, this.destination, day, departure_ts);
    }

    static from(obj: APIResponse): Array<TrainEntry> {
        const res = [];
        for (const a of obj.ctatt.eta) {
            res.push(new TrainEntry(parseInt(a.rn), parseInt(a.trDr)));
        }
        return res;
    }
}