const Discord = require("discord.js");
const fs = require('fs');
const lang  = require("../../lang/kr")

const owners = ["480240821623455746"];

module.exports = {
    name: "todolist",
    aliases: ["tdl"],
    category: "fordev",
    description: "해야할것들",
    usage: "",
    run: async (client, music, message, embed, youtube, args) => {
    if (owners.includes(message.author.id) === false) return message.channel.send(lang.commands.reboot.noperm);
    embed.addField("TODO", "1. queue 목록 array => DB \n2. docs \n3. np버그")
    message.channel.send(embed)
}
}