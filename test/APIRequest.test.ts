import 'mocha';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.test' });
import APIRequest  from "../src/APIRequest";

describe('APIRequest', function() {
  it('shouldn\'t fail', function() {
    return new APIRequest('/ttarrivals.aspx', { mapid: process.env.CTA_STATION }).execute();
  });
});