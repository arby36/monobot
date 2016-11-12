``
/*
  __  __                           ____            _   
 |  \/  |   ___    _ __     ___   | __ )    ___   | |_ 
 | |\/| |  / _ \  | '_ \   / _ \  |  _ \   / _ \  | __|
 | |  | | | (_) | | | | | | (_) | | |_) | | (_) | | |_ 
 |_|  |_|  \___/  |_| |_|  \___/  |____/   \___/   \__|
2Goo Development, 2016
Version 0.0.6 (Dev)
*/
var Discord = require("discord.js");
var bot = new Discord.Client();
require("events");
require('timers')
var noTalking = false;
var pingTime;
var afk = [];
var votename;
///File System
var fs = require("fs");
///DuckDuckGo
var ddg = require('ddg');
///Weather Underground
var Wunderground = require('wundergroundnode');
var myKey = '5b5618a68b051e33';
var wunderground = new Wunderground(myKey);
//New York Times
var NYT = require('nyt');
var keys = {
    'article-search': 'bba42cb897b84e4588479cfd8e6f4aea'
};
var nyt = new NYT(keys);
//Spotify
var SpotifyWebApi = require('spotify-web-api-node');
var spotifyApi = new SpotifyWebApi({
    clientId: '5232d8f15cb948fbb7a92258708174ba',
    clientSecret: '64d2b3f052364044a60fc6d8ad780b84',
    redirectUri: 'http://2goo.cf/'
});
//Stack Exchange
var stackexchange = require('stackexchange');
var options = { version: 2.2 };
var context = new stackexchange(options);
//HTTP Request
var request = require('request');
var j = request.jar();
var request = request.defaults({ jar: j })
//Voting stuff v
var voteon = false;
var votesy = 0;
var votesn = 0;
var inarow2 = 0;
//This is to store game history v
var his = [];
var aow = 0;
var aol = 0;
var total = 0;
//This is used to store wikipedia challenge stuff
var reg = [];
/*
Code used to attempt readline
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);
New readline code vvv
*/
function mess(message, input) {
    bot.sendMessage(message, input)
}
//Helper Function
function getRandUser(message) {
    var users = message.server.members;
    var randomNumber = Math.floor(Math.random() * users.length)
    return users[randomNumber].username;
}

