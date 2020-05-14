const yoruarr = ["gIOyB9ZXn8s", "L0MK7qz13bU", "fwM-OMcE4so", "tXV7dfvSefo", "nzDO6tAB6ng", "AsXxuIdpkWM", "xRbPAVnqtcs", "8n9wklIG9qU"]
const { owner } = require("../../config")

module.exports = {
    name: "hangang",
    aliases: ["한강"],
    category: "park - 공원",
    description: "한강 온도 => 노래 추천",
    run: async (client, Party, message, embed, youtube) => {
        if (owner.includes(message.author.id) === false) return message.channel.send(":x: 권한없음")
        require("node-fetch")("http://hangang.dkserver.wo.tc/").then(r => r.json()).then(js => {
            const dg = js.temp
            message.reply(dg)
            if(dg < 3) {
                return message.reply(yoruarr[0])
            }
            if(dg < 4) {
                return message.reply(yoruarr[1])
            }
            if(dg < 6) {
                return message.reply(yoruarr[2])
            }
            if(dg < 8) {
                return message.reply(yoruarr[3])
            }
            if(dg < 15) {
                return message.reply(yoruarr[4])
            }
            if(dg < 17) {
                return message.reply(yoruarr[5])
            }
            if(dg < 20) {
                return message.reply(yoruarr[6])
            }
            if(dg < 27) {
                return message.reply(yoruarr[7])
            }
        })
    }
}