const { prefix } = require("../../config")

module.exports = {
    name: "uptime",
    category: "info",
    aliases: ["uptime", "ㅕㅔ샤ㅡㄷ", "살아있었던시간"],
    description: "봇의 업타임을 확인합니다.",
    run: async (client, Party, message, embed, youtube) => {
        message.reply(`\`${prefix}system\`으로 확인해주세요`)
    }
}