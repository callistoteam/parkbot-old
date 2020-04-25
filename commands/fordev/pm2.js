const child = require('child_process')

const owners = ["480240821623455746"];

module.exports = {
    name: "pm2",
    aliases: ["ㅔㅡ2"],
    category: "fordev",
    description: "pm2",
    usage: "",
    run: async (client, music, message, embed, youtube, args) => {
        if (owners.includes(message.author.id) === false) return message.channel.send(lang.commands.pm2.noperm);
        if(!args[1]) return message.channel.send("name")
        if(args[0] == "restart"){
            message.channel.send(`\`\`\`${child.execSync(`pm2 restart ${args[1]}`).toString()}\`\`\``)
        }
    }
}