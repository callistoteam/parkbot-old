var cheerio = require('cheerio');
var request = require('request');

module.exports = {
    name: "melonchart",
    aliases: ["멜론차트", "melonchart"],
    category: "music",
    description: "멜론차트를 불러옵니다",
    run: async (client, Party, message, embed, youtube) => {
        const m = await message.channel.send("<a:loadingforpark:702385005590085632> 잠시만 기다려주세요").then(async msg => {
            embed.setColor("RANDOM")
            embed.setTitle(`멜론차트`)
            var url = 'http://www.melon.com/chart/';
            var title = new Array(),
            artist = new Array(),
            up_date,
            up_time;
            var rank = 10;
         
            request(url, function(error, response, html){
                if (!error) {
                    var $ = cheerio.load(html);

                for (var i = 0; i < rank; i++) {
                    $('.ellipsis.rank01 > span > a').each(function(){
                    var title_info = $(this);
                    var title_info_text = title_info.text();
                    title[i] = title_info_text;
                    i++;
                    })
                }

                for (var i = 0; i < rank; i++) {
                $('.checkEllipsis').each(function(){
                    var artist_info = $(this);
                    var artist_info_text = artist_info.text();
                    artist[i] = artist_info_text;
                    i++;
                    })
                }

                $('.year').each(function(){
                    var date_info = $(this);
                    var date_info_text = date_info.text();
                    up_date = date_info_text;
                })

                $('.hhmm > span').each(function(){
                    var time_info = $(this);
                    var time_info_text = time_info.text();
                    up_time = time_info_text;
                })

                var up_date_arr = new Array();
                var up_date_arr = up_date.split('.');
                var up_time_arr = new Array();
                var up_time_arr = up_time.split(':');
                var newtime;

                if (up_time_arr[0] >12) {
                    up_time_arr[0] = up_time_arr[0] - 12
                    newtime = "오후 "+up_time_arr[0];
                } else {
                    newtime = "오전 " +up_time_arr[0];
                }

                for (var i = 1; i < rank+1; i++) {
                    embed.addField(`${i}위`, `${title[i-1]} - ${artist[i-1]}`);
                }

                embed.setFooter("("+up_date_arr[0]+"년 "+up_date_arr[1]+"월 "+up_date_arr[2]+"일 "+newtime+"시에 업데이트됨)");
                msg.edit("✅멜론차트를 불러왔습니다")
                msg.edit(embed)  
                }
            });
        })
    }
}