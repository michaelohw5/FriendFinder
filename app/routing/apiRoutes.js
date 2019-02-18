// Dependencies
// =============================================================
var Friend = require("../data/friends.js");

module.exports = function (app) {
    //get all friends
    app.get("/api/friends", function(req, res) {
        res.json(Friend);
    });

    //post into Friend
    app.post("/api/friends", function(req, res) {
        console.log(req.body);
        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 9000
          };

        var newFriend = req.body;
        var scores = newFriend.scores;

        for (var i = 0; i<Friend.length; i++) {
            var scoreDifference = 0;

            for (var j = 0; j<scores.length; j++) {
                scoreDifference += Math.abs(parseInt(scores[j])-parseInt(Friend[i].scores[j]));
            }

            if (scoreDifference <= bestMatch.friendDifference) {
                bestMatch.name = Friend[i].name;
                bestMatch.photo = Friend[i].photo
                bestMatch.friendDifference = scoreDifference;
            }
        }

        Friend.push(newFriend);
        res.json(bestMatch);
    });

}