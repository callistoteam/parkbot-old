const Discord = require("discord.js");

module.exports = {
  name: "ping",
  aliases: ["pong"],
  category: "info",
  description: "핑!퐁!",
  usage: "",
  run: async (client, music, message, embed, youtube, args) => {
  try{
    const m = await message.channel.send("PONG!").then(async msg => {

      let rpembed = new Discord.MessageEmbed()
      .setTitle("Pong!")
      .setColor("RANDOM")
      .addField("Delay time", `${msg.createdTimestamp - message.createdTimestamp}ms`)
      .addField("API Delay time", `${client.ws.ping}ms`)
      if(client.ws.ping+(msg.createdTimestamp - message.createdTimestamp) < 537) {
        rpembed.setFooter(`${client.user.tag}의 핑 상태 : 양호`)
      } else {
        rpembed.setFooter(`${client.user.tag}의 핑 상태 : 비정상`)
      }
      rpembed.setTimestamp()
      msg.edit(rpembed)
    })
  }catch(e) {
    message.channel.send(`ERROR \n\n \`\`\`js\n${e}\n\`\`\`\n\n `);
  }
  }
}