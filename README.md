# iems-201-final
Final project for IEMS 201.

Runs persistently in the background to collect information from the [CTA Train Tracker API](https://www.transitchicago.com/developers/traintracker/) for a certain station. 
At specified intervals, compares the API output to the previous API output to infer if trains have departed from the station between API calls. If so, records of departures
are pushed to a database.

Database implementation is currently MySQL but the interface allows for this to be expanded to other providers. See `src/DB.ts` for interface details.

# Environment
| Variable Name | Value |
| --- | --- |
| CTA_API_KEY | API key for the CTA Train Tracker API. Obtainable [here](https://www.transitchicago.com/developers/traintrackerapply/). |
| CTA_STATION | Station ID for the station to be monitored. From [this list](https://www.transitchicago.com/developers/ttdocs/#_Toc296199909). |
| API_ROOT | Should be `http://lapi.transitchicago.com/api/1.0` unless mocking. |

# MySQL-specific Environment
`MYSQL_USERNAME`, `MYSQL_PASSWORD`, `MYSQL_HOST`, `MYSQL_PORT`, and `MYSQL_DATABASE` should all be self-explanatory. All are optional except `MYSQL_DATABASE` and `MYSQL_USERNAME`.

# Setting Up
Clone the repository and run `npm install`. Set up your environment as per above. If you're using MySQL, you can use the included `db/setup.sql` file to set up your server
with a database and test database (`iems`, `iems_test`) and a user for each (`iems`, `iems-test`).

# Testing
Run `npm-test`. 
