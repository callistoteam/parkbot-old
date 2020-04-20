const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const lang = require("../../lang/kr")

module.exports = {
    name: "help",
    aliases: ["h", "도움말", "도움", "ㅗ디ㅔ"],
    category: "info",
    description: "도움말",
    usage: "[command name | 다른 사용법]",
    run: async (client, music, message, embed, youtube, args) => {
        if (args[0]) {
            return getCMD(client, message, args[0]);
        } else {
            return getAll(client, message);
        }
    }
}

function getAll(client, message) {
    const embed = new MessageEmbed()
        .setColor("RANDOM")
        .addField("파크봇 도움말", "이 봇을 이용하시면 [이용약관](https://callisto.team/tos)에 동의하신걸로 간주됩니다.\n봇 초대하기: [여기를 눌러 초대하기](https://is.gd/aPHvVT)")

    const commands = (category) => {
        return client.commands
            .filter(cmd => cmd.category === category)
            .map(cmd => `\`#${cmd.name}\``)
            .join("\n");
    }

    const info = client.categories
        .map(cat => stripIndents`**${cat[0].toUpperCase() + cat.slice(1)}** \n${commands(cat)}`)
        .reduce((string, category) => string + "\n" + category);

    return message.channel.send(embed.setDescription(info).setFooter(lang.commands.help.description));
}

function getCMD(client, message, input) {
    const embed = new MessageEmbed()

    const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase()));
    
    let info = `No information found for command **${input.toLowerCase()}**`;

    if (!cmd) {
        return message.channel.send(embed.setColor("RED").setDescription(info));
    }

    if (cmd.name) info = `도움말: ${cmd.name}`;
    if (cmd.aliases) info += `\n:pushpin: 다른 사용법: ${cmd.aliases.map(a => `\`${a}\``).join(", ")}`;
    if (cmd.description) info += `\n:pencil: 설명: ${cmd.description}`;
    if (cmd.docs) info += `\n:newspaper: 문서: [여기를 눌러 확인](${cmd.docs})`;
    if (cmd.usage) {
        info += `\n:bulb: 사용방법: ${cmd.usage}`;
        embed.setFooter(lang.commands.help.syntax);
    }

    return message.channel.send(embed.setColor("GREEN").setDescription(info));
}