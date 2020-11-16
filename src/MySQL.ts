import DB from "./DB";
import mysql, {Connection} from 'mysql';
import {Destination} from "./TrainEntry";

export default class MySQL extends DB {
    static readonly HOST: string = process.env.MYSQL_HOST || "localhost";
    static readonly PORT: string = process.env.MYSQL_PORT || "3306";
    static readonly USERNAME: string | undefined = process.env.MYSQL_USERNAME;
    static readonly PASSWORD: string | undefined = process.env.MYSQL_PASSWORD;
    static readonly DATABASE: string = process.env.MYSQL_DATABASE;

    private static make_connection(): Connection {
        return mysql.createConnection({
            host: MySQL.HOST,
            user: MySQL.USERNAME,
            password: MySQL.PASSWORD,
            database: MySQL.DATABASE,
            port: parseInt(MySQL.PORT)
        });
    }

    public async save_train_entry(run: number, dest: Destination, day: string, departure_ts: string) {
        const conn = MySQL.make_connection();
        conn.connect();

        const query = (q: string): Promise<null> => {
            return new Promise<any>((resolve, reject) => {
                conn.query(q, (err) => {
                    if (err) return reject(err);

                    resolve();
                });
            });
        };

        const sql = 'INSERT INTO train_entries (run, dest, day, departure_ts) VALUES (?, ?, ? ,?)';
        const inserts = [run, dest.toString(), day, departure_ts];

        const query_string: string = mysql.format(sql, inserts);

        try {
            await query(query_string);
        } catch (e) {
            throw e;
        } finally {
            conn.end();
        }
    }
}