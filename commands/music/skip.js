/*
module.exports = {
    name: "skip",
    category: "music",
    aliases: ["스킵", "나ㅑㅔ"],
    description: "현재 플레이중인 곡과, 대기중인 곡 번호를 이용하여 곡을 스킵/삭제 합니다.",
    run: async (client, Party, message, embed, youtube) => {
        Party.getGuild(message.guild.id).dispatcher.destroy()
        embed.addField('곡을 스킵하였습니다.', `${!message.data.args ? '현재 곡을' : `${message.data.args + '번 째로 대기 중인 곡을'}` } 스킵했어!`)
        return message.channel.send(embed)
    }
}
*/