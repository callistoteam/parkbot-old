const owners = require("../../config").owner
const { koreanbotsToken } = require("../../config")

module.exports = {
    name: "koreanbots",
    aliases: ["servercountpost"],
    category: "fordev",
    description: "post servercount",
    usage: "",
    run: async (client, music, message, embed, youtube, args, replaceAll) => {
        if (owners.includes(message.author.id) === false) return message.channel.send("권한없음")
        const headers = {
            "Content-Type": "application/json",
            "token": koreanbotsToken
        }
        
        const body = { servers: client.guilds.cache.size }
        
        try{
            require("node-fetch")("https://api.koreanbots.cf/bots/servers", {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body)
            })
            message.reply(`:ok: | \`${client.guilds.cache.size}\``)
        } catch(e) {
            return message.channel.send(e)
        }
    }
}