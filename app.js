const Discord = require('discord.js');
const sql = require('sqlite');
const sql3 = require('sqlite3');
const config = require('./config.json');
sql.open('./guildlist.sqlite', 'utf-8');
const ver = '1.4';
var callerID;   		var calledID;
var sA; 	var sB;		var sp;
var scA;    var scB;	var temp;
var max_port = 6600;
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max) + 1);
}
function getport(n) {
    return Math.floor(Math.random() * Math.floor(n) + 1);
}
const client = new Discord.Client();
client.login(config.token);
client.on('ready', function () {
    console.log(`Telbot ready!`);
    client.user.setActivity(`v.${ver} | t!help`);
});
client.on('message', message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    let args = message.content.split(' ');
    let command = args[0];
    if (command == 't!help') {
        message.channel.send({
            "embed": {
                "title": "Help menu",
                "color": 0231464,
                "fields": [
                    { "name": "t!init", "value": "Wizard setup to be in the dialer list" },
                    { "name": "t!call", "value": "Launch the call system" },
                    { "name": "t!s", "value": "Sends the message to the guild you're connected with" },
                    { "name": "t!hang", "value": "Hangs up the current call" }]
            }
        })
    }
    if (command == 't!init') {
        sql.get(`SELECT * FROM guilds canal_id = "${message.channel.id}"`).then(row => {
            if (!row) {
                sql.run(`INSERT INTO guilds WHERE ID = "${message.channel.id}" (canal_id, call_status, port, guild_id, guild_name) VALUES (?, ?, ?, ?, ?)`, [message.channel.id, 0, 0, message.guild.id, message.guild.name]);
                message.channel.send("You were added to my database.");
            }
        })
            .catch((err) => {
                sql.run("INSERT INTO guilds (canal_id, call_status, port, guild_id, guild_name) VALUES (?, ?, ?, ?, ?)", [message.channel.id, 0, 0, message.guild.id, message.guild.name]);
                message.channel.send("You were added to my database.");
            });
    }
    if (command == 't!call') {
        leport = getport(max_port);
        callerID = message.channel.id;
        sql.get(`SELECT * FROM guilds WHERE canal_id = "${callerID}"`).then(row => {
            if (!row) {
                sql.run(`INSERT INTO guilds WHERE ID = "${message.channel.id}" (canal_id, call_status, port, guild_id, guild_name) VALUES (?, ?, ?, ?, ?)`, [message.channel.id, 0, 0, message.guild.id, message.guild.name]);
                message.channel.send("You were added to my database.\nPlease use the `t!call` command to start a call then use the `t!s <message>` command to send a message.");
                return;
            }
            sql.run(`UPDATE guilds SET call_status = 1, port = ${leport} WHERE canal_id = ${callerID}`);
        });
        let value = getRandomInt(8);
        sql.get(`SELECT * FROM guilds WHERE ROWID = "${value}"`).then(row => {
            if (row.canal_id == message.channel.id) {
                sql.run(`UPDATE guilds SET call_status = 0 WHERE canal_id = ${value}`);
                sql.run(`UPDATE guilds SET call_status = 0 WHERE canal_id = ${callerID}`);
                message.channel.send("An internal error occurred. \nPlease retry.");
                return;
            }
            else if (row.call_status == 1) {
                sql.run(`UPDATE guilds SET call_status = 0 WHERE canal_id = ${callerID}`);
                message.channel.send("An internal error occurred. \nPlease retry.");
                return;
            }
            else {
                calledID = row.canal_id;
                client.channels.get((`${calledID}`)).send("@everyone You are being called by some mysterious group! \n Type t!s to answer them or t!hang to stop the chat");
                sql.run(`UPDATE guilds SET call_status = 1, port = ${leport} WHERE canal_id = ${calledID}`);
                message.channel.send("Call status : Started.");
            }
        })
    }
    if (command == 't!s') {
        sql.get(`SELECT * FROM guilds WHERE canal_id = "${message.channel.id}"`).then(row => {
            if (!row) {
                sql.run(`INSERT INTO guilds WHERE ID = "${message.channel.id}" (canal_id, call_status, port, guild_id, guild_name) VALUES (?, ?, ?, ?, ?)`, [message.channel.id, 0, 0, message.guild.id, message.guild.name]);
                message.channel.send("You were added to my database.\nPlease use the `t!call` command to start a call then use the `t!s <message>` command to send a message.");
                return;
            }
            else {
                if (row.call_status == 0) {
                    message.channel.reply("You aren't in any conversation. \nPlease use the command `t!call` to start a call.");
                    return;
                }
                else {
                    sA = row.canal_id
                    sp = row.port;
                    scA = row.guild_name;
                    sql.get(`SELECT * FROM guilds WHERE port = '${sp}' AND canal_id <>${sA}`).then(row => {
                        sB = row.canal_id;
                        scB = row.guild_name;
                        if (!args[1]) {
                            message.reply("You didn't provided anything to say! \nPlease use the following syntax:```t!s < text to send >```");
                            return;
                        }
                        else {
                            let tosend = message.content.slice(4);
                            client.channels.get(`${sB}`).send(`**${scA}** tells you :\`\`\`${tosend}\`\`\``);
                        }
                    });
                }
            }
        });
    }
    if (command == 't!hang') {
        sql.get(`SELECT * FROM guilds WHERE canal_id = "${message.channel.id}"`).then(row => {
            if (!row) {
                sql.run(`INSERT INTO guilds WHERE ID = "${message.channel.id}" (canal_id, call_status, port, guild_id, guild_name) VALUES (?, ?, ?, ?, ?)`, [message.channel.id, 0, 0, message.guild.id, message.guild.name]);
                message.channel.send("You were added to my database.\nPlease use the `t!call` command to start a call then use the `t!s <message>` command to send a message.");
                return;
            }
            else {
                if (row.call_status == 0) {
                    message.channel.reply("You aren't in any conversation. \nPlease use the command `t!call` to start a call.");
                    return;
                }
            }
            sql.run(`UPDATE guilds SET call_status = 0 WHERE canal_id = ${callerID}`);
        });
        sql.get(`SELECT * FROM guilds WHERE canal_id = "${message.channel.id}"`).then(row => {
            sA = row.canal_id
            sp = row.port;
            scA = row.guild_name;
            sql.run(`UPDATE guilds SET port = 0, call_status = 0 WHERE canal_id = ${message.channel.id}`);
            sql.get(`SELECT * FROM guilds WHERE port = '${sp}' AND canal_id <>${sA}`).then(row => {
                sB = row.canal_id;
                scB = row.guild_name;
                sql.run(`UPDATE guilds SET port = 0, call_status = 0 WHERE canal_id = ${sB}`);
                client.channels.get((`${sB}`)).send(`Conversation terminated`);
                client.channels.get((`${sA}`)).send("You terminated the conversation");
            });
        })
    }
});
