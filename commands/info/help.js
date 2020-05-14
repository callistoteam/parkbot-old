const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const config = require("../../config.js")

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
        .addField(`${config.displayname} 도움말`, "이 봇을 이용하시면 [이용약관 및 개인정보 처리방침](https://callisto.team/tos)에 동의하신걸로 간주됩니다.\n봇 초대하기: [여기를 눌러 초대하기](https://parkbot.yoru.pe.kr/)")
        .addField("더 자세한 도움말이 필요하세요?", "[여기를 눌러 확인하기](https://parkbot.yoru.pe.kr/help/)\n`#help [커맨드]`로도 확인하실 수 있습니다.")

    const commands = (category) => {
        return client.commands
            .filter(cmd => cmd.category === category)
            .map(cmd => `\`${config.prefix}${cmd.name}\``)
            .join("\n");
    }

    const info = client.categories
        .map(cat => stripIndents`**${cat[0].toUpperCase() + cat.slice(1)}** \n${commands(cat)}`)
        .reduce((string, category) => string + "\n" + category);

    return message.channel.send(embed.setDescription(info));
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
        embed.setFooter("Syntax: <> = 꼭 필요함, [] = 옵션");
    }

    return message.channel.send(embed.setColor("GREEN").setDescription(info));
}