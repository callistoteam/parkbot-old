const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "help",
    aliases: ["h"],
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

    const commands = (category) => {
        return client.commands
            .filter(cmd => cmd.category === category)
            .map(cmd => `- \`${cmd.name}\``)
            .join("\n");
    }

    const info = client.categories
        .map(cat => stripIndents`**${cat[0].toUpperCase() + cat.slice(1)}** \n${commands(cat)}`)
        .reduce((string, category) => string + "\n" + category);

    return message.channel.send(embed.setDescription(info).setFooter('`#help [커맨드이름]`으로 설명을 확인하세요'));
}

function getCMD(client, message, input) {
    const embed = new RichEmbed()

    const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase()));
    
    let info = `No information found for command **${input.toLowerCase()}**`;

    if (!cmd) {
        return message.channel.send(embed.setColor("RED").setDescription(info));
    }

    if (cmd.name) info = `도움말: ${cmd.name}`;
    if (cmd.aliases) info += `\n:pushpin: 다른 사용법: ${cmd.aliases.map(a => `\`${a}\``).join(", ")}`;
    if (cmd.description) info += `\n:pencil: 설명: ${cmd.description}`;
    if (cmd.usage) {
        info += `\n:bulb: 사용방법: ${cmd.usage}`;
        embed.setFooter(`Syntax: <> = 꼭 필요함, [] = 옵션`);
    }

    return message.channel.send(embed.setColor("GREEN").setDescription(info));
}