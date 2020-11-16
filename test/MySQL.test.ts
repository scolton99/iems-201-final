import 'mocha';
import moment from 'moment';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.test' });
import MySQL from "../src/MySQL";
import { Destination } from "../src/TrainEntry";
import sql, { Connection } from "mysql";

describe('MySQL', function () {
  after(function(done) {
    const conn: Connection = sql.createConnection({
      user: process.env.MYSQL_USERNAME,
      database: process.env.MYSQL_DATABASE
    });

    conn.query('TRUNCATE train_entries;', (err) => {
      if (err) console.error(err);

      conn.end(done);
    });
  });

  it('should be able to save an entry for Howard', function() {
    const db = new MySQL();
    return db.save_train_entry(888, Destination.HOWARD, '2020-11-16', '2020-11-16 02:24:23')
  });

  it('should be able to save an entry for 95th', function() {
    const db = new MySQL();
    return db.save_train_entry(888, Destination.NFTH, '2020-11-16', '2020-11-16 02:24:23')
  });

  it('should be able to save an entry using moment', function() {
    const db = new MySQL();

    const time = moment.tz('America/Chicago');
    const day = time.format('YYYY-MM-DD');
    const ts = time.format('YYYY-MM-DD HH:mm:ss');

    return db.save_train_entry(888, Destination.NFTH, day, ts);
  });
});