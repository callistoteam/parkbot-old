const Discord = require("discord.js");

module.exports = {
  name: "ping",
  aliases: ["pong"],
  category: "info",
  description: "봇의 지연시간 측정",
  usage: "",
  run: async (client, music, message, embed, youtube, args, lang) => {
  try{
    const m = await message.channel.send(lang.commands.ping.fping).then(async msg => {

      let rpembed = new Discord.MessageEmbed()
      .setTitle(lang.commands.ping.eping)
      .setColor("RANDOM")
      .addField(lang.commands.ping.dtime, `${msg.createdTimestamp - message.createdTimestamp}ms`)
      .addField(lang.commands.ping.apidtime, `${client.ws.ping}ms`)
      if(client.ws.ping+(msg.createdTimestamp - message.createdTimestamp) < 537) {
        rpembed.setFooter(lang.commands.ping.pprg)
      } else {
        rpembed.setFooter(lang.commands.ping.pprb)
      }
      rpembed.setTimestamp()
      msg.edit(rpembed)
    })
  }catch(e) {
    message.channel.send(`ERROR \n\n \`\`\`js\n${e}\n\`\`\`\n\n `);
  }
  }
}