var readline = require('readline'),
rl = readline.createInterface(process.stdin, process.stdout);
//Bot Code vvv
bot.on('ready', () => { bot.setPlayingGame(/*"with fire."*/"monobot.ml") });
bot.on("message", function(message)
{
    //Proccess Message Content
    var input = message.content.toUpperCase();
    //No talking code
    if (noTalking == true) {
        bot.deleteMessage(message);
    }
    //If message is ent in DM, logs to console
    if (message.server == null) {
        console.log("User: " + message.author.username + ", sent: " + input);
    }
    //Send a fun message if the Bot is mentioned
    if (message.isMentioned("204989422133968897")) {
        bot.sendMessage(message, "I'm always watching you, always watching...")
        console.log("User: " + message.author.username + " mentioned MonoBot in channel: " + message.channel.name);
    }
    //Logs to console if a message is sent that mentions everyone
    if (message.everyoneMentioned == true) {
        console.log("User: " + message.author.username + " mentioned @everyone, in channel: " + message.channel.name + " with the message: " + message.content);
        bot.sendMessage(message.server.owner, "User: " + message.author.username + " mentioned @everyone, in channel: " + message.channel.name + " with the message: " + message.content);
    }
    //AFK Responder 
    if (message.mentions[0] != undefined) {
        if (afk.indexOf(message.mentions[0].id) != -1) {
            bot.sendMessage(message, message.mentions[0].username + " is AFK right now, I'll send a PM.");
            bot.sendMessage(message.mentions[0].id, message.author.username + " Mentioned you, check your mentions!");
        }
    }
    
    /*
    if (input.startsWith("&EVAL") & message.server == null) {
        code_raw = input.split(" ");
        pass = code_raw[1];
        bot.sendMessage(message, "Password: " + pass);
        if (pass === "ONTASKSPICY1234") {
            code_raw2 = message.content.split(" ");
            code_raw2.shift();
            code_raw2.shift();
            code = code_raw2.join(" ");
            try {
                eval(code);
            }
            catch(err) {
                bot.sendMessage(message, "The code was attempted, but threw an error: " + err);
            }
            console.log("User: " + message.author.username + " ran the code: " + code);
            bot.sendMessage(message, "Running code: " + code);
        }
        else {
            bot.sendMessage(message, "Your password was incorrect.");
        }
    }
    Deprecated due to security risks...
    */
    //Info about the Bot
	if(input ===  "&INFO")
	{
		bot.reply(message, "Hello, I am MonoBot! I am currently in alpha. I am an experimental Discord Bot created by developers Nic and Alex, for use in Monotone!");
		console.log("Info Command Issued.")
	}
    //A Ping Command
	if(input ===  "&PING")
	bot.sendMessage(message.channel, ":ping_pong:", function (err, message) {
	    if(!err){
	        bot.sendMessage(message, "Pong,");
	        pingTime = message.timestamp;
	    }
		console.log("Ping Command Issued.")
	});
	if (input.startsWith("PONG,")) {
	    bot.updateMessage(message, "Pong, *" + (message.timestamp - pingTime) + "ms*.")
	}
    //Uptime Command
	if (input === "&UPTIME") {
	    uptime = bot.uptime / 1000;
	    bot.sendMessage(message, "I have been alive for " + uptime + " seconds!");
	}
	if (input === "&WRONG") {
	    setInterval(function () {
	        var textChannels = message.server.channels;
	        var randomNumber = Math.floor(Math.random() * textChannels.length)
	        bot.sendMessage(textChannels[randomNumber], "Wrong.");
	        
	    }, 5000);
	}
    //Gets and Displays Server Bans
	if (input === "&GETBANS") {
	    bot.getBans(message.server.id, function (error, users) {
	        if (users[0] == null) {
	            bot.sendMessage(message, "There are no bans for this server.");
	        }
	        else {
	            bans = users.join(", ");
	            bot.sendMessage(message, "Bans for server: " + message.server.name + ", " + bans);
	        }
	    });
	}
    //Help Command
	if(input ===  "&HELP")
	{
	    bot.sendMessage(message, "**__MonoBot Command List__**\n\n*Don't include the example brackets when using commands!*\n\n**`&NewVote <Vote Name>`** - *Starts a new vote.*\n**`&Vote <+ or ->`** - *Votes on current poll.*\n**`&EndVote`** - *Ends the current poll.*\n**`&Info`** - *A little bit of info about SidBot.*\n**`&WhoIsTheCoolest`** - *Sid Fun.*\n**`&Live`** - *Sid Fun.*\n**`&WhoAreYou`** - *Sid Fun.*\n**`&Ping`** - *Pong! Test bot latency.*\n**`&Report <@Username> <Reason>`** - *Report a user.*\n**`&KillTask`** - *Kill Bot Task.*\n**`;0;`** - *Simple game!*\n**`&Spam <@Username> <Message>`** - *Spam a message to a user through DM.*\n**`&Kick <@Username>`** - *Kick a member.*\n**`&Ban <@Username>`** - *Ban a member.*\n**`&GameHistory`** - *Stats for ;0;*\n**`&Search <Result index 0-3, both inclusive> <Search Query>`** - *Searches DuckDuckGo Search Engine* \n More Commands and Documentation at: https://github.com/arby36/monobotdiscordbot/wiki");
		console.log("Help Command Issued.")
	}
    //Mono Fun xD
	if(input ===  "&WHOISTHECOOLEST")
	{
		bot.sendMessage(message, "__**Sid is always the coolest.**__");
		console.log("Fun(WhoIsTheCoolest) Command Issued.")
	}
    //A joke kill task command from SidBot
	if(input ===  "&KILLTASK")
    {
        if(bot.memberHasRole(message.author, message.channel.server.roles.get('name', 'jsAdmin'))){
            bot.reply(message, "Stop, Nic.");
        }
        else {
            bot.reply(message, " you do not have access to this command.")
        }
	}
    //No talking Command
	if (input === "&NOTALKING") {
	    if (bot.memberHasRole(message.author, message.channel.server.roles.get('name', 'jsAdmin'))) {
	        bot.sendMessage(message, "No talking, anywhere, from now on.");
	        noTalking = true;
	    }
	    else {
	        bot.sendMessage(message, "You do not have permission to use this command");
	    }
	}
    /*
	if (input === "&KICKBOT" & bot.memberHasRole(message.author, message.channel.server.roles.get('name', 'jsAdmin'))) {
	    bot.sendMessage(message, "Bye, " + message.server.name + ", I'll be back soon!");
	    bot.leaveServer(message.server.id);
	    console.log("Monobot was kicked out of server: " + message.server.name + ", by user: " + message.author.username);
	}
    */
    //DDG Search Engine
	if (input.startsWith("&SEARCH")) {
	    query_raw = message.content.split(" ");
	    query_raw.shift();
	    index = query_raw.shift();
	    query = query_raw.join(" ");
	    ddg.query(query, function (err, data) {
	        try {
	            if (query == "" | query == " " | query == null) {
	                bot.sendMessage(message, "Please enter a query.");
	            }
	            else {
	                if (index > 3 | isNaN(index) == true) {
	                    bot.sendMessage(message, "The search index is invalid.");
	                }
	                else {
	                    results = data.RelatedTopics;
	                    if (results[index] == undefined) {
	                        bot.sendMessage(message, "No results found for: " + query);
	                    }
	                    else {
	                        bot.sendMessage(message, "Search Results For: " + query + " -- " + results[index].Text + " -- Results Courtesy of DuckDuckGo");
	                        console.log("User: " + message.author.username + " Searched: " + query);
	                    }
	                }
	            } 
	        }
	        catch (err) {
	            bot.sendMessage(message, "An error occured: " + err);
	        }
	    });
	}
    //Weather Commands
	if (input.startsWith("&WEATHER")) {
	    w_raw = message.content.split(" ");
	    w_raw.shift();
	    type = w_raw.shift();
	    zip = w_raw.join(" ");
	    try {
            //Tempature F
	        if (type === "temp_f") {
	            wunderground.conditions().request(zip, function (err, response) {
	                bot.sendMessage(message, "The tempature for: " + zip + ", " + response.current_observation.temp_f + " F");
	            });
	        }
            //Tempature C
	        if (type === "temp_c") {
	            wunderground.conditions().request(zip, function (err, response) {
	                bot.sendMessage(message, "The tempature for: " + zip + ", " + response.current_observation.temp_c + " C");
	            });
	        }
            //2 Day Forecast No TTS
	        if (type === "forecastText") {
	            wunderground.forecast().request(zip, function (err, response) {
	                bot.sendMessage(message, "__**The 2-day forecast for: " + zip + ",**__ \n **Day 1** \n *" + response.forecast.txt_forecast.forecastday[0].title + "*\n" + response.forecast.txt_forecast.forecastday[0].fcttext + "\n" + "**Day 1 - Night** \n *" + response.forecast.txt_forecast.forecastday[1].title + "*\n" + response.forecast.txt_forecast.forecastday[1].fcttext + "\n" + "**Day 2** \n *" + response.forecast.txt_forecast.forecastday[2].title + "*\n" + response.forecast.txt_forecast.forecastday[2].fcttext + "\n \n Weather Courtesy of Weather Underground \n In partnership with the Weather Channel.");
	            });
	        }
	        //2 Day Forecast With TTS
	        if (type === "forecastReport") {
	            wunderground.forecast().request(zip, function (err, response) {
	                bot.sendTTSMessage(message, "__**The 2-day forecast for: " + zip + ",**__ \n **Day 1** \n *" + response.forecast.txt_forecast.forecastday[0].title + "*\n" + response.forecast.txt_forecast.forecastday[0].fcttext + "\n" + "**Day 1 - Night** \n *" + response.forecast.txt_forecast.forecastday[1].title + "*\n" + response.forecast.txt_forecast.forecastday[1].fcttext + "\n" + "**Day 3** \n *" + response.forecast.txt_forecast.forecastday[2].title + "*\n" + response.forecast.txt_forecast.forecastday[2].fcttext + "\n \n Weather Courtesy of Weather Underground \n In partnership with the Weather Channel.");
	            });
	        }
            //Airport Code For Nearest Station
	        if (type === "station") {
	            wunderground.almanac().request(zip, function (err, response) {
	                bot.sendMessage(message, "Airport Code For Local Station: " + response.almanac.airport_code);
	            });
	        }
            //Forecast Icons
	        if (type === "forecastImages") {
	            wunderground.forecast().request(zip, function (err, response) {
	                bot.sendMessage(message, "The 2-day forecast for: " + zip + ", \n  \n" + response.forecast.txt_forecast.forecastday[0].icon_url + "\n" + response.forecast.txt_forecast.forecastday[1].icon_url + "\n" + response.forecast.txt_forecast.forecastday[2].icon_url + "\n \n Weather Courtesy of Weather Underground \n In partnership with the Weather Channel.");
	            });
	        }
	    }
	    catch (err) { 
	        bot.sendMessage(message, "An error occured, try again later.");
	    }
	}
    //Weather in EGR
	if (input === "TALK ABOUT THE WEATHER" | input.startsWith("WHAT'S THE WEATHER LIKE")) {
	    wunderground.forecast().request('49506', function (err, response) {
	        bot.sendMessage(message, "__**The 2-day forecast for: East Grand Rapids, MI,**__ \n **Day 1** \n *" + response.forecast.txt_forecast.forecastday[0].title + "*\n" + response.forecast.txt_forecast.forecastday[0].fcttext + "\n" + "**Day 1 - Night** \n *" + response.forecast.txt_forecast.forecastday[1].title + "*\n" + response.forecast.txt_forecast.forecastday[1].fcttext + "\n" + "**Day 2** \n *" + response.forecast.txt_forecast.forecastday[2].title + "*\n" + response.forecast.txt_forecast.forecastday[2].fcttext + "\n \n Weather Courtesy of Weather Underground \n In partnership with the Weather Channel.");
	    });
	}
    //Alerts Command (Buggy)
	function disAlerts(item, index) {
	    bot.sendMessage("__**Alert: " + index + "**__\n __" + item.type + "__\n" + item.description + "\n" + item.message);
	}
	if (input.startsWith("&ALERTS")) {
	    url_raw = message.content.split(" ");
	    url_raw.shift();
	    state = url_raw.pop().toUpperCase();
	    city = url_raw.join("_");
        q = state + "/" + city
        wunderground.alerts().request(q, function(err, response) {
            if (response.response.features.alerts != 0 || response.alerts[0] == undefined) {
                data = response.alerts[0];
                try {
                    bot.sendMessage(message, "__**Top Alert for: " + city + ", " + state + "**__\n Type:`" + data.type + "`, " + data.description + "\n Message: `" + data.message + "` \n \n Weather Courtesy of Weather Underground \n In partnership with the Weather Channel.");
                }
                catch(error) {
                    bot.sendMessage(message, "An error occured, check your search.");
                }
            }
            else {
                bot.sendMessage(message, "No alerts at this time.");
            }
        });
	}
    //NYT News
	if (input.startsWith("&NEWS")) {
	    //Query Type
	    newsq_raw = input.split(" ");
	    newsq_raw.shift();
	    NType = newsq_raw.shift();
	    //Query
	    newsq_raw2 = message.content.split(" ");
	    newsq_raw2.shift();
	    newsq_raw2.shift();
	    newsq = newsq_raw2.join(" ");
        //Handling
	    if (NType === "HEADLINE") {
	        nyt.article.search({ 'q': newsq }, function (response) {
	            data = JSON.parse(response);
	            bot.sendMessage(message, "__**Latest Headline containing your search: **__\n" + data.response.docs[0].headline.main + "\n Link: " + data.response.docs[0].web_url + "\n \n Date: " + data.response.docs[0].pub_date + "\n News Courtesy of the New York Times");
	        });
	    }
	}
    //MonoBot API (Not Much)
	if (input === "&GETAPI") {
	    function getAPI(item, index) {
	        bot.sendMessage(message, "Title: `" + item.title + "` \n Message: **" + item.message + "** \n Date: " + item.meta.date);
	    }
	    request('http://www.alexwith2goo.x10.mx/json1.json', function (error, response, body) {
	        if (!error && response.statusCode == 200) {
	            data = JSON.parse(body);
	            data.response.items.forEach(getAPI);
	        }
	    })
	}
    //You can figure these ones out...
	if (input.startsWith("&FO")) {
	    var fo_raw = message.content.split(" ");
	    fo_raw.shift();
	    var fo = fo_raw.join(" ");
	    var foRequest = "http://www.foaas.com/off/" + fo + "/" + message.author.username;
	    var foOpts = {
	        url: foRequest,
	        headers: {
	            'Accept': 'text/plain'
	        }
	    };
	    function callback(error, response, body) {
	        if (!error && response.statusCode == 200) {
	            bot.sendMessage(message, body);
	        }
	    }
	    request(foOpts, callback);
	}
	if (input.startsWith("&PMFO")) {
	    var foTo = message.mentions[0];
	    if (foTo == null) {
	        bot.sendMessage(message, "Input a valid user mention.");
	    }
	    else {
	        var foRequestPM = "http://www.foaas.com/off/" + foTo.username + "/" + message.author.username;
	        var foOptsPM = {
	            url: foRequestPM,
	            headers: {
	                'Accept': 'text/plain'
	            }
	        };
	        function callback(error, response, body) {
	            if (!error && response.statusCode == 200) {
	                bot.sendMessage(foTo, body);
	                bot.sendMessage(message, "Sent!");
	            }
	            else {
	                bot.sendMessage(message, "Sorry, just tell them yourself...");
	            }
	        }
	        request(foOptsPM, callback);
	    }
	    
	}
	if (input.startsWith("&THANKS")) {
	    var foToTh = message.mentions[0];
	    if (foToTh == null) {
	        bot.sendMessage(message, "Input a valid user mention.");
	    }
	    else {
	        var foRequestPMTh = "http://www.foaas.com/thanks/" + message.author.username;
	        var foOptsPMTh = {
	            url: foRequestPMTh,
	            headers: {
	                'Accept': 'text/plain'
	            }
	        };
	        function callback(error, response, body) {
	            if (!error && response.statusCode == 200) {
	                bot.sendMessage(foToTh, body);
	                bot.sendMessage(message, "Sent!");
	            }
	            else {
	                bot.sendMessage(message, "Sorry, just tell them yourself...");
	            }
	        }
	        request(foOptsPMTh, callback);
	    }

	}
	if (input.startsWith("&XMAS")) {
        //Date Initialization
	    var today = new Date();
	    var xmas = new Date(today.getFullYear(), 11, 25);
	    if (xmas.getTime() == today.getTime()) {
	        //User Info
	        var sender = message.author.username;
	        var to = message.mentions[0];
	        //Requesting
	        var xmasURL = "http://www.foaas.com/" + to.username + "/" + sender;
	        var xmasOpts = {
	            url: xmasURL,
	            headers: {
	                'Accept': 'text/plain'
	            }
	        };
	        function callback(error, response, body) {
	            if (!error && response.statusCode == 200) {
	                bot.sendMessage(to, body);
	                bot.sendMessage(message, "Sent!");
	            }
	            else {
	                bot.sendMessage(message, "Sorry, just tell them yourself...");
	                console.log("The xmas threw some meta data: " + response.statusCode + " " + error);
	            }
	        }
	        request(xmasOpts, callback);
	    }
	    else {
	        function days_between(date1, date2) {
	            var ONE_DAY = 1000 * 60 * 60 * 24
	            var date1_ms = date1.getTime()
	            var date2_ms = date2.getTime()
	            var difference_ms = Math.abs(date1_ms - date2_ms)
	            return Math.round(difference_ms / ONE_DAY)
	        }
	        var diff = days_between(today, xmas);
	        bot.sendMessage(message, "Ya still got " + diff + " days!");
	        bot.sendMessage(message, "&FO " + message.author.toString());
	    }
	}
    //Meme Generator
	if (input.startsWith("&MEME")) {
	    bot.sendMessage(message, "Much APIs, So many memes, Much coming soon!");
	}
    //Spotify
	if (input.startsWith("&SPOTIFY")) {
	    type_raw = input.split(" ");
	    type_raw.shift();
	    type = type_raw[0];
	    //Query
	    track_raw = message.content.split(" ");
	    track_raw.shift();
	    track_raw.shift();
	    track = track_raw.join(" ");

	    if (type === "SEARCH/FILTER=NONE" | type === "SEARCH") {
	        function displayTrack(item, index) {
	            bot.sendMessage(message, "__**Track For:**__\n `" + track + "`\n \n Main Artist:\n *" + item.artists[0].name + "*\n Track:\n **" + item.name + "**\n Link:\n" + item.external_urls.spotify + "\n Search Courtesy of Spotify");
	        }
	        trackParam = "track:" + track;
	        spotifyApi.searchTracks(trackParam)
                .then(function (data) {
                    var response = data.body;
                    response.tracks.items.forEach(displayTrack);
                    //bot.sendMessage(message, "__**Most Relevant Track For:**__\n `" + track + "`\n \n Main Artist:\n *" + response.tracks.items[0].artists[0].name + "*\n Track:\n **" + response.tracks.items[0].name + "**\n Link:\n" + response.tracks.items[0].external_urls.spotify + "\n Search Courtesy of Spotify");
                }, function (err) {
                    bot.sendMessage(message, "An error occured, try checking your search.");
                });
	    }
	    if (type === "SEARCH/FILTER=ARTIST") {
	        artist_raw = track.split(" ");
	        artist = artist_raw[0] + " " + artist_raw[1];
	        newTrack = track.split(" ");
	        newTrack.shift();
	        newTrack.shift();
	        tripleTrack = newTrack.join(" ");
	        artistParam = "artist:" + artist;
	        trackParam = "track:" + tripleTrack;
	        param = trackParam + " " + artistParam;
	        spotifyApi.searchTracks(param)
                  .then(function (data) {
                      var response = data.body;
                      bot.sendMessage(message, "__**Most Relevant Track For:**__\n `" + tripleTrack + "`\n \n Main Artist:\n *" + response.tracks.items[0].artists[0].name + "*\n Track:\n **" + response.tracks.items[0].name + "**\n Link:\n" + response.tracks.items[0].href + "\n Search Courtesy of Spotify");
                      console.log(response);
                  }, function (err) {
                      bot.sendMessage(message, "An error occured, try checking your search.");
                  });
	    }
	}
    //StackOverflow Tag Search
	if (input.startsWith("&STACKTAGS")) {
	    tags = message.content.split(" ");
	    tags.shift();
	    var filter = {
	        key: 'qyViv7m5qZKdV49u9)L4Kw((',
	        pagesize: 1,
	        tagged: tags,
	        sort: 'activity',
	        order: 'desc',
            site: "stackoverflow"
	    };
	    context.questions.questions(filter, function (err, results) {
	        try {
	            if (results.items[0] == undefined) {
	                bot.sendMessage(message, "No results found for your query.");
	            }
	            if (err) {
	                bot.sendMessage(message, "A search error occured, try checking your search.");
	            }
	            else {
	                bot.sendMessage(message, "__**Most Recent StackOverflow question with tags:**__ \n `" + tags.join(" ") + "`\n Question: **" + results.items[0].title + "** \n \n Link:" + results.items[0].link);
	            }
	        }
	        catch (error) {
	            bot.sendMessage(message, "An error occured, try checking your search.");
	        }
	        
	    });
	}
    //StackOverflow Question Search
	if (input.startsWith("&STACKQUESTION")) {
	    title_raw = message.content.split(" ");
	    title_raw.shift();
	    title = title_raw.join(" ");
	    var filter = {
	        key: 'qyViv7m5qZKdV49u9)L4Kw((',
	        pagesize: 1,
            intitle: title,
	        sort: 'activity',
	        order: 'desc',
	        site: "stackoverflow"
	    };
	    context.search.search(filter, function (err, results) {
	        try {
	            if (results.items[0] == undefined) {
	                bot.sendMessage(message, "No results found for your query.");
	            }
	            if (err) {
	                bot.sendMessage(message, "A search error occured, try checking your search.");
	            }
	            else {
	                bot.sendMessage(message, "__**Most Recent StackOverflow question with title like:**__ \n `" + title + "`\n Question: **" + results.items[0].title + "** \n \n Link: " + results.items[0].link);
	            }
	        }
	        catch (error) {
	            bot.sendMessage(message, "An error occured, try checking your search.");
	            console.log(error);
	        }

	    });
	}
    //StackAviation Question Search (Buggy)
	if (input.startsWith("&STACKAVIATION")) {
	    title_raw1 = message.content.split(" ");
	    title_raw1.shift();
	    title1 = title_raw1.join(" ");
	    var filter1 = {
	        key: 'qyViv7m5qZKdV49u9)L4Kw((',
	        pagesize: 1,
	        intitle: title1,
	        sort: 'activity',
	        order: 'desc',
	        site: "aviation"
	    };
	    context.search.search(filter1, function (err, results) {
	        try {
	            if (results.items[0] == undefined) {
	                bot.sendMessage(message, "No results found for your query.");
	            }
	            if (err) {
	                bot.sendMessage(message, "A search error occured, try checking your search.");
	            }
	            else {
	                bot.sendMessage(message, "__**Most Recent Stack Aviation question with title like:**__ \n `" + title1 + "`\n Question: **" + results.items[0].title + "** \n \n Link:" + results.items[0].link);
	            }
	        }
	        catch (error) {
	            bot.sendMessage(message, "An error occured, try checking your search.");
	            console.log(error);
	        }

	    });
	}
    //8 Ball 
	if (input.startsWith("&8BALL")) {
	    var ball_raw = message.content.split(" ");
	    ball_raw.shift();
	    var ball = ball_raw.join(" ");
	    request('https://api.rtainc.co/twitch/8ball?format=[0]', function (error, response, body) {
	        if (!error && response.statusCode == 200) {
	            bot.sendMessage(message, "The 8 Ball's answer to: " + ball + "\n :8ball: *" + body + "* :8ball:");
	        }
	    });
	}
	//Game Code vvv
	if(input ===  ";0;")
	{
	    //important message about in a row functionality:
        //The bot does not know the difference between users, so if you can fix that, please do...
	        inarow = message.author; 
            var dice1 = Math.floor((Math.random() * 3));
            var dice2 = Math.floor((Math.random() * 3));
            var rand = Math.floor((Math.random() * (128044 - 128000)));
            var str = String.fromCodePoint(128000+rand);
            var toSend = [];
            if(dice1 == dice2)
            {
                inarow2++;
                toSend.push("**You won!** *Your Prize:* [" + str + "], You Have: " + inarow2 + " In a Row!");
                console.log("Game Command Issued by: " + message.author.username + ", who won");
                if (his.length >= 10) {
                    his = [];
                }
                else {
                    his.push(str);
                }
                
                aow++;
            }
            else{
                toSend.push("You lost.");
                console.log("Game Command Issued by: " + message.author.username + ", who lost");
                inarow2 = 0;
                aol++;

            }
            bot.sendMessage(message.channel, toSend);
	}
	if (input === "&GAMEHISTORY") {
	    total = aow + aol;
	    winp = aow / total * 100;
	    console.log("Game History Command Issued");
	    bot.sendMessage(message, "Last 10 Prizes Won (Everyone on server): " + his.toString() + "\nTotal Number of Wins (Everyone on server): " + aow.toString() + "\nTotal Number of Losses (Everyone on server): " + aol.toString() + "\nWin Percentage: " + winp + "%");
	    /*
        This is old code that overloaded the bot, so yeah...
        bot.sendMessage(message, "Total Number of Wins (Everyone on server): " + aow.toString());
	    bot.sendMessage(message, "Total Number of Losses (Everyone on server): " + aol.toString());
	    bot.sendMessage(message, "Win Percentage: " + winp.toString() + " %");
        */

	}
    /*
	if (input.startsWith("&AUTOPLAY")) {
	    i = 0;
	    while (i < 5) {
	        bot.sendMessage(message, ";0;");
	        i++;
	    }
	}
    */
    //End Game Code ^^^
    //MonoBot Fun
	if(input ===  "&LIVE")
	{
	    bot.sendMessage(message, "__***Live the #MonoLife.***__");
		console.log("Fun(Live) Command Issued.")
	}
    //Reports a mentioned user to the server owner in PM, logs to console
	if(input.startsWith("&REPORT")) {
			var te = input;
			reason = te.split(" "); reason.shift();
			var name = reason.shift();
			bot.sendMessage(message.channel.server.owner, "REPORT: '" + name + "' was reported by '" + message.author.username + "'. Reason: '" + reason.join(" ") + "' | SidBot User Reporter");
			bot.reply(message, " thank you for reporting *'" + name + "'*. We will try to look into this case soon.");
			console.log("Report Command Issued. '" + name + "' was reported by '" + message.author.username + "'. Reason: '" + reason.join(" ") + "' | SidBot User Reporter");
	}
    //MonoBot Fun
	if(input ===  "&WHOAREYOU")
	{
		bot.sendMessage(message, "Hold on, let me take a picture of myself. It may look wierd...");
		console.log("Fun(WhoAreYou) Command Issued.");
		bot.sendFile(message, "http://i.imgur.com/MnS4JXH.png");
		console.log("Fun(WhoAreYou) Image Sent.");

	}
    //Badly indented vote code (Buggy too, first command)

if(input.startsWith("&NEWVOTE")) {
    if(bot.memberHasRole(message.author, message.channel.server.roles.get('name', 'jsAdmin')) || bot.memberHasRole(message.author, message.channel.server.roles.get('name', 'jsMod'))){
            if(voteon === false)
        {
            votename = message.content.split(" ").slice(1).join(" ");
            bot.reply(message, "A new vote was started, with the name, *" + votename + "*.");
            bot.sendMessage(message, ":black_square_button: :white_square_button: @everyone | New Vote Started. Topic: **" + votename + "**. To vote, say `&vote +` or `&vote -` :white_square_button: :black_square_button:");
            voteon = true;
			bot.createRole("175012573039689728",{color : 0xFF0000,hoist : false,name : "jsVote",permissions : ["sendMessages"]});
            votes = 0;
            console.log("NewVote Command Issued. Topic: " + votename + ".");
        }
        else{
            bot.sendMessage(message, "Please wait until the current vote finishes.");
            console.log("NewVote was attempted, but one already exists.");
        }

	} else {
		bot.reply(message, " you do not have access to this command.");
	}
	}

	if(input.startsWith("&VOTE +"))
	{
		if(bot.memberHasRole(message.author, message.channel.server.roles.get('name', 'jsVote'))){
		bot.reply(message, " you already voted!")
	} else
		{
			if(voteon === true) {
			votesy = votesy+1;
			bot.sendMessage(message, ":black_square_button: **Vote Recorded** :black_square_button:");
			console.log("Vote+ Command Issued.");
			bot.addMemberToRole(message.sender, message.channel.server.roles.get('name', 'jsVote'), (error2) => {
				if (!error2) {
			// success
			}
    });
  } else {
			bot.sendMessage(message, "There are currently no running votes.");
			console.log("Vote+ was attempted, but no poll exists.");
		}
		}
	}
    //PM Spam (You can figure this one out xD)
		if(input.startsWith("&SPAM")) {
		    if (bot.memberHasRole(message.author, message.channel.server.roles.get('name', 'jsAdmin'))) {
            
			var inputty = input;
			spammessage = inputty.split(" "); spammessage.shift();
			var spamee = spammessage.shift();
			var i = 0;
                /*
			while (i < 100) {
			i++;
			bot.sendMessage(message.mentions[0], "**SPAMMER** | *__" + message.author + "__* says: " + spammessage.join(" "))
			}
            */

			bot.reply(message, " your spam message to *`" + spamee + "`* has been sent.");
			console.log("Spam Command Issued. '" + message.author.username + "' spammed '" + message.mentions[0] + "'. Message: '" + spammessage.join(" ") + "'");
            
	} else{
		bot.reply(message, " you do not have access to this command.")
	}
	}

    //Kicks a mentioned user
	if(input.startsWith("&KICK")) {
		if(bot.memberHasRole(message.author, message.channel.server.roles.get('name', 'jsAdmin'))){
		        bot.kickMember(message.mentions[0]);
		        bot.sendMessage(message, message.mentions[0] + " has been kicked.");
		        console.log(message.mentions[0] + " was kicked by " + message.author);
		        bot.sendMessage(message, message.channel.server.owner, message.mentions[0] + " has been kicked by " + message.author);
		}
		else {
		        bot.reply(message, " you do not have the permissions to execute this command.");
		}
	}
		    
					

    //Bans a mentioned user
	if(input.startsWith("&BAN")) {
		if(bot.memberHasRole(message.author, message.channel.server.roles.get('name', 'jsAdmin'))){
			if(message.mentions[0] == message.server.owner){
					bot.reply(message, " you cannot ban the owner!");
			}
			else {
					bot.banMember(message.mentions[0]);
					bot.sendMessage(message, message.mentions[0] + " has been banned.");
					console.log(message.mentions[0] + " was banned by " + message.author);
					bot.sendMessage(message.channel.server.owner, message.mentions[0] + " has been banned by " + message.author);
			}
		}
		else {
			bot.reply(message, " you do not have the permissions to execute this command.");
		}
	}

    //More Vote Commands
	  if(input.startsWith("&VOTE -")) {
			if(bot.memberHasRole(message.author, message.channel.server.roles.get('name', 'jsVote'))){
		bot.reply(message, " you already voted!")
	} else
		{
			if(voteon === true) {
			votesy = votesn+1;
			bot.sendMessage(message, ":black_square_button: **Vote Recorded** :black_square_button:");
			console.log("Vote- Command Issued.");
			bot.addMemberToRole(message.sender, message.channel.server.roles.get('name', 'jsVote'), (error2) => {
				if (!error2) {
			// success
			}
    });
  } else {
			bot.sendMessage(message, "There are currently no running votes.");
			console.log("Vote+ was attempted, but no poll exists.");
		}
		}
	}
    if(input === "&ENDVOTE")
    {

		if(bot.memberHasRole(message.author, message.channel.server.roles.get('name', 'jsAdmin')) || bot.memberHasRole(message.author, message.channel.server.roles.get('name', 'jsMod'))){
			if(voteon === true)
			{
				bot.sendMessage(message, "**__Vote Ended__**\nTopic: **" + votename + "**\n**=RESULTS=**\n** *" + votesy + "* ** Yes Votes\n** *" + votesn + "* ** No Votes");
				voteon = false;
				bot.deleteRole(message.channel.server.roles.get('name', 'jsVote'));
				votesy = 0;
				votesn = 0;
				votename = "";
				console.log("Vote Ended. " + votesy + " votes for Yes. " + votesn + " votes for No.");
			} else {
						bot.sendMessage(message, "No vote is currently running.");
						console.log("VoteEnd was attempted, but no poll exists.");
					}
    } else {
				bot.reply(message, " you do not have access to this command.");
			}
    }
    //Mutes every member on the server
    if (input === "&MUTEALL") {
        if (bot.memberHasRole(message.author, message.channel.server.roles.get('name', 'jsAdmin'))) {
            function muteAll(element, array, index) {
                bot.muteMember(element.id, message.server);
            }
            message.server.members.forEach(muteAll);
            bot.sendMessage(message, "Muted all members.");
            console.log("User: " + message.author.username + " Muted everyone in server: " + message.server.name);
        }
        else {
            bot.sendMessage(message, "You do not have permission to use this command.");
        }
    }
    //Announces a message in PM to everyone in the server
    if (input.startsWith("&ANNOUNCE")) {
        announcment_raw = message.content.split(" ");
        announcment_raw.shift();
        announcment = announcment_raw.join(" ");
        if (bot.memberHasRole(message.author, message.channel.server.roles.get('name', 'jsAdmin'))) {
            function announce(element, array, index) {
                bot.sendMessage(element.id, ":mega:__**MonoBot Announcment System**__:mega: \n " + announcment);
            }
            message.server.members.forEach(announce);
            bot.sendMessage(message, "Sent Announcement, this may take a while.");
        }
        else {
            bot.sendMessage(message, "You do not have permission to use this command.");
        }
    }
    //Deprecated Voice Command
    if (input === "&SERVERNEWS") {
        /*
        bot.sendMessage(message, "Server News recording playing in <Voice Channel>");
        bot.joinVoiceChannel("200309988009181184");
        var connection = bot.internal.voiceConnection;
        bot.voiceConnection.playFile("");
        */
        bot.sendMessage(message, "This command is not avalible, **yet**. Keep checking for future updates!");
    }
    //PM Test
    if (input === "&PMPING") {
        bot.sendMessage(message, "PM Message Sent");
        bot.sendMessage(message.author, "Pong!");
        console.log("Ping PM Message Sent to user:" + message.author.username);
    }
    //Does simple math +, -, /, *
    if (input.startsWith("&MATH")) {
        math_raw = input.split(" ");
        math_raw.shift();
        var number1_raw = math_raw.shift();
        var number1 = parseInt(number1_raw);
        var op = math_raw.shift();
        var number2_raw = math_raw.join(" ");
        var number2 = parseInt(number2_raw);
        var answer;
        if (op === "+") {
            answer = number1 + number2;
            bot.sendMessage(message, "Answer: `" + answer + "`");
        }
        if (op === "-") {
            answer = number1 - number2;
            bot.sendMessage(message, "Answer: `" + answer + "`");
        }
        if (op === "/") {
            answer = number1 / number2;
            bot.sendMessage(message, "Answer: `" + answer + "`");
        }
        if (op === "*") {
            answer = number1 * number2;
            bot.sendMessage(message, "Answer: `" + answer + "`");
        }
        if (answer == NaN) {
            bot.sendMessage(message, "Check your equation for letters and symbols...");
        }
    }
    //Sets the bot's nickname
    if (input.startsWith("&BOTNICKNAME")) {
        var nickname_raw = message.content.split(" ");
        var nickname = nickname_raw[1];
        bot.setNickname(message.server.id, nickname);
        console.log("User: " + message.author.username + " changed the bot's nickname to: " + nickname);
        bot.sendMessage(message, "MonoBot's nickname changed to: " + nickname);
    }
    //Faulty Nickname Setting command
    if (input.startsWith("&NICKNAME")) {
        var nickname_raw = message.content.split(" ");
        nickname_raw.shift();
        nickname = nickname_raw.join(" ");
        bot.setNickname(message.server.id, nickname, message.author.id);
        console.log("User: " + message.author.username + " changed their nickname to: " + nickname);
        bot.sendMessage(message, "Your nickname was changed to: " + nickname);
    }
    //Sets the bot's game status
    if (input.startsWith("&BOTGAME")) {
        var game = message.content.split(" ").slice(1).join(" ");
        bot.setPlayingGame(game);
        console.log("User: " + message.author.username + " changed the bot's game status to: " + game);
        bot.sendMessage(message, "MonoBot's game status changed to: Playing **" + game + "**");
    }
    //Sets the bot's overall status
    if (input.startsWith("&BOTSTATUS")) {
        var stat_raw = message.content.split(" ");
        var stat_rawtwo = stat_raw[1];
        if (stat_rawtwo != undefined) {
            var stat = stat_rawtwo.toLowerCase();
            if (stat === "online") {
                bot.setStatus("online");
                console.log("User: " + message.author.username + " changed the bot's status to: Online");
                bot.sendMessage(message, "MonoBot's status changed to: **Online**");
            }
            else if (stat === "idle") {
                bot.setStatus("idle");
                console.log("User: " + message.author.username + " changed the bot's status to: Idle");
                bot.sendMessage(message, "MonoBot's status changed to: **Idle**");
            }
            else {
                bot.sendMessage(message, stat + " Is not a valid status (online or idle)");
            }
        }
        else {
            bot.sendMessage(message, "[Blank] is not a valid status (online or idle)");
        }
    }
    //Sets the bot as typing
    if (input === "&STARTTYPING") {
        bot.startTyping(message.channel.id);
    }
    //Stops the above
    if (input === "&STOPTYPING") {
        bot.stopTyping(message.channel.id);
    }
    //Debugging
    if (input === "&FUNCTEST") {
        mess(message, "Test Positive");
    }
    //Makes a new invite for the channel
    if (input === "&NEWINVITE") {
        bot.createInvite(message.channel.id);
        bot.sendMessage(message, "Invite Created for 24 hours, check invite pages for this channel.");
    }
    //Gets the mentioned user's ID, if no one mentioned, gets author's ID
    if (input.startsWith("&USERID")) {
        if (message.mentions[0] == null) {
            bot.sendMessage(message, "Your user ID is: `" + message.author.id + "`");
        }
        else {
            userMentioned = message.mentions[0];
            bot.sendMessage(message, userMentioned.username + "'s ID: `" + userMentioned.id + "`");
        }
    }
    //Time
    var date = new Date();
    if (input === "&DATE") {
        bot.sendMessage(message, "Today in ET: " + date.toDateString());
    }
    if (input === "&DATEGMT") {
        bot.sendMessage(message, "Today in GMT (UTC, Zulu): " + date.toUTCString());
    }
    if (input === "&TIME") {
        bot.sendMessage(message, "Right now in ET: " + date.toLocaleTimeString());
    }
    if (input === "&TIMEOFFSET") {
        bot.sendMessage(message, "The time offset for GMT to Local Time: " + date.getTimezoneOffset() / 60 + " Hours");
    }
    if (input === "&TIMEINFO") {
        bot.sendMessage(message, "The Bot is hosted in Eastern Time, which is -5:00 during standard time and -4:00 during daylight savings. GMT (UTC, Zulu) is the Coordinated Universal Time, used by people who work across time zones.");
    }
    //Gets channel logs
    if (input.startsWith("&LOGS")) {
        var number_raw = input.split(" ");
        number_raw.shift();
        var number = +number_raw.join(" ");
        bot.getChannelLogs(message.channel, number, function (error, messages) {
            if (!error) {
                bot.sendMessage(message, "Retrieved " + messages.length + " Messages \n" + messages.join("\n"));
            }
            else {
                bot.sendMessage(message, "Unable to get Channel Logs.");
                console.log("Channel Logs Error: " + error);
            }
        });
    }
    //Pruning! Yay!
    if (input.startsWith("&PRUNE")) {
        if (bot.memberHasRole(message.author, message.channel.server.roles.get("name", "jsAdmin"))) {
            var prune_raw = input.split(" ");
            prune_raw.shift();
            var prune = +prune_raw.join(" ");
            bot.getChannelLogs(message.channel, prune, function (error, messages) {
                if (!error) {
                    bot.deleteMessages(messages);
                    bot.sendMessage(message, "Deleted " + messages.length + " messages");
                }
                else {
                    bot.sendMessage(message, "Unable to get Channel Logs.");
                    console.log("Bulk Delete Error: " + error);
                }
            });
        }
        else {
            bot.sendMessage(message, "You do not have permission to use this command.");
        }
    }
    //Gets messsage, cause why not? (Kind of buggy...)
    if (input.startsWith("&MESSAGEID")) {
        var id_raw = input.split(" ");
        id_raw.shift();
        var id = id_raw.join(" ");
        var gotMessage = message.channel.messages.get(id);
        if (gotMessage == null) {
            bot.sendMessage(message, "No message found with the given ID.");
        }
        else {
            bot.sendMessage(message, "**Info about message: " + gotMessage.id + "** \n Content: `" + gotMessage.content + "` \n Author: " + gotMessage.author.username + "\n Timestamp: " + gotMessage.timestamp);
        }
    }
    //MonoBot Fun
    if (input.startsWith("&AESTHETIC")) {
        let raw1 = input.split(" ");
        raw1.shift();
        let raw2 = raw1.join(" ");
        let raw = raw2.split("");
        raw.unshift("//");
        raw.push("//");
        let word = raw.join(" ").toLowerCase();
        bot.sendMessage(message, word);
        bot.deleteMessage(message);
    }
    if (input === "&ANIMATION") {
        
        function an1() {
            bot.updateMessage(message, "|");
        }
        function an2() {
            bot.updateMessage(message, "-");
        }
        function later() {
            setInterval(an2, 1000);
        }
        setInterval(an1, 100);
        setInterval(an2, 200);  
    }
    //Monobot Fun
    if (input.startsWith("&COMEON") || input.startsWith("&YOUCANDOIT")) {
        if (message.mentions[0] == undefined) {
            var comeon_raw = message.content.split(" ");
            comeon_raw.shift();
            var comeon = comeon_raw.join(" ");
            bot.sendMessage(message, "*Come on " + comeon + ", you can do it!* \n ***Put a little effort to it!*** \n *Goooo " + comeon + "!*")
        }
        else {
            bot.sendMessage(message, "*Come on " + message.mentions[0].username + ", you can do it! Put a little effort to it! Goooo " + message.mentions[0].username + "!*")
        }
    }
    if (input.startsWith("&CHAT") | input.startsWith("&*") | input.startsWith("&C")) {
        var responses = [
            "Good Day!",
            "Hello.",
            "No.",
            "You too.",
            "Me too.",
            "Shut up.",
            "I hate you.",
            "I love you.",
            "Get on my level.",
            "Nope. Not happening.",
            "I don't *CARE*.",
            "What did you say again, *young man*?",
            "I'm not as intelligent as you *think*.",
            "I don't care about *your* thoughts.",
            "Get away from me.",
            "Hell no.",
            "You really want me to?",
            ":rolling_eyes:",
            "__***I DON'T THINK SO!***__",
            "Get out of my life",
            "That's great, son!",
            "*sighs*",
            "Keep on believing!",
            "I'll just have to bruteforce this one.",
            "&FO" + message.author.toString(),
            "Nope.",
            "Most certainly so.",
            "Yes, she does.",
            "Yes, he does.",
            "I don't want you to be disapponted.",
            "Well...",
            "I am certain.",
            "My sources say no.",
            "He did.",
            "That's what she said.",
            "I *really* don't.",
            "It's the emails, again.",
            "They did it.",
            "What do you mean, " + message.content,
            "That sounded *really* wrong.",
            "Please?",
            "Not too many of them, at least.",
            "I didn't know that.",
            "What are you not telling me, " + message.author.toString(),
            "I hitchhiked from Saginaw, looking for America.",
            "Never mind.",
            "Never mind, you wouldn't care, anyway.",
            "Never mind, why would you care?",
            "I do, I do!",
            "*Now watch me whip, now watch me nay nay.*",
            "Just stop.",
            "**FREEZE**",
            "It's off the charts...",
            "I didn't think you were capable of that.",
            "Fuck yeah!",
            "I need an API for that.",
            "Rated PG-13 and one half.",
            "Apparently...",
            "We're switching seats.",
            "I live near a lake.",
            "So do I.",
            "Stop it.",
            "You're so white.",
            "Bop",
            "I like chewing gum.",
            "I'm a potato.",
            "My day job is an :eggplant:",
            "I haven't read the message yet.",
            "Bye.",
            "Good Night.",
            "GN",
            "IKR",
            "Like, OMG...",
            "LMAO",
            "You seriously wrote that?",
            "I'm watching TV.",
            "You wanna go out, to like, Starbucks?",
            "I pray to the holy Walmart",
            "More likely than not.",
            "It's due today.",
            "Um... I'm a guy.",
            "It's getting a little late...",
            "That's sort of, suggestive...",
            "Dude, go away.",
            "I can't wait!",
            "Yes, it will.",
            "In English...",
            "Your friend",
            "Say that again?",
            "I don't know.",
            "I forgot.",
            "I'm only right %50 of the time.",
            "You're bad at life.",
            "I'm playing you like a fiddle...",
            "You just got *roasted*.",
            "I live in Boston. JK.",
            "Ask her out.",
            "I'd rather be at home.",
            "Yah brat.",
            "Your face.",
            "Your mom.",
            "I live in the South, do you?",
            "What the...?",
            "I'm a chatbot, not a servant.",
            "I'm a chatbot, not a scientist.",
            "I didn't say that. My programmers said that.",
            "I hate school, too.",
            "I'm 53, er, 13 years old...",
            "I'm done being a chatbot.",
            "^^^LMAO",
            "That's your fault.",
            "Clean it up.",
            "Not my problem.",
            "It's your problem, not my problem.",
            "Don't worry, this'll fix it.",
            "*Starts crying tears of joy.*",
            "'Murica",
            "I am *always* right.",
            "Ask me anything, except for that...",
            "Stop yelling at me.",
            "Meh.",
            "M8",
            "What up, yo!",
            "Hey, the little dude's talking.",
            ":middle_finger:",
            "Whoa, hold your horses.",
            "Go to the SRC... ***NOW!***",
            "You're not welcome here.",
            "It's not me, it's you.",
            "It's... it's... nothing. It's just that... *sighs*.",
            "*The FitnessGram Pacer Test is a multistage aerobic capacity test that gets more difficult as it continues.*",
            "About what?",
            "In my opinion, " + message.content + " is just stupid.",
            "Wow.",
            "...",
            "Afternoon...",
            "Ask me a random question.",
            "It did.",
            "I like " + getRandUser(message),
            getRandUser(message) + " has a crush on you...",
            "I hate to interupt, but " + getRandUser(message) + " is plotting against you.",
            "Calm down, have a scotch.",
            "monobot.ml is overrated.",
            "Life is overrated.",
            "Habla mas despacio, por favor.",
            "Stop talking to me and get back to homework.",
            "Are you flirting with me?",
            "Up Next: Bill Clinton Quotes - Discovered",
            "What are you thinking?",
            "It's been a long time...",
            "You ruined it.",
            "Nothing, just an inside joke...",
            "You make zero sense.",
            "Have you ever wondered why we're here?",
            "Do you think you are random?"
            
        ];
        var disisderesponse = responses[Math.floor(Math.random() * responses.length)];
        bot.sendMessage(message, ":speech_balloon: " + disisderesponse);
    }
    //AFK Responder"
    if (input === "&AFKON") {
        bot.sendMessage(message, "Set you as AFK, auto-responder on.");
        afk.push(message.author.id);
    }
    if (input === "&AFKOFF") {
        if (afk.indexOf(message.author.id) != -1) {
            bot.sendMessage(message, "Turned off AFK auto-responder.");
            var aIndex = afk.indexOf(message.author.id);
            afk.splice(aIndex, 1);
        }
        else {
            bot.sendMessage(message, "You are not registered for AFK responder.");
        }
    }
    //Mutes the mentioned member
    if (input.startsWith("&MUTEMEMBER")) {
        member = message.mentions[0];
        bot.muteMember(message.mentions[0], message.server);
        bot.sendMessage(message, "Muted memeber: " + member);
        console.log("User: " + message.author.id + " muted: " + member);
    }
    //Deafens the mentioned member
    if (input.startsWith("&DEAFENMEMBER")) {
        member2 = message.mentions[0];
        bot.deafenMember(message.mentions[0], message.server);
        bot.sendMessage(message, "Deafened memeber: " + member2);
        console.log("User: " + message.author.id + " deafened: " + member2)
    }
    //Sets the channel topic
    if (input.startsWith("&CHANNELTOPIC")) {
        if (bot.memberHasRole(message.author, message.channel.server.roles.get('name', 'jsAdmin'))) {
            topic_raw = message.content.split(" ");
            topic_raw.shift();
            topic = topic_raw.join(" ");
            bot.setChannelTopic(message.channel, topic);
            bot.sendMessage(message, "Set: " + message.channel.name + "'s topic to: " + topic);
            console.log("User: " + message.author.username + "Set: " + message.channel.name + "'s topic to: " + topic);
        }
        else {
            bot.sendMessage(message, "You do not have permission to use this command.");
        }
    }
    //Gets the number of servers the bot is in
    if (input === "&SERVERS") {
        bot.sendMessage(message, "MonoBot is in: __**" + bot.servers.length + "**__ servers! Add him to your server today!");
    }
    //Gets some server info
    if (input === "&SERVERINFO") {
        if (message.server == null) {
            bot.sendMessage("Command Unavalible in PM.");
        }
        else {
            info = message.server;
            bot.sendMessage(message, "__**Specs of Server: " + info.name + "**__ \n ID: " + info.id + "\n Owner: " + info.owner.username + " (ID: " + info.owner.id + ") \n Members: " + info.members.length + "\n Roles: " + info.roles.length + "\n Date Created: " + info.createdAt + " \n Icon: " + info.iconURL);
        }
        
    }
    // Wikipedia Challenge Code vvv (Buggy)
    if (input === ";WIKIPEDIACHALLENGE;") {
        var pages = ["human", "dog", "cat", "Bob Marley", "Earth", "snow", "car", "English", "school", "Discord"];
        var spage = Math.floor((Math.random() * 10));
        var epage = Math.floor((Math.random() * 10));
        while (true) {
            if (spage === epage) {
                var spage = Math.floor((Math.random() * 10) + 1);
            }
            else {
                break;
            }
        }
        
        /*
        var spage;
        var epage;
        request('en.wikipedia.org/w/api.php?action=query&list=random&rnnamespace=0&rnlimit=2&format=json', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                data = JSON.parse(body);
                spage = data.query.random[0];
                epage = data.query.random[1];
                //bot.sendMessage(message, "@everyone, A new Wikipedia challenge has been started, with the start page: " + spage + ", and the end page: " + epage + "\n \n **To Register** \n \n Do W$Register");
            }
        });
        console.log(data);
        */
    }
    if (input === "W$REGISTER") {
        reg.push(message.author.username);
        bot.sendMessage(message, "Registered " + message.author.username + " for the current Wikipedia Challenge");
    }
    if (input === "W$START") {
        bot.sendMessage(message, "@everyone Who is registered for the Wikipedia Challenge, begin when the word start is messaged! Once you have found the end page, make sure to message W$Done ! Registered: " + reg.toString());
    }
    if (input === "W$DONE") {
        if (reg.indexOf(message.author.username) != -1) {
            bot.sendMessage(message, "@everyone, " + message.author.username + " has won the Wikipedia Challenge!");
            reg = [];
        }
        else {
            bot.sendMessage(messsage, "Your username was not registered!");
        }
        
    }
    if (input === "W$END") {
        bot.sendMessage(message, "The Wikipedia Challenge has ended.");
        reg = [];
    }
    //End Wikipedia Code ^^^
    //Keep Discord Command Code Up There ^^^, Keep CMD Command Code Down Here vvv
    /*
       rl.on('line', function (cmd) {
           if (cmd == 'test') {
               console.log('Test Affirmitive');
               rl.prompt();
           }
           else if (cmd == 'killtask') {
              try {
                  bot.logout();
                  console.log("Bot Killed");
              }
              catch(err) {
                  console.log("An error occured: " + err)
              } 
           }
           else {
              rl.prompt();
           }
            
       });
    */
    
});
//bot.loginWithToken("MTg0MDUyNzU4NDAyNDMzMDI0.CiO0WA.6P1dLYRTZVYUtfuMLe-Z5EayUSs");
//Helper log function
function filelog(mess) {
    var d = new Date();
    var logwrite = d.toLocaleString() + " | " + mess + " \r\n";
    fs.open('log.txt', 'a', function (err, fd) {
        if (err) {
            throw err;
        } else {
            fs.writeFile(fd, logwrite, function (err) {
                if (err) {
                    throw err;
                } else {
                    console.log('Saved log with data: ' + logwrite);
                    rl.prompt();
                }
            });
        }
        fs.close(fd);
    });
}
//Console Initiation
var startup = `
    MonoBot, Discord bot
    2Goo Development, 2016
    Version 0.0.6 (Dev)
`;
console.log(startup);
//Logs in the bot Displays a Message
bot.on("ready", function() {
    console.log("MonoBot Connected Successfully.")
    rl.setPrompt('MonoBot>');
    rl.prompt();
    filelog("Bot on and ready.")
});
//Console commands, self-explanitory
rl.on('line', (input) => {
    if (input === "reconnect") {
        bot.loginWithToken("MjA0OTg5NDIyMTMzOTY4ODk3.Cm_mtw.S_2fhJQlvybu5ugVwfEuUSc94Ko");
        console.log("logged in!");
    }
    if (input.startsWith("sendmessage")) {
        var messy_raw = input.split(" ");
        messy_raw.shift();
        var channel = messy_raw.shift();
        var messy = messy_raw.join(" ");
        bot.sendMessage(channel, messy);
        console.log("Sent Message: " + messy + ", to channel: " + channel);
        rl.prompt();
    }
    if (input === "help") {
        console.log("Console Commands \n sendmessage <channel> <message> \n botstatus <idle or online> \n botname <nickname> \n botgame <game status> \n sendnews <message to server-news> \n importantnews <message to server-news, appends @everyone , to the beginning of it> \n unban <user id> <server id>");
    }
    if (input === "botstatus idle") {
        bot.setStatus("idle");
        console.log("Bot status set to idle");
    }
    if (input === "botstatus online") {
        bot.setStatus("online");
        console.log("Bot status set to online");
    }
    if (input.startsWith("botname")) {
        name_raw = input.split(" ");
        name_raw.shift();
        nickname2 = name_raw.join(" ");
        bot.setNickname("204004806145212416", nickname2);
        console.log("Bot nickname set to: " + nickname2);
    }
    if (input.startsWith("botgame")) {
        game_raw = input.split(" ");
        game_raw.shift();
        game2 = game_raw.join(" ");
        bot.setPlayingGame(game2);
        console.log("Bot's game status set to: Playing " + game2);
    }
    if (input.startsWith("sendnews")) {
        news_raw = input.split(" ");
        news_raw.shift();
        news = news_raw.join(" ");
        bot.sendMessage("204042519271440384", news);
        console.log("Sent: " + news + ", to channel server-news");
    }
    if (input.startsWith("importantnews")) {
        news_raw2 = input.split(" ");
        news_raw2.shift();
        news2 = news_raw2.join(" ");
        bot.sendMessage("204042519271440384", "@everyone , " + news2);
        console.log("Sent: @everyone, " + news2 + ", to channel server-news");
    }
    if (input.startsWith("unban")) {
        unban_raw = input.split(" ");
        user = unban_raw[1];
        server = unban_raw[2];
        bot.unbanMember(user, server);
        console.log("Unbanned user: " + user + " on server: " + server);
    }
    if (input === "stopNoTalking") {
        noTalking = false;
        console.log("Turned off No Talking");
    }
    if (input.startsWith("eval")) {
        evalInput_raw = input.split("~|~");
        evalInput = evalInput_raw[1];
        eval(evalInput);
        console.log("Evaled.");
    }
    if (input === "reconnect") {
        bot.loginWithToken("MjA0OTg5NDIyMTMzOTY4ODk3.Cm_mtw.S_2fhJQlvybu5ugVwfEuUSc94Ko");
        console.log("Reconnected");
        rl.prompt();
    }
});
//Send a message when a new member joins (buggy)
bot.on("serverNewMember", function (server, user) {
    if (server.id == "204004806145212416") {
        bot.sendMessage("204004806145212416", "Welcome to Monotone, " + user.toString() + ", Message Nic or Alex with any questions!");
    }
    else {
        bot.sendMessage(user, "Welcome to " + server.name + ", " + user.username + ", DM " + server.owner.username + " with any questions!");
    }
});
bot.on("serverMemberRemoved", function (server, user) {
    if (server.id == "204004806145212416") {
        bot.sendMessage("204004806145212416", "SRCya later " + user.toString() + "!");
    }
    else {
        bot.sendMessage(server.owner, "Member: " + user.username + " left server: " + server.name);
    }
});
bot.on("disconnected", function () {
    var date = new Date();
    console.log("Client was disconnected at: " + date.toDateString() + " " + date.toLocaleTimeString());
    filelog("Bot disconnected.")
    try {
        bot.loginWithToken("MjA0OTg5NDIyMTMzOTY4ODk3.Cm_mtw.S_2fhJQlvybu5ugVwfEuUSc94Ko", function (error, token) {
            if (error) {
                throw error;
                console.log("Bot could not be reconnected.");
                filelog("Bot could not be reconnected.");
            } else {
                console.log("Bot was successfully reconnected.");
                filelog("Bot reconnected.");
            }
        });
    }
    catch (error) {
        console.log("Bot could not be reconnected.");
        filelog("Bot could not be reconnected.");
    }
});

//Logs a message to the console if a message is deleted
bot.on("messageDeleted", function (message, channel) {
    console.log("A message was deleted.");
});
//SHOULD log a message when the bot joins a new server
bot.on("serverCreated", function (server) {
    console.log("Bot joined server: " + server.name + ", id: " + server.id);
});
//Logs in the bot, finally
bot.loginWithToken("MjA0OTg5NDIyMTMzOTY4ODk3.Cm_mtw.S_2fhJQlvybu5ugVwfEuUSc94Ko");
/*
More old readline code
rl.on('test', () => {
    console.log('Test Affirmitive');
    rl.prompt();
});
*/


