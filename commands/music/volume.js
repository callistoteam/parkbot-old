module.exports = {
    name: "volume",
    category: "music",
    aliases: ["v", "볼륨", "음량", "vol"],
    description: "현재 플레이중인 곡의 볼륨을 조절합니다! 1~100 사이 정수로 볼륨을 업데이트 할 수 있습니다!",
    usage: "볼륨",
    run: (client, Party, message, embed, youtube) => {
        if(!Party.getNP(message.guild.id)) return message.reply("재생중인 노래가 없습니다")
        if(!message.data.args) {
            embed.addField('현재 음량', '현재 볼륨은 `'+ Party.getGuild(message.guild.id).volume + '`% 야! ')
        }
        else if(Number.isInteger(Number(message.data.args)) && Number(message.data.args) <= 100 && Number(message.data.args) >= 1 && !message.data.args.startsWith(0)) {
            embed.addField("볼륨을 변경하였습니다", '현재 볼륨을 `'+message.data.args + '`% 로 업데이트했어!')
            Party.getGuild(message.guild.id).dispatcher.setVolume(Number(message.data.args)/100)
            Party.getGuild(message.guild.id).volume = Number(message.data.args)
        }
        else embed.addField('오류', "1부터 100사이의 **정수**만 입력해줘!")
        return message.channel.send(embed)
    }
}