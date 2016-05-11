/**
 * Created by vipulkanade on 3/21/16.
 */

var pg = require('pg');
var hostname, user, password, database = "staging", connectionString;

// format of connection string should be "postgres://username:password@hostname/database";

function fetchData(callback, query, host) {
    console.log("\n Query ::" + query.toString());

    if (host == "api") {
        hostname = "api-staging-read-research.cmonetq4qisb.us-west-2.rds.amazonaws.com";
        user = "api";
        password = "Oow8nu9Ain";
    } else if (host == "stage_manager") {
        hostname = "stagemanager-staging-read-research.cmonetq4qisb.us-west-2.rds.amazonaws.com";
        user = "stage_manager";
        password = "Oow8nu9Ain";
    } else if (host == "app_collection") {
        hostname = "appcollection-staging-read-research.cmonetq4qisb.us-west-2.rds.amazonaws.com";
        user = "appcollection";
        password = "Oow8nu9Ain";
    }

    // creating connection string
    connectionString = "postgres://" + user + ":" + password + "@" + hostname + "/" + database;

    var results = [];

    // Get a Postgres client from the connection pool
    // this initializes a connection pool
    // it will keep idle connections open for a (configurable) 30 seconds
    // and set a limit of 20 (also configurable)
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
            //call `done()` to release the client back to the pool
            done();

            console.log(err);
            //return res.status(500).json({ success: false, data: err});
            //callback(err, results);
        }

        // SQL Query
        var queryToDB = client.query(query);

        // Stream results back one row at a time
        queryToDB.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        queryToDB.on('end', function() {
            //call `done()` to release the client back to the pool
            done();

            //return res.json(results);
            callback(err, results);
        });
    });
}

exports.fetchData = fetchData;

