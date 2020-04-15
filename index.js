const { Client, Collection } = require("discord.js");
const { BaseCluster, isMaster } = require("kurasuta")
const fs = require("fs");
const Discord = require('discord.js');
const config = require('./config')  
const music = require('./music')
const yt = require('simple-youtube-api')
const youtube = require('yt-search')
const prefix = config.prefix
const lang = require("./lang/kr")

/* const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : localhost,
      user : config.DBUser,
      password : config.DBPassword,
      database : config.DBName
    }
}) */

const status_list = [
    `${prefix}help | 디스코드를 흥겹게!`, 
    `${prefix}도움말 | 디스코드를 흥겹게!`,
    `${prefix}help | 04.16`, 
    ];

module.exports = class extends BaseCluster {
    launch() {
        const client = this.client

        client.commands = new Collection();
        client.aliases = new Collection();
        client.categories = fs.readdirSync("./commands/");


        ["command"].forEach(handler => {
            require(`./handlers/${handler}`)(client);
        });

        client.on("debug", info => {
            if(info.includes("ws")) console.log(info)
        })

        client.on('ready', () => {
            console.log(client.user.tag)
            setInterval(() => {
                const interstatus = Math.floor(Math.random() * (status_list.length - 1) + 1)
                client.user.setActivity(status_list[interstatus])
            }, 17000);
        })

        client.on("guildCreate", guild => {
            client.channels.cache.get(config.noticeChannel).send(`new guild\nName:\`${guild.name}\`(${guild.id})\nOwner:${guild.owner}(@${guild.owner.id})`)
        })

        client.on("guildDelete", guild => {
            client.channels.cache.get(config.noticeChannel).send(`left guild\nName:\`${guild.name}\`(${guild.id})\nOwner:${guild.owner}(@${guild.owner.id})`)
        })

        client.on("message", async message => {
            if (message.author.bot) return;
            if (!message.guild) return;
            if (!message.content.startsWith(prefix)) return;
            const owners = ["480240821623455746"];
            if (!message.member) message.member = await message.guild.fetchMember(message);

            message.data = {
                raw: message.content,
                arg: message.content.split(' ').slice(1),
                args: message.content.slice(message.content.split(' ')[0].length + 1),
                prefix: message.content.substr(0, 1),
                cmd: message.content.split(' ')[0].toLowerCase().replace(config.prefix, '')
            }

            const args = message.content.slice(prefix.length).trim().split(/ +/g);
            const cmd = args.shift().toLowerCase();

            if (cmd.length === 0) return;

            let command = client.commands.get(cmd);
            if (!command) command = client.commands.get(client.aliases.get(cmd));

            const embed = new Discord.MessageEmbed()
            embed.setColor(config.color)

            if (command) {
                const article = fs.readFileSync("fixing.txt");
                let lineArray = article.toString()
                if (lineArray == 1) {
                    if (owners.includes(message.author.id) === false) return message.reply(lang.index.onfix);
                }

                if (message.member.voice.channel) music.create(message.guild.id, message.member.voice.channel, message)
                console.log(message.content + new Date() + message.author.id)
                command.run(client, music, message, embed, youtube, args, lang);
            }
        });

        process.on("unhandledRejection", (reason, listener) => {
            try{ listener }catch(err) { throw err }
        })
        process.on("uncaughtException", error => { throw error })

        client.login(config.token)
    }
}