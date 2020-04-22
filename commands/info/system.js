const { MessageEmbed } = require("discord.js")
const os = require("os")
const osName = require('os-name')

function yoruyoru(client) {
    let totalSeconds = (client.uptime / 1000);
    let days = Math.floor(totalSeconds / 86400);
    let hours = Math.floor(totalSeconds / 3600) - days*24;
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${Math.round(seconds)} seconds;`
    return uptime
}

module.exports = {
    name: "system",
    category: "info",
    aliases: ["system", "시스템", "뇬ㅅ드"],
    description: "서버의 상태를 확인합니다",
    run: async (client, Party, message, embed, youtube) => {
        var osu = require('node-os-utils')
        var cpu = osu.cpu
        const m = await message.channel.send("<a:loadingforpark:702385005590085632> 측정중...").then(async msg => {
            cpu.usage().then(cpuPercentage => {
                let realcpu=Math.round(cpuPercentage)
                const cpuIndex = Math.round(realcpu / 10)
                cpubar="■".repeat(cpuIndex) + "□".repeat(10 - cpuIndex);
                const embed = new MessageEmbed()
                .setColor("RANDOM")
                .addField("OS", osName())
                .addField("CPU NAME", osu.cpu.model())
                .addField("CPU USAGE", `${cpubar}(${cpuPercentage}%)`)
                .addField("RAM USAGE", `\`${Math.round(os.totalmem()/1000000 - os.freemem()/1000000)}MB\` / \`${Math.round(os.totalmem()/1000000)}MB\``)
                .addField("UPTIME", yoruyoru(client))
                .addField("PING", `${client.ws.ping}ms`)
                .setTitle(`SYSTEM INFO`)
                msg.edit("\✅측정완료")
                msg.edit(embed)
            })
        })
    }
}