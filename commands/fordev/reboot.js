const Discord = require("discord.js");
const fs = require('fs');
const lang  = require("../../lang/kr")

const owners = ["480240821623455746"];

module.exports = {
    name: "reboot",
    aliases: ["reboot"],
    category: "fordev",
    description: "reboot bot",
    usage: "",
    run: async (client, music, message, embed, youtube, args) => {
    if (owners.includes(message.author.id) === false) return message.channel.send(lang.commands.reboot.noperm);
    message.reply(lang.commands.reboot.okreboot)
    client.shard.send({ type: "reboot", shard: "all" }) 
    }
}