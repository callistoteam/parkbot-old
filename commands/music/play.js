const hangul = require('hangul-tools')
const Discord = require('discord.js')
const lang = require('../../lang/kr')
var youtubeThumbnail = require('youtube-thumbnail');
  
module.exports = {
    name: "play",
    aliases: ["p", "ㅔㅣ묘", "재생"],
    category: "music",
    description: "노래를 재생목록에 추가합니다. 유튜브 URL과 검색어를 지원합니다.",
    docs: "[여기를 눌러 확인](https://yoru.pe.kr/parkbot/docs/play)",
    run:async (client, Party, message, embed, youtube) => {
        if(!message.member.voice.channel) {
            embed.addField('음성 채널에 들어가주세요', '먼저 음성채널에 들어가렴')
            return message.channel.send(embed)
    
        }    
        if(!message.data.args) return message.reply('검색 내용을 입력해줘!')
        await youtube(message.data.args, function(err,r){
            if(r.videos.length == 0) {
                embed.addField(lang.commands.play.ns1, lang.commands.play.ns2)
                return message.channel.send(embed)
            }
            else if(r.videos.length > 1){
                var txt = ''
                for(i = 1; i < 6; i++){
                    if(!r.videos[i-1]) return
                    txt += `**#${i}** - ${r.videos[i-1].title}\n`
                }
                    Party.addQueue(message.guild.id, r.videos[0].url, message, r.videos[0], youtubeThumbnail('https://youtube.com' + r.videos[0].url))
                    info = r.videos[0].title
                    e = new Discord.MessageEmbed()
                    .addField('노래를 대기열에 추가했습니다.', `\`${info}\`${hangul.josa(info, '이가')} 재생목록에 대기시켰어! ${Party.getQueue(message.guild.id).length == 1 ? '바로 재생할게!' : '신청곡 앞에 ' + Number(Party.getQueue(message.guild.id).length - 2) + ' 개의 노래가 대기열 대기하고 있어! 좀만 기다려주라구!'}`)
                    .setColor(require('../../config').color)
                    message.channel.send(e)
                    if(Party.getGuild(message.guild.id).playing === false) {
                        Party.startStream(message.guild.id)
                        }
            }
            else {  
            Party.addQueue(message.guild.id, message.data.args, message, r.videos[0], youtubeThumbnail(message.data.args))
            info = r.videos[0].title
            embed.addField('노래를 대기열에 추가했습니다.', `\`${info}\`${hangul.josa(info, '이가')} 재생목록에 대기시켰어! ${Party.getQueue(message.guild.id).length == 1 ? '바로 재생할게!' : '신청곡 앞에 ' + Number(Party.getQueue(message.guild.id).length - 2) + ' 개의 노래가 대기열 대기하고 있어! 좀만 기다려주라구!'}`)
            message.channel.send(embed)
            if(Party.getGuild(message.guild.id).playing === false) {
                Party.startStream(message.guild.id)
                }
            }
            
        })
    
        
    }
}