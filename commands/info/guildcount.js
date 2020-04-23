module.exports = {
    name: "guildcount",
    aliases: ["길드수", "혀ㅑㅣㅇ채ㅕㅜㅅ"],
    category: "info",
    description: "봇의 길드수를 확인합니다",
    run: async (client, Party, message, embed, youtube) => {
        message.reply(client.guilds.cache.size)
    }
}