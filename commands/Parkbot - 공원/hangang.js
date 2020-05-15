const yoruarr = ["gIOyB9ZXn8s", "L0MK7qz13bU", "fwM-OMcE4so", "tXV7dfvSefo", "nzDO6tAB6ng", "AsXxuIdpkWM", "xRbPAVnqtcs", "8n9wklIG9qU"]
const { owner } = require("../../config")
const hangul = require('hangul-tools')
var youtubeThumbnail = require('youtube-thumbnail');
const yts = require("yt-search")
const fs = require('fs');
const { encrypt } = require("../../function")

async function play(client, Party, message, embed, youtube, watchv) {
    if(!message.member.voice.channel) {
        embed.addField('음성 채널에 들어가주세요', '먼저 음성채널에 들어가렴')
        return message.channel.send(embed)
    }

    const m = await message.channel.send("<a:loadingforpark:702385005590085632> 불러오는중").then(async msg => {
        yts(watchv, function ( err, r ) {
            if ( err ) throw err
            if(r.videos.length == 0){
                return msg.edit("다시 시도해줘!")
            } 

            else if(r.videos.length > 1){
                const article = fs.readFileSync("./log/log.log");
                lineArray = article.toString()

                const finenc = encrypt(`${message.author.id} : ${r.videos[0].url}`)
                const text = `${lineArray} \n${finenc}`
                fs.writeFileSync("./log/log.log", '\ufeff' + text, {encoding: 'utf8'})

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

module.exports = {
    name: "hangang",
    aliases: ["한강"],
    category: "Parkbot - 공원",
    description: "한강 온도 => 노래 추천",
    run: async (client, Party, message, embed, youtube) => {
        if (owner.includes(message.author.id) === false) return message.channel.send(":x: 해당 커맨드는 완성되었지만 아직 이용이 불가능합니다. 파크봇 프리미엄을 구매하시면 이용하실 수 있습니다. \n > https://www.patreon.com/yoruroong")
        require("node-fetch")("http://hangang.dkserver.wo.tc/").then(r => r.json()).then(js => {
            const dg = js.temp
            if(dg < 3) {
                return play(client, Party, message, embed, youtube, yoruarr[0])
            }
            if(dg < 4) {
                return play(client, Party, message, embed, youtube, yoruarr[1])
            }
            if(dg < 6) {
                return play(client, Party, message, embed, youtube, yoruarr[2])
            }
            if(dg < 8) {
                return play(client, Party, message, embed, youtube, yoruarr[3])
            }
            if(dg < 15) {
                return play(client, Party, message, embed, youtube, yoruarr[4])
            }
            if(dg < 17) {
                return play(client, Party, message, embed, youtube, yoruarr[5])
            }
            if(dg < 20) {
                return play(client, Party, message, embed, youtube, yoruarr[6])
            }
            if(dg < 27) {
                return play(client, Party, message, embed, youtube, yoruarr[7])
            }
            return play(client, Party, message, embed, youtube, "j2Udybhper4")
        })
    }
}