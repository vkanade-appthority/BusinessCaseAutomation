/**
 * Created by vipulkanade on 3/21/16.
 */
var host = "api";
var sqlQueryMaker =  require("./sqlManager");

function totalCountByPlatformAPI (req, res) {
    var getTotalCountByPlatformQuery =
        "SELECT CASE WHEN platform=10 THEN \'Android\'" +
        " WHEN platform=20 THEN \'iOS\'" +
        " ELSE \'Other\'" +
        " END Platform, count(*)" +
        " FROM application_organizations ao," +
        " applications a" +
        " WHERE organization_id = " + req.query.org_id +
        " AND a.id = ao.application_id" +
        " GROUP BY platform";

    console.log("Query Total Count By Platform :: " + getTotalCountByPlatformQuery.toString());

    sqlQueryMaker.fetchData(function (err, results) {
        if(err) {
            throw err;
        } else {
            if (results.length > 0) {
                console.log(results);
                res.json({
                    "results" : results,
                    "status" : true,
                    "error" : "none"
                });
            } else {
                console.log("No Details Found");
                res.json({
                    "results" : "No user deatils found",
                    "status" : true,
                    "error" : "none"
                });
            }
        }
    }, getTotalCountByPlatformQuery, host);
}

function totalMissingAppsAPI (req, res) {
    var getMissingAppsByPlatformQuery =
        "SELECT CASE" +
        " WHEN platform=\'10\' THEN \'Android\'" +
        " WHEN platform=\'20\' THEN \'iOS\'" +
        " ELSE platform" +
        " END Platform, count(*)" +
        " FROM missing_apps" +
        " WHERE organization_id = " + req.query.org_id +
        " GROUP BY platform"
    console.log("Query :: " + getMissingAppsByPlatformQuery.toString());

    sqlQueryMaker.fetchData(function (err, results) {
        if(err) {
            throw err;
        } else {
            if (results.length > 0) {
                console.log(results);
                res.json({
                    "results" : results,
                    "status" : true,
                    "error" : "none"
                });
            } else {
                console.log("No Details Found");
                res.json({
                    "results" : "No user deatils found",
                    "status" : true,
                    "error" : "none"
                });
            }
        }
    }, getMissingAppsByPlatformQuery, host);
}

function totalCountOfAppsForOrgAPI (req, res) {
    var getTotalCountAppsForOrgQuery =
        "SELECT count(*)" +
        " FROM application_organizations ao," +
        " applications a" +
        " WHERE ao.organization_id = " + req.query.org_id +
        " AND a.id = ao.application_id"
    console.log("Query :: " + getTotalCountAppsForOrgQuery.toString());

    sqlQueryMaker.fetchData(function (err, results) {
        if(err) {
            throw err;
        } else {
            if (results.length > 0) {
                console.log(results);
                res.json({
                    "results" : results,
                    "status" : true,
                    "error" : "none"
                });
            } else {
                console.log("No Details Found");
                res.json({
                    "results" : "No user deatils found",
                    "status" : true,
                    "error" : "none"
                });
            }
        }
    }, getTotalCountAppsForOrgQuery, host);
}

function totalCountByLastStageAPI (req, res) {
    var getTotalCountByLastStageQuery =
        "SELECT CASE WHEN last_stage=600 THEN \'successful analysis\'" +
        " WHEN last_stage=900 THEN \'failed analysis\'" +
        " WHEN last_stage=0   THEN \'analysis in progress\'" +
        " ELSE \'other\'" +
        " END, count(*)" +
        " FROM application_organizations ao, applications a" +
        " WHERE ao.organization_id = " + req.query.org_id +
        " AND a.id = ao.application_id" +
        " GROUP BY last_stage";

    console.log("Query :: " + getTotalCountByLastStageQuery.toString());

    sqlQueryMaker.fetchData(function (err, results) {
        if(err) {
            throw err;
        } else {
            if (results.length > 0) {
                console.log(results);
                res.json({
                    "results" : results,
                    "status" : true,
                    "error" : "none"
                });
            } else {
                console.log("No Details Found");
                res.json({
                    "results" : "No user deatils found",
                    "status" : true,
                    "error" : "none"
                });
            }
        }
    }, getTotalCountByLastStageQuery, host);
}

function totalMissingAppsForOrgAPI (req, res) {
    var getTotalMissingAppsForOrgQuery =
        "SELECT count(*)" +
        " FROM missing_apps " +
        " WHERE organization_id = " + req.query.org_id ;

    console.log("Query :: " + getTotalMissingAppsForOrgQuery.toString());

    sqlQueryMaker.fetchData(function (err, results) {
        if(err) {
            throw err;
        } else {
            if (results.length > 0) {
                console.log(results);
                res.json({
                    "results" : results,
                    "status" : true,
                    "error" : "none"
                });
            } else {
                console.log("No Details Found");
                res.json({
                    "results" : "No user deatils found",
                    "status" : true,
                    "error" : "none"
                });
            }
        }
    }, getTotalMissingAppsForOrgQuery, host);
}

