const child = require("child_process")

const owners = require("../../config").owner

module.exports = {
    name: "exec",
    aliases: ["exec"],
    category: "fordev",
    description: "exec",
    usage: "<code>",
    run: async (client, music, message) => {
        if (owners.includes(message.author.id) === false) return message.channel.send(":x: 권한없음")

        try{
            const a = child.execSync(message.data.args)
            message.channel.send(`\`\`\`${a}\`\`\``)
        } catch(e){
            message.channel.send(`\`\`\`${e}\`\`\``)
        }
    }
}