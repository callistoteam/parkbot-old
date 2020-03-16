  
module.exports = {
    name: "resume",
    category: "music",
    aliases: ["ㄱㄷ녀ㅡㄷ", "다시재생"],
    description: "일시정지 했던 곡을 다시 재생합니다.",
    run: async (client, Party, message, embed, youtube) => {
        return message.channel.send("해당 기능은 점검중 입니다.")
        Party.resumeStream(message.guild.id)
    
        embed.addField('곡을 이어서 재생합니다.', '플레중이던 노래를 다시 재생할게!')
        message.channel.send(embed)
    }
}