const Discord = require("discord.js");
const fs = require('fs');

function isJSON(json) {
    try {
        JSON.parse(json);
        return true;
    } catch (e) {
        return false;
    }
}

const owners = ["480240821623455746"];

module.exports = {
    name: "reboot",
    aliases: ["reboot"],
    category: "fordev",
    description: "For Developer : reboot",
    usage: "",
    run: async (client, music, message, embed, youtube, args) => {
    if (owners.includes(message.author.id) === false) return message.channel.send("권한없음");
    message.reply(':ok: 재시작합니다')
    client.shard.send({ type: "reboot", shard: "all" }) 
}
}