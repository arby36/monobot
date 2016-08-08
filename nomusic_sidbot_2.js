``
var Discord = require("discord.js");
var bot = new Discord.Client();
require("events");
///DuckDuckGo
ddg = require('ddg');
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
var readline = require('readline'),
rl = readline.createInterface(process.stdin, process.stdout);
//Bot Code vvv
bot.on('ready', () => { bot.setPlayingGame("with fire.") });
bot.on("message", function(message)
{

    var input = message.content.toUpperCase();
    if (message.server == null) {
        console.log("User: " + message.author.username + ", sent: " + input);
    }
    if (message.isMentioned("204989422133968897")) {
        bot.sendMessage(message, "I'm always watching you, always watching...")
        console.log("User: " + message.author.username + " mentioned MonoBot in channel: " + message.channel.name);
    }
    if (message.everyoneMentioned == true) {
        console.log("User: " + message.author.username + " mentioned @everyone, in channel: " + message.channel.name + " with the message: " + message.content);
        bot.sendMessage(message.server.owner, "User: " + message.author.username + " mentioned @everyone, in channel: " + message.channel.name + " with the message: " + message.content);
    }
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
	if(input ===  "&INFO")
	{
		bot.reply(message, "Hello, I am MonoBot! I am currently in alpha. I am an experimental Discord Bot created by developers Nic and Alex, for  use in Monotone!");
		console.log("Info Command Issued.")
	}
	if(input ===  "&PING")
	bot.sendMessage(message.channel, "Pong!", function(err, message){
	    if(!err){
		bot.updateMessage(message, "Pong, *" + (message.timestamp - message.timestamp) + "ms*.")
	    }
		console.log("Ping Command Issued.")
	});
	if (input === "&UPTIME") {
	    uptime = bot.uptime / 1000;
	    bot.sendMessage(message, "I have been alive for " + uptime + " seconds!");
	}
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
	if(input ===  "&HELP")
	{
	    bot.sendMessage(message, "**__MonoBot Command List__**\n\n*Don't include the example brackets when using commands!*\n\n**`&NewVote <Vote Name>`** - *Starts a new vote.*\n**`&Vote <+ or ->`** - *Votes on current poll.*\n**`&EndVote`** - *Ends the current poll.*\n**`&Info`** - *A little bit of info about SidBot.*\n**`&WhoIsTheCoolest`** - *Sid Fun.*\n**`&Live`** - *Sid Fun.*\n**`&WhoAreYou`** - *Sid Fun.*\n**`&Ping`** - *Pong! Test bot latency.*\n**`&Report <@Username> <Reason>`** - *Report a user.*\n**`&KillTask`** - *Kill Bot Task.*\n**`;0;`** - *Simple game!*\n**`&Spam <@Username> <Message>`** - *Spam a message to a user through DM.*\n**`&Kick <@Username>`** - *Kick a member.*\n**`&Ban <@Username>`** - *Ban a member.*\n**`&GameHistory`** - *Stats for ;0;*\n**`&Search <Result index 0-3, both inclusive> <Search Query>`** - *Searches DuckDuckGo Search Engine* \n More Commands and Documentation at: https://github.com/arby36/monobotdiscordbot/wiki");
		console.log("Help Command Issued.")
	}
	if(input ===  "&WHOISTHECOOLEST")
	{
		bot.sendMessage(message, "__**Sid is always the coolest.**__");
		console.log("Fun(WhoIsTheCoolest) Command Issued.")
	}
	if(input ===  "&KILLTASK")
    {
        if(bot.memberHasRole(message.author, message.channel.server.roles.get('name', 'jsAdmin'))){
            bot.reply(message, "Stop, Nic.");
        }
        else {
            bot.reply(message, " you do not have access to this command.")
        }
	}
	if (input === "&KICKBOT" & bot.memberHasRole(message.author, message.channel.server.roles.get('name', 'jsAdmin'))) {
	    bot.sendMessage(message, "Bye, " + message.server.name + ", I'll be back soon!");
	    bot.leaveServer(message.server.id);
	    console.log("Monobot was kicked out of server: " + message.server.name + ", by user: " + message.author.username);
	}
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
	if (input.startsWith("&WEATHER")) {
	    w_raw = message.content.split(" ");
	    w_raw.shift();
	    type = w_raw.shift();
	    zip = w_raw.join(" ");
	    try {
	        if (type === "temp_f") {
	            wunderground.conditions().request(zip, function (err, response) {
	                bot.sendMessage(message, "The tempature for: " + zip + ", " + response.current_observation.temp_f + " F");
	            });
	        }
	        if (type === "temp_c") {
	            wunderground.conditions().request(zip, function (err, response) {
	                bot.sendMessage(message, "The tempature for: " + zip + ", " + response.current_observation.temp_c + " C");
	            });
	        }
	        if (type === "forecastText") {
	            wunderground.forecast().request(zip, function (err, response) {
	                bot.sendMessage(message, "__**The 2-day forecast for: " + zip + ",**__ \n **Day 1** \n *" + response.forecast.txt_forecast.forecastday[0].title + "*\n" + response.forecast.txt_forecast.forecastday[0].fcttext + "\n" + "**Day 1 - Night** \n *" + response.forecast.txt_forecast.forecastday[1].title + "*\n" + response.forecast.txt_forecast.forecastday[1].fcttext + "\n" + "**Day 2** \n *" + response.forecast.txt_forecast.forecastday[2].title + "*\n" + response.forecast.txt_forecast.forecastday[2].fcttext + "\n \n Weather Courtesy of Weather Underground \n In partnership with the Weather Channel.");
	            });
	        }
	        if (type === "forecastReport") {
	            wunderground.forecast().request(zip, function (err, response) {
	                bot.sendTTSMessage(message, "__**The 2-day forecast for: " + zip + ",**__ \n **Day 1** \n *" + response.forecast.txt_forecast.forecastday[0].title + "*\n" + response.forecast.txt_forecast.forecastday[0].fcttext + "\n" + "**Day 1 - Night** \n *" + response.forecast.txt_forecast.forecastday[1].title + "*\n" + response.forecast.txt_forecast.forecastday[1].fcttext + "\n" + "**Day 3** \n *" + response.forecast.txt_forecast.forecastday[2].title + "*\n" + response.forecast.txt_forecast.forecastday[2].fcttext + "\n \n Weather Courtesy of Weather Underground \n In partnership with the Weather Channel.");
	            });
	        }
	        if (type === "station") {
	            wunderground.almanac().request(zip, function (err, response) {
	                bot.sendMessage(message, "Airport Code For Local Station: " + response.almanac.airport_code);
	            });
	        }
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
	if (input === "TALK ABOUT THE WEATHER" | input.startsWith("WHAT'S THE WEATHER LIKE")) {
	    wunderground.forecast().request('49506', function (err, response) {
	        bot.sendMessage(message, "__**The 2-day forecast for: East Grand Rapids, MI,**__ \n **Day 1** \n *" + response.forecast.txt_forecast.forecastday[0].title + "*\n" + response.forecast.txt_forecast.forecastday[0].fcttext + "\n" + "**Day 1 - Night** \n *" + response.forecast.txt_forecast.forecastday[1].title + "*\n" + response.forecast.txt_forecast.forecastday[1].fcttext + "\n" + "**Day 2** \n *" + response.forecast.txt_forecast.forecastday[2].title + "*\n" + response.forecast.txt_forecast.forecastday[2].fcttext + "\n \n Weather Courtesy of Weather Underground \n In partnership with the Weather Channel.");
	    });
	}
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
	if (input === "&GETAPI") {
	    request('http://m.uploadedit.com/ba3s/1470444694177.txt', function (error, response, body) {
	        if (!error && response.statusCode == 200) {
	            data = JSON.parse(body);
	            bot.sendMessage(message, "API Message: " + data.main.meta + " \n " + data.main.message);
	        }
	    })
	}
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
	        trackParam = "track:" + track;
	        spotifyApi.searchTracks(trackParam)
                .then(function (data) {
                    var response = data.body;
                    bot.sendMessage(message, "__**Most Relevant Track For:**__\n `" + track + "`\n \n Main Artist:\n *" + response.tracks.items[0].artists[0].name + "*\n Track:\n **" + response.tracks.items[0].name + "**\n Link:\n" + response.tracks.items[0].external_urls.spotify + "\n Search Courtesy of Spotify");
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
	if(input ===  "&LIVE")
	{
	    bot.sendMessage(message, "__***Live the #MonoLife.***__");
		console.log("Fun(Live) Command Issued.")
	}
	if(input.startsWith("&REPORT")) {
			var te = input;
			reason = te.split(" "); reason.shift();
			var name = reason.shift();
			bot.sendMessage(message.channel.server.owner, "REPORT: '" + name + "' was reported by '" + message.author.username + "'. Reason: '" + reason.join(" ") + "' | SidBot User Reporter");
			bot.reply(message, " thank you for reporting *'" + name + "'*. We will try to look into this case soon.");
			console.log("Report Command Issued. '" + name + "' was reported by '" + message.author.username + "'. Reason: '" + reason.join(" ") + "' | SidBot User Reporter");
	}
	if(input ===  "&WHOAREYOU")
	{
		bot.sendMessage(message, "Hold on, let me take a picture of myself. It may look wierd...");
		console.log("Fun(WhoAreYou) Command Issued.");
		bot.sendFile(message, "http://i.imgur.com/MnS4JXH.png");
		console.log("Fun(WhoAreYou) Image Sent.");

	}

var votename

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

		if(input.startsWith("&SPAM")) {
		 if(bot.memberHasRole(message.author, message.channel.server.roles.get('name', 'jsAdmin'))){
			var inputty = input;
			spammessage = inputty.split(" "); spammessage.shift();
			var spamee = spammessage.shift();
			var i = 0;
			while (i < 100) {
			i++;
			bot.sendMessage(message.mentions[0], "**SPAMMER** | *__" + message.author + "__* says: " + spammessage.join(" "))
			}

			bot.reply(message, " your spam message to *`" + spamee + "`* has been sent.");
			console.log("Spam Command Issued. '" + message.author.username + "' spammed '" + message.mentions[0] + "'. Message: '" + spammessage.join(" ") + "'");
	} else{
		bot.reply(message, " you do not have access to this command.")
	}
	}

		if(input.startsWith("&KICK")) {
		    if(bot.memberHasRole(message.author, message.channel.server.roles.get('name', 'jsAdmin'))){
		        bot.kickMember(message.mentions[0]);
		        bot.sendMessage(message, message.mentions[0] + " has been kicked.");
		        console.log(message.mentions[0] + " was kicked by " + message.author);
		        bot.sendMessage(message, message.channel.server.owner, message.mentions[0] + " has been kicked by " + message.author);
		    }
		    else{
		        bot.reply(message, " you do not have the permissions to execute this command.");
		    }
		}
		    
					


					if(input.startsWith("&BAN")) {
						 if(bot.memberHasRole(message.author, message.channel.server.roles.get('name', 'jsAdmin'))){
							 if(message.mentions[0] === "@nic#4572"){
								 bot.reply(message, " you cannot ban the owner!");
							 } else {
								 bot.banMember(message.mentions[0]);
									 bot.sendMessage(message, message.mentions[0] + " has been banned.");
									 console.log(message.mentions[0] + " was banned by " + message.author);
									 bot.sendMessage(message, message.channel.server.owner, message.mentions[0] + " has been banned by " + message.author);
									}

								}else{
										bot.reply(message, " you do not have the permissions to execute this command.");
									}
								}


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
    if(input === "&MUTEALL") {
        /*
        if (bot.memberHasRole(message.author, message.channel.server.roles.get('name', 'jsAdmin'))) {
            bot.muteMember("everyone", "East Chat");
            bot.sendMessage(message, "All members muted");
            console.log("Mute All Command Issued.");
        }
        else {
            bot.sendMessage(message, "You do not have permissions to use this command.");
        }
        If you can figure out a solution to the resolveables, please un-comment the code and fix it...
        */
        bot.sendMessage(message, "This command is not avalible, **yet**. Keep checking for future updates!");
    }
    if (input === "&SERVERNEWS") {
        /*
        bot.sendMessage(message, "Server News recording playing in <Voice Channel>");
        bot.joinVoiceChannel("200309988009181184");
        var connection = bot.internal.voiceConnection;
        bot.voiceConnection.playFile("");
        */
        bot.sendMessage(message, "This command is not avalible, **yet**. Keep checking for future updates!");
    }
    if (input === "&PMPING") {
        bot.sendMessage(message, "PM Message Sent");
        bot.sendMessage(message.author, "Pong!");
        console.log("Ping PM Message Sent to user:" + message.author.username);
    }
    if (input.startsWith("&BOTNICKNAME")) {
        var nickname_raw = message.content.split(" ");
        var nickname = nickname_raw[1];
        bot.setNickname(message.server.id, nickname);
        console.log("User: " + message.author.username + " changed the bot's nickname to: " + nickname);
        bot.sendMessage(message, "MonoBot's nickname changed to: " + nickname);
    }
    if (input.startsWith("&NICKNAME")) {
        var nickname_raw = message.content.split(" ");
        nickname_raw.shift();
        nickname = nickname_raw.join(" ");
        bot.setNickname(message.server.id, nickname, message.author.id);
        console.log("User: " + message.author.username + " changed their nickname to: " + nickname);
        bot.sendMessage(message, "Your nickname was changed to: " + nickname);
    }
    if (input.startsWith("&BOTGAME")) {
        var game = message.content.split(" ").slice(1).join(" ");
        bot.setPlayingGame(game);
        console.log("User: " + message.author.username + " changed the bot's game status to: " + game);
        bot.sendMessage(message, "MonoBot's game status changed to: Playing **" + game + "**");
    }
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
    if (input === "&STARTTYPING") {
        bot.startTyping(message.channel.id);
    }
    if (input === "&STOPTYPING") {
        bot.stopTyping(message.channel.id);
    }
    if (input === "&FUNCTEST") {
        mess(message, "Test Positive");
    }
    if (input === "&NEWINVITE") {
        bot.createInvite(message.channel.id);
        bot.sendMessage(message, "Invite Created for 24 hours, check invite pages for this channel.");
    }
    if (input.startsWith("&USERID")) {
        if (message.mentions[0] == null) {
            bot.sendMessage(message, "Your user ID is: `" + message.author.id + "`");
        }
        else {
            userMentioned = message.mentions[0];
            bot.sendMessage(message, userMentioned.username + "'s ID: `" + userMentioned.id + "`");
        }
    }
    if (input === "&CHANNELLOGS") {
        bot.getChannelLogs(message.channel.id, 25, function (error, messages) {
            bot.sendMessage(message, "Last 25 messages: " + messages.join(", \n "));
        });
    }
    if (input.startsWith("&MUTEMEMBER")) {
        member = message.mentions[0];
        bot.muteMember(message.mentions[0], message.server);
        bot.sendMessage(message, "Muted memeber: " + member);
        console.log("User: " + message.author.id + " muted: " + member);
    }
    if (input.startsWith("&DEAFENMEMBER")) {
        member2 = message.mentions[0];
        bot.deafenMember(message.mentions[0], message.server);
        bot.sendMessage(message, "Deafened memeber: " + member2);
        console.log("User: " + message.author.id + " deafened: " + member2)
    }
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
    // Wikipedia Challenge Code vvv
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
bot.loginWithToken("MjA0OTg5NDIyMTMzOTY4ODk3.Cm_mtw.S_2fhJQlvybu5ugVwfEuUSc94Ko");
bot.on("ready", function() {
    console.log("MonoBot Connected Successfully.")
    rl.setPrompt('MonoBot>');
    rl.prompt();
});
rl.on('line', (input) => {
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
});
bot.on("serverNewMemeber", function(server, user) {
    bot.sendMessage("204004806145212416", "Welcome to Monotone, " + user.username + ", Message Nic or Alex with any questions!");
});
bot.on("messageDeleted", function (message, channel) {
    console.log("A message was deleted.");
});
bot.on("serverCreated", function (server) {
    console.log("Bot joined server: " + server.name + ", id: " + server.id);
});
/*
More old readline code
rl.on('test', () => {
    console.log('Test Affirmitive');
    rl.prompt();
});
*/


