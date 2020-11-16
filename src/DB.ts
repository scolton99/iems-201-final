import { Destination } from './TrainEntry';

export default abstract class DB {
    // for API
    public constructor() { }

    public abstract save_train_entry(run: number, dest: Destination, day: string, departure_ts: string): void;
}