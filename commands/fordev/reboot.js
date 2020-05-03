const owners = ["480240821623455746"];

module.exports = {
    name: "reboot",
    aliases: ["reboot"],
    category: "fordev",
    description: "reboot bot",
    usage: "",
    run: async (client, music, message, embed, youtube, args) => {
        if (owners.includes(message.author.id) === false) return message.channel.send("권한없음");
            message.reply(":ok:")
            client.shard.send({ type: "reboot", shard: "all" }) 
    }
}