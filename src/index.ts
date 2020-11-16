import dotenv from 'dotenv';
dotenv.config();
import TrainEntry from "./TrainEntry";
import APIRequest, {APIResponse} from "./APIRequest";

class CTATracker {
    static readonly INTERVAL: number = 30 * 1000;
    static readonly CTA_STATION: string = process.env.CTA_STATION;
    known_trains: Array<TrainEntry> = [];

    async run(): Promise<any> {
        setInterval(this.tick.bind(this), CTATracker.INTERVAL);
        this.tick().then();
    }

    async tick(): Promise<any> {
        const res: APIResponse = await new APIRequest('/ttarrivals.aspx', { mapid: CTATracker.CTA_STATION }).execute();
        const new_trains = TrainEntry.from(res);

        console.log(`API notes trains ${new_trains.map(it=>it.run_number.toString()).join(", ")}`);

        const departed_trains: Array<TrainEntry> = this.find_departed_trains(new_trains, this.known_trains);
        departed_trains.forEach(train => train.save_departed());

        this.known_trains = new_trains;
    }

    find_departed_trains(obs_list: Array<TrainEntry>, ext_list: Array<TrainEntry>) {
        const obs_numbers: Array<number> = obs_list.map(it => it.run_number);
        return ext_list.filter(it => obs_numbers.indexOf(it.run_number) === -1);
    }
}

new CTATracker().run().then();

