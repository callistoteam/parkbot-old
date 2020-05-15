module.exports = {
    name: "queue",
    category: "music",
    aliases: ["큐", "q", "벼뎓"],
    description: "플레이중인 노래와 대기열을 불러옵니다!",
    usage: "[페이지]",
    run: async (client, Party, message, embed) => {
        if(!Party.getQueue(message.guild.id)||Party.getQueue(message.guild.id).length == 0) {
            embed.addField('재생중인 노래가 없습니다', '이 서버에서 플레이중인 노래는 없어!')
            return message.channel.send(embed)
        }
        else {
            let queue = Party.getQueue(message.guild.id)
            let arg = message.data.args
            let start = message.data.args && Number.isInteger(Number(message.data.args)) ? (Number(message.data.arg)-1) * 10 : 0
            let end = start + 10 
            if(queue.length < start) {
                embed.addField('존재하지 않는 페이지입니다', '저런, 그 페이지는 없다구!')
                return message.channel.send(embed)
            }
            for(i = start; i < end; i++){
            if(queue[i]) embed.addField(Number(i) == 0 ? '지금 재생중 : '+queue[i].info.title : '#'+Number(i) + ' '+queue[i].info.title, '신청자 : ' + `<@${queue[i].author}>`)
            }
            embed.setFooter(`총 ${queue.length - 1} 곡 대기중 - ${arg ? arg : '1'}/${(end / 10).toString()} 페이지`)
        
            return  message.channel.send(embed)
        }
   
    }
}
