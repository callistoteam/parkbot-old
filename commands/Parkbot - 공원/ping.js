const Discord = require("discord.js");
const { displayname } = require("../../config")

module.exports = {
    name: "ping",
    aliases: ["pong", "핑", "ㅔㅑㅜㅎ"],
    category: "Parkbot - 공원",
    description: "봇의 지연시간 측정",
    usage: "",
    run: async (client, music, message) => {
        try{
            const m = await message.channel.send("<a:loadingforpark:702385005590085632> 잠시만 기다려주세요").then(async msg => {
            let rpembed = new Discord.MessageEmbed()
            .setTitle("퐁!")
            .setColor("RANDOM")
            .addField("지연 시간", `${msg.createdTimestamp - message.createdTimestamp}ms`)
            .addField("API지연시간", `${client.ws.ping}ms`)
            if(client.ws.ping+(msg.createdTimestamp - message.createdTimestamp) < 537) {
                rpembed.setFooter(`${displayname}의 핑 상태 : 정상`)
            } else {
                rpembed.setFooter(`${displayname}의 핑 상태 : 비정상`)
            }
            rpembed.setTimestamp()
            msg.edit("Pong")
            msg.edit(rpembed)
          })
        }catch(e) {
            message.channel.send("오류");
            console.log(e)
        }
    }
}