function totalMissingAppsByStatusAPI (req, res) {
    var getTotalMissingAppsByStatusQuery =
        "SELECT status, count(*)" +
        " FROM missing_apps" +
        " WHERE organization_id = " + req.query.org_id +
        " GROUP BY status";

    console.log("Query :: " + getTotalMissingAppsByStatusQuery.toString());

    sqlQueryMaker.fetchData(function (err, results) {
        if(err) {
            throw err;
        } else {
            if (results.length > 0) {
                console.log(results);
                res.json({
                    "results" : results,
                    "status" : true,
                    "error" : "none"
                });
            } else {
                console.log("No Details Found");
                res.json({
                    "results" : "No user deatils found",
                    "status" : true,
                    "error" : "none"
                });
            }
        }
    }, getTotalMissingAppsByStatusQuery, host);
}

function totalAppsWithLastStageAPI (req, res) {

    var getTotalAppsWithLastStageQuery =
        "SELECT a.id, a.application_name, a.application_version," +
            " a.dead, a.stale, a.platform, a.status, a.report_score," +
            " a.last_stage" +
        " FROM application_organizations ao," +
            " applications a" +
        " WHERE organization_id = " + req.query.org_id +
        " AND a.id = ao.application_id" +
        " AND a.last_stage = " + req.query.last_stage;

    console.log("Query :: " + getTotalAppsWithLastStageQuery.toString());

    sqlQueryMaker.fetchData(function (err, results) {
        if(err) {
            throw err;
        } else {
            if (results.length > 0) {
                console.log(results);
                res.json({
                    "results" : results,
                    "status" : true,
                    "error" : "none"
                });
            } else {
                console.log("No Details Found");
                res.json({
                    "results" : "No user deatils found",
                    "status" : true,
                    "error" : "none"
                });
            }
        }
    }, getTotalAppsWithLastStageQuery, host);
}

function detailsOfApplicationAPI (req, res) {
    var getDetailsOfApplicationQuery =
        "SELECT a.id, a.application_name, a.application_version," +
        " a.dead, a.stale, a.platform, a.status" +
        " FROM application_organizations ao," +
        " applications a" +
        " WHERE organization_id = " + req.query.org_id +
        " AND a.id = ao.application_id" +
        " AND a.application_name = \'" + req.query.app_name + "\'";

    console.log("Query :: " + getDetailsOfApplicationQuery.toString());

    sqlQueryMaker.fetchData(function (err, results) {
        if(err) {
            throw err;
        } else {
            if (results.length > 0) {
                console.log(results);
                res.json({
                    "results" : results,
                    "status" : true,
                    "error" : "none"
                });
            } else {
                console.log("No Details Found");
                res.json({
                    "results" : "No user deatils found",
                    "status" : true,
                    "error" : "none"
                });
            }
        }
    }, getDetailsOfApplicationQuery, host);
}

function appsWithNoReportScoreAPI (req, res) {
    var getAppsWithNoReportScoreQuery =
        "SELECT a.id, a.application_name, a.application_version," +
        " a.dead, a.stale, a.platform, a.status, a.report_score," +
            " a.last_stage" +
        " FROM application_organizations ao," +
        " applications a" +
        " WHERE organization_id = " + req.query.org_id +
        " AND a.id = ao.application_id" +
        " AND report_score IS NULL";

    console.log("Query :: " + getAppsWithNoReportScoreQuery.toString());

    sqlQueryMaker.fetchData(function (err, results) {
        if(err) {
            throw err;
        } else {
            if (results.length > 0) {
                console.log(results);
                res.json({
                    "results" : results,
                    "status" : true,
                    "error" : "none"
                });
            } else {
                console.log("No Details Found");
                res.json({
                    "results" : "No user deatils found",
                    "status" : true,
                    "error" : "none"
                });
            }
        }
    }, getAppsWithNoReportScoreQuery, host);
}

exports.totalCountByPlatform = totalCountByPlatformAPI;
exports.missingApps = totalMissingAppsAPI;
exports.countOfAppsForOrg = totalCountOfAppsForOrgAPI;
exports.totalCountByLastStage = totalCountByLastStageAPI;
exports.totalMissingAppsForOrg = totalMissingAppsForOrgAPI;
exports.totalMissingAppsByStatus = totalMissingAppsByStatusAPI;
exports.totalAppsWithLastStage = totalAppsWithLastStageAPI;
exports.appDetails = detailsOfApplicationAPI;
exports.appsWithNoReportScore = appsWithNoReportScoreAPI;