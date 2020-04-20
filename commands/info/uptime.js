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
    name: "uptime",
    category: "info",
    aliases: ["uptime", "ㅕㅔ샤ㅡㄷ"],
    description: "봇의 업타임을 확인합니다.",
    run: async (client, Party, message, embed, youtube) => {
    message.reply(yoruyoru(client))
    }
}