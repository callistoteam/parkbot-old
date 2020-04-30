const Discord = require("discord.js");
const fs = require('fs');
const child = require("child_process")

const owners = ["480240821623455746"];

module.exports = {
    name: "exec",
    aliases: ["exec"],
    category: "fordev",
    description: "exec",
    usage: "[code]",
    run: async (client, music, message, embed, youtube, args, lang, replaceAll) => {
        if (owners.includes(message.author.id) === false) return message.channel.send("권한없음")

        try{
            const a = child.execSync(message.data.args)
            message.channel.send(`\`\`\`${a}\`\`\``)
        } catch(e){
            message.channel.send(`\`\`\`${e}\`\`\``)
        }
    }
}