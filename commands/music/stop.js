module.exports = {
    name: "stop",
    category: "music",
    aliases: ["s", "ㄴ새ㅔ"],
    description: "대기열을 초기화하고 음성채널을 나갑니다.",
    run: async (client, Party, message, embed, youtube) => {
    Party.endStream(message.guild.id, message)
    }
}