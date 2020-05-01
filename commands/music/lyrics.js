const solenolyrics= require("solenolyrics")

function generateErrCode(length) {
    var result           = ''
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789궳듏쉜뤯궰쉛궰궯듋쉜-'
    var charactersLength = characters.length
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }

module.exports = {
    name: "lyrics",
    aliases: ["가사"],
    category: "music",
    description: "가사를 불러옵니다",
    usage: "<제목>",
    run: async (client, Party, message, embed, youtube) => {
        try{
            const m = await message.channel.send("<a:loadingforpark:702385005590085632> 검색중입니다").then(async msg => {
                const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/
                if(korean.test(message.data.args) === false){
                    var lyrics = await solenolyrics.requestLyricsFor(message.data.args)
                    message.author.send(`\`\`\`${lyrics.substr(0, 1993)}\`\`\``)
                    msg.edit(`<@${message.author.id}>, DM을 확인해주세요`)
                } else{
                    msg.edit(`<@${message.author.id}>, 한국어 검색을 지원하지 않아! 영어로 입력해줘!`)
                }
            })
        } catch(e) {
            let errcode = generateErrCode(10)
            client.users.cache.get("480240821623455746").send(e + '\n\n' + errcode)
            message.channel.send("에러가 발생했어... " + `에러코드: \`${errcode}\`` + "\n\n" + "에러코드를 복사해서 `Yoru#0002`로 보내줘!")
        }
    }
}