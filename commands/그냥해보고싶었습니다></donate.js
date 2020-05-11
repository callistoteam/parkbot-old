module.exports = {
    name: "donate",
    category: "그냥해보고싶었습니다><",
    aliases: ["buymeacoffee", "후원", "coffee"],
    description: "개발자에게 커피를 사줍니다!",
    usage: "",
    run: async (client, Party, message) => {
        return message.channel.send("후원 안해도 상관 없는데.. 한번쯤은 보는게 좋을거같아!\n> https://www.patreon.com/yoruroong")
    }
}