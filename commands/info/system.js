const osName = require('os-name')
const child = require("child_process")
const fs = require("fs")

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

function hostMem() {
    let result = {}
    let data = child.execSync("free -h").toString().split(" ").filter(z => z !== "").reverse().slice(4).reverse()

    result[data[0]] = data[6].replace(",", ".")
    result[data[1]] = data[7].replace(",", ".")

    return result
}

function getLogfileSize() {
    var stats = fs.statSync("./log/log.log")
    var fileSizeInBytes = stats["size"]
    return fileSizeInBytes / 1000 + "KB"
}

/* function getCPUtemp() {
    let temp = child.execSync("cat /sys/class/thermal/thermal_zone0/temp").toString() / 1000
    return temp
} */

module.exports = {
    name: "상태",
    category: "info",
    aliases: ["state", "status"],
    description: "파크봇의 상태를 확인합니다",
    run: async (client, Party, message, embed, youtube) => {
        var osu = require('node-os-utils')
        var cpu = osu.cpu
        const m = await message.channel.send("<a:loadingforpark:702385005590085632> 측정중...").then(async msg => {
            cpu.usage().then(cpuPercentage => {
                let realcpu=Math.round(cpuPercentage)
                const cpuIndex = Math.round(realcpu / 10)
                cpubar="■".repeat(cpuIndex) + "□".repeat(10 - cpuIndex);
                embed.setColor("RANDOM")
                embed.addField("OS", osName())
                embed.addField("CPU NAME", osu.cpu.model())
                embed.addField("CPU USAGE", `${cpubar}(${cpuPercentage}%)`)
                // embed.addField("CPU TEMP", `${getCPUtemp()}°C`)
                embed.addField("RAM USAGE", `${hostMem().used} / ${hostMem().total}`)
                embed.addField("LOG FILE SIZE", getLogfileSize())
                embed.addField("UPTIME", yoruyoru(client))
                embed.addField("PING", `${Math.round(client.ws.ping)}ms`)
                embed.setTitle("파크봇 상태")
                msg.edit("✅측정완료")
                msg.edit(embed)
            })
        })
    }
}