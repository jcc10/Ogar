var http = require('http');
var url = require('url');

var Key = "";

var GameServer = {};

var query = {}

module.exports = function(gameServer, port, authKey) {
        // Do not start the server if the port is negative
        if (port < 1) {
            return;
        }
        
        GameServer = gameServer
        Key = authKey;
        
        // Start Server
        this.httpServer = http.createServer( parser.bind(this) );

        this.httpServer.listen(port, function() {
            // Tell OP that server is running
            console.log("[CNC] Loaded Command aNd Control on port " + port);
        }.bind(this));
    }
    
parser = function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var query = url.parse(req.url,true).query;
    if ("key" in query) {
        if (query["key"] == Key) {
            query["key"] = undefined;
            if ("action" in query) {
                var execute = actions[query["action"]];
                if (typeof execute != 'undefined') {
                    execute(GameServer, res, query);
                } else {
                    res.writeHead(422);
                    res.end(JSON.stringify({"Status":"Fail","ERROR":"Action Does not Exsist","Data":"","altered":0}));
                }
            } else {
                res.writeHead(406);
                res.end(JSON.stringify({"Status":"Fail","ERROR":"Missing Action","Data":"","altered":0}));
            }
        } else {
            res.writeHead(401);
            res.end(JSON.stringify({"Status":"Fail","ERROR":"Invalid Key","Data":"","altered":0}));
        }
    } else {
        res.writeHead(401);
        res.end(JSON.stringify({"Status":"Fail","ERROR":"Missing Key","Data":"","altered":0}));
    }
}
    
actions = {
    restart: function(gameServer, res, query) {
        res.writeHead(202);
        res.end(JSON.stringify( { "Status":"Processing" ,"ERROR":"" ,"Data":"Server is Restarting..." ,"altered":1} ));
        gameServer.socketServer.close();
        process.exit(2);
    },
    DBG_Find_User: function(gameServer, res, query) {
        if (!("user" in query)) {
            res.writeHead(406);
            res.end(JSON.stringify( { "Status":"Fail" ,"ERROR":"Missing User or ID" ,"Data":"" ,"altered":0 } ));
        } else {
            user = query["user"];
            IDs = find_user(gameServer, user, 3);
            res.writeHead(200);
            res.end(JSON.stringify( { "Status":"Success" ,"ERROR":"" ,"Data": { "User":user, "IDs":IDs } ,"altered":0 } ));
        }
    },
    store_mass: function(gameServer, res, query) {
        if (!("id" in query)) {
            res.writeHead(406);
            res.end(JSON.stringify( { "Status":"Fail" ,"ERROR":"Missing User or ID" ,"Data":"" ,"altered":0 } ));
        } else {
            ogarID = query["id"];
            mass = 0;
            clients = 0;
            for (var I in gameServer.clients) {
                if (gameServer.clients[I].playerTracker.ogarID == ogarID) {
                    var client = gameServer.clients[I].playerTracker;
                    for (var j in client.cells) {
                        mass += client.cells[j].mass - gameServer.config["playerStartMass"];
                        client.cells[j].mass = gameServer.config["playerStartMass"];
                    }
                    clients += 1;
                }
            }
            res.writeHead(200);
            res.end(JSON.stringify( { "Status":"Success" ,"ERROR":"" ,"Data":mass ,"altered":0 } ));
        }
    }
}

find_user = function(gameServer, search, mode) {
    allClients = gameServer.clients;
    
    if (mode = 1) {
        Clients = allClients.filter( function(obj, IDnum, array) {
            if ((obj.playerTracker.ogarID == search) && ( !(client.spectate)) && (client.cells.length > 0)) {
                return true;
            }
        } );
    } else if (mode == 3) {
        Clients = allClients.filter( function(obj, IDnum, array) {
            if (((obj.playerTracker.name == search) || (obj.playerTracker.ogarID == search)) && ( !(client.spectate)) && (client.cells.length > 0)) {
                return true;
            }
        } );
    }
    
    
    results = []
    Clients.forEach( function(obj, IDnum, array) {
        results.push({"PlayerID":obj.playerTracker.pID, "UserID":obj.playerTracker.ogarID})
    } );
    return results;
}