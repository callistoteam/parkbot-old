const Discord = require("discord.js");
const { displayname } = require("../../config")

module.exports = {
    name: "ping",
    aliases: ["pong", "핑", "ㅔㅑㅜㅎ"],
    category: "info",
    description: "봇의 지연시간 측정",
    usage: "",
    run: async (client, music, message, embed, youtube, args, lang) => {
        try{
            const m = await message.channel.send("퐁! 봇의 지연시간을 측정중입니다").then(async msg => {
            let rpembed = new Discord.MessageEmbed()
            .setTitle("퐁!")
            .setColor("RANDOM")
            .addField("지연 시간", `${msg.createdTimestamp - message.createdTimestamp}ms`)
            .addField("API지연 시간" `${client.ws.ping}ms`)
            if(client.ws.ping+(msg.createdTimestamp - message.createdTimestamp) < 537) {
                rpembed.setFooter(`${displayname}의 핑 상태 : 정상`)
            } else {
                rpembed.setFooter(`${displayname}의 핑 상태 : 비정상`)
            }
            rpembed.setTimestamp()
            msg.edit(rpembed)
          })
        }catch(e) {
            message.channel.send("오류");
            client.users.cache.get('480240821623455746').send(e)
        }
    }
}