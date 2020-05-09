module.exports = {
    name: "buymeacoffee",
    category: "그냥해보고싶었습니다><",
    aliases: ["coffee", "커피", "커피사주기"],
    description: "개발자에게 커피를 사줍니다!",
    usage: "",
    run: async (client, Party, message, embed, youtube) => {
        return message.channel.send("커피를 사주신다면.. 감사히 잘 마시고 개발하겠습니다! \nhttps://www.buymeacoffee.com/yoru")
    }
}