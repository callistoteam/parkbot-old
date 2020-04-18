  module.exports = {
    name: "pause",
    aliases: ["ㅔ면ㄷ", "일시정지", "ps"],
    category: "music",
    description: "현재 곡을 일시정지합니다.",
    run: async (client, Party, message, embed, youtube) => {
    Party.pauseStream(message.guild.id)
    embed.addField('곡을 일시정지했습니다.', '지금 플레이 하던 곡을 잠깐 멈췄어! `#resume`으로 다시 플레이 해봐!')
    message.channel.send(embed)
    }}