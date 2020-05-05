const hangul = require('hangul-tools')
var youtubeThumbnail = require('youtube-thumbnail');
const yts = require("yt-search")
const fs = require('fs');
  
module.exports = {
    name: "play",
    aliases: ["p", "ㅔㅣ묘", "재생"],
    category: "music",
    description: "노래를 재생목록에 추가합니다. 유튜브 URL과 검색어를 지원합니다.",
    usage: "<곡명>",
    run:async (client, Party, message, embed, youtube) => {
        if(!message.member.voice.channel) {
            embed.addField('음성 채널에 들어가주세요', '먼저 음성채널에 들어가렴')
            return message.channel.send(embed)
        }

        const m = await message.channel.send("<a:loadingforpark:702385005590085632> 검색중입니다").then(async msg => {
            if(!message.data.args) return msg.edit('검색 내용을 입력해줘!')

            /* if(message.data.args.indexOf("youtube.com/watch?v=") != -1) {
                // 시간날때 개발 예정
            } */

            yts( message.data.args, function ( err, r ) {
                if ( err ) throw err
                if(r.videos.length == 0){
                    return msg.edit("검색 결과가 없습니다.")
                } 

                else if(r.videos.length > 1){
                    const article = fs.readFileSync("./log/log.log");
                    lineArray = article.toString()

                    const text = `${lineArray} \n${message.author.id} : ${r.videos[0].url}`;
                    fs.writeFileSync("./log/log.log", '\ufeff' + text, {encoding: 'utf8'});

                    Party.addQueue(message.guild.id, r.videos[0].url, message, r.videos[0], youtubeThumbnail('https://youtube.com' + r.videos[0].url))
		            info = r.videos[0].title
                    msg.edit(`:musical_note: \`${info}\`${hangul.josa(info, '을를')} 재생목록에 대기시켰어! ${Party.getQueue(message.guild.id).length == 1 ? '바로 재생할게!' : '신청곡 앞에 ' + Number(Party.getQueue(message.guild.id).length - 2) + ' 개의 노래가 대기열 대기하고 있어! 좀만 기다려주라구!'}`)
                    if(Party.getGuild(message.guild.id).playing === false) {
                        Party.startStream(message.guild.id)
                    }
                } else {  
                    Party.addQueue(message.guild.id, message.data.args, message, r.videos[0], youtubeThumbnail(message.data.args))
                    info = r.videos[0].title
                    embed.addField('노래를 대기열에 추가했습니다.', `\`${info}\`${hangul.josa(info, '을를')} 재생목록에 대기시켰어! ${Party.getQueue(message.guild.id).length == 1 ? '바로 재생할게!' : '신청곡 앞에 ' + Number(Party.getQueue(message.guild.id).length - 2) + ' 개의 노래가 대기열 대기하고 있어! 좀만 기다려주라구!'}`)
                    msg.edit(embed)
                    if(Party.getGuild(message.guild.id).playing === false) {
                        Party.startStream(message.guild.id)
                    }
                } 
            })
        })
    }
}