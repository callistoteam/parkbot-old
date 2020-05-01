const solenolyrics= require("solenolyrics"); 

module.exports = {
    name: "lyrics",
    aliases: ["가사"],
    category: "music",
    description: "가사를 불러옵니다",
    usage: "<제목>",
    run: async (client, Party, message, embed, youtube) => {
        /*try{
            const m = await message.channel.send("<a:loadingforpark:702385005590085632> 검색중입니다").then(async msg => {
                try{
                    var lyrics = await solenolyrics.requestLyricsFor(message.data.args)
                } catch {
                    return msg.edit(`<@${message.author.id}>, 한국어 검색을 지원하지 않아! 영어로 입력해줘!`)
                }
                message.author.send(`\`\`\`${lyrics.substr(0, 1993)}\`\`\``)
                msg.edit(`<@${message.author.id}>, DM을 확인해주세요`)
            })
        } catch {
            message.reply("한국어 검색을 지원하지 않아! 영어로 입력해줘!")
        }
        */
        message.reply("현재 해당 기능을 이용하실 수 없습니다.")
    }
}