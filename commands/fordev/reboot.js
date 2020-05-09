const owners = require("../../config").owner

module.exports = {
    name: "reboot",
    aliases: ["reboot"],
    category: "fordev",
    description: "reboot bot",
    usage: "",
    run: async (client, music, message, embed, youtube, args) => {
        if (owners.includes(message.author.id) === false) return message.channel.send(":x: 권한없음");
            message.reply(":ok:")
            client.shard.send({ type: "reboot", shard: "all" }) 
    }
}