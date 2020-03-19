const ytdl = require('ytdl-core')
const Handles = new Map()
const yt = require('simple-youtube-api')
const youtube = require('yt-search')
const sf = require('snekfetch')
const Discord = require('discord.js')
const lang = require("./lang/kr")

process.on('unhandledRejection', function (err) {
    console.log(err)
});

module.exports.create = (identificate, voiceChannel, message) => {
    if (!Handles.get(identificate)) {
        Handles.set(identificate, {
            voiceChannel: voiceChannel,
            queue: [],
            volume: 50,
            channel: message.channel,
            playing: false,
            dispatcher: false
        })
    }

}
module.exports.start = (identificate) => {
    if (!Handles.get(identificate).playing) return this.startStream(identificate)
}

module.exports.next = (identificate) => {
    this.getGuild(identificate).queue.shift();

    if (this.getQueue(identificate)[0]) {
        console.log('a')
        if (Handles.get(identificate).voiceChannel.members.filter(m => !m.user.bot).size == 0) {
            let embed = new Discord.MessageEmbed()
                .setColor(require('./config').color)
                .addField(lang.music.npeopleinchannel1, lang.music.npeopleinchannel2)
            getGuild(identificate).channel.send(embed)
            Handles.remove(identificate)
        } else if(Handles.get(identificate).voiceChannel.members.filter(m => !m.user.bot).size != 0){
        Handles.get(identificate).playing = false

        this.startStream(identificate)
        }
    } 
    
    else{
        console.log('?')
        this.endStream(identificate)
    }
}

module.exports.getNP = getNP

function getNP(identificate) {
    const latest = Handles.get(identificate).queue[0]

    return latest
}

module.exports.getQueue = (identificate) => {
    const latest = Handles.get(identificate)

    if (latest) {
        return latest.queue
    } else {
        return false
    }
}

module.exports.getGuild = (identificate) => {
    return Handles.get(identificate)
}

function getGuild(identificate) {
    return Handles.get(identificate)
}

module.exports.addQueue = async (identificate, videoURL, message, info, thumb) => {
    let q = {
        url: videoURL,
        author: message.author,
        vote: 0,
        time: new Date(),
        info: info,
        thumbnail : thumb
    }
    Handles.get(identificate).queue.push(q)
}

module.exports.removeQueue = (identificate, index) => {
    if(index == 0) {
        this.next(identificate)
    }
    else Handles.get(identificate).queue.splice(index, 1)

}

module.exports.resetQueue = (identificate) => {
    Handles.get(identificate).queue.splice(0, Handles.get(identificate).queue.length)
    this.endStream(identificate)
}

module.exports.startStream = (identificate) => {
    if (Handles.get(identificate).playing) return

    const stream = ytdl(this.getNP(identificate).url, {
        quality: 'highest',
        filter: 'audioonly'
    })
        .on('error', error => {
            console.log(error)
        })
        
    let dispatcher
    Handles.get(identificate).voiceChannel.join().then(connection => {
        dispatcher = connection.play(stream, { bitrate: 96 })
    })
    Handles.get(identificate).dispatcher = dispatcher
    console.log(Handles.get(identificate))
    Handles.get(identificate).playing = true

    dispatcher.setVolume(this.getGuild(identificate).volume / 100)

    dispatcher.on('end', () => {
        if(!Handles.get(identificate)) return
        Handles.get(identificate).playing = false
        this.next(identificate)
    })
    dispatcher.on('start', () => { 
      
        let info = getNP(identificate).info.title
        embed = new Discord.MessageEmbed()
        embed.setColor(require('./config').color)
        embed.addField('음악을 재생합니다!', random(require('./config').playmsg).replace('%song%', '`'+info+'`'))
        embed.setFooter('신청자 : ' + getNP(identificate).author.tag, getNP(identificate).author.avatarURL)
        getGuild(identificate).channel.send(embed)

    })
}
module.exports.endStream = (identificate, message) => {
    Handles.get(identificate).voiceChannel.leave()
    let embed = new Discord.MessageEmbed()
        .setColor(require('./config').color)
        .addField('재생목록이 종료되었습니다.', '더이상 플레이할 노래가 없어, 대기열을 초기화됬어! 그럼 난 이만👋')
    if(!message) {
        Handles.get(identificate).channel.send(embed)
    }
    else if(message){
        message.channel.send(embed)
    }
    Handles.delete(identificate)
}

module.exports.pauseStream = (identificate) => {
    Handles.get(identificate).voiceChannel.connection.dispatcher.pause()
}

module.exports.resumeStream = (identificate) => {
    Handles.get(identificate).voiceChannel.connection.dispatcher.resume()
}

module.exports.changeStatus = (identificate, status) => {
    Handles.get(identificate).playing = status
}
function random(items) {
    return items[Math.floor(Math.random() * items.length)];
}