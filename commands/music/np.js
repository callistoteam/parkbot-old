module.exports = {
    name: "nowplay",
    aliases: ["np", "ㅞ", "지금"],
    category: "music",
    description: "현재 플레이중인 곡의 정보를 불러옵니다!",
    run: async (client, Party, message, embed, youtube) => {
    if(!Party.getQueue(message.guild.id)||Party.getQueue(message.guild.id).length == 0) {
        embed.addField('재생중인 노래가 없습니다', '이 서버에서 플레이중인 노래는 없어!')
        return message.channel.send(embed)
    } else{
        let np = Party.getNP(message.guild.id).info
        console.log(np)
        embed.setTitle(np.title)
        // embed.setDescription(`${sectohhmmss(Math.round(Party.getGuild(message.guild.id).dispatcher.streamingData.count * 0.2 / 10), Party.getNP(message.guild.id).info)} / ${np.timestamp}`)
        embed.addField('게시자', `[${np.author.name}](https://youtube.com${np.author.url})`)
        embed.addField('게시일', np.ago, true)
        embed.addField('조회수', np.views, true)
        embed.setThumbnail(Party.getNP(message.guild.id).thumbnail.default.url)
        return  message.channel.send(embed)
    } 
}}

/* function sectohhmmss(yeee, np) {
    var sec_num = parseInt(yeee, 10);
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    
    return np.timestamp.match(/:/gi).length == 2 ? hours+ ':' : '' + minutes + ':' + seconds
} */