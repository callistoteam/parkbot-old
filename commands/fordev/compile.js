const Discord = require("discord.js");
const fs = require('fs');

function isJSON(json) {
    try {
        JSON.parse(json);
        return true;
    } catch (e) {
        return false;
    }
}

const owners = ["480240821623455746"];

module.exports = {
    name: "compile",
    aliases: ["cmd"],
    category: "fordev",
    description: "Compile",
    usage: "[code]",
    run: async (client, music, message, embed, youtube, args) => {
    if (owners.includes(message.author.id) === false) return message.channel.send("권한없음");
    if(args.includes("inspection")) {
        const text = '1';
        fs.writeFileSync("fixing.txt", '\ufeff' + text, {encoding: 'utf8'});
        return message.reply("```\n서비스 비허용 모드 설정. 'ableservice'로 서비스 허용 모드로 설정할 수 있습니다.\n```")
    }
    if(args.includes("ableservice")) {
        const text = '0';
        fs.writeFileSync("fixing.txt", '\ufeff' + text, {encoding: 'utf8'});
        return message.reply("```서비스 허용 모드 설정```")
    }

    let code_in = `
const Discord = require("discord.js");\nconst child = require('child_process');\nconst channel = message.channel\nconst bot = client;\n\n`+args.join(" ");
    let type;
    try {
        const result = new Promise((resolve) => resolve(eval(code_in)));
        result.then(res => {
        let code = type = res;

        if (typeof code !== 'string')
            code = require('util').inspect(code, {depth: 0});
        let embed = new Discord.MessageEmbed()
            .setAuthor('코드 실행')
            .setColor("#4267B2");
        if (code_in.length > 1000) {
            code_in = code_in.substr(0, 1000) + "\n(1000자 이상.."
        }
        if (typeof type === 'function') {
            code = type.toString();
        }
        if (code.length > 1000) {
            code = code.substr(0, 1000) + "\n(1000자 이상.."
        }
        message.channel.send(`:outbox_tray: 출력\n\`\`\`js\n${code} \n\`\`\``)
        }).catch(e => {
            let err = e.stack || e;
            if (code_in.length > 1000) {
                code_in = code_in.substr(0, 1000) + "\n(1000자 이상.."
            }
            if (err.length > 1000) {
                err = err.substr(0, 1000) + "\n(1000자 이상.."
            }
            message.channel.send(`:outbox_tray: 오류\n\`\`\`js\n${e} \n\`\`\``);
        });
    } catch (e) {
        let err = e.stack || e;
        if (code_in.length > 1000) {
            code_in = code_in.substr(0, 1000) + "\n(1000자 이상.."
        }
        if (err.length > 1000) {
            err = err.substr(0, 1000) + "\n(1000자 이상.."
        }
        message.channel.send(`:outbox_tray: 오류\n\`\`\`js\n${e} \n\`\`\``);
    }
}
}