require('dotenv').config();

const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  CONTACT_NUMBERS,
  BOT_NUMBER,
  BOT_MESSAGE
} = process.env;
const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

function random_item(items)
{
  return items[Math.floor(Math.random()*items.length)];    
}

var items = [
  "https://i0.wp.com/metro.co.uk/wp-content/uploads/2018/10/sec_34383367-ef73.jpg?quality=90&strip=all&zoom=1&resize=644%2C338&ssl=1",
  "https://cheesecake.articleassets.meaww.com/243631/uploads/a02a0140-e9c4-11e9-a4e5-fddddeddd5ab_800_420.png",
  "https://i.pinimg.com/originals/c6/2e/f8/c62ef89a25d1b752d9fcd6c1da69875b.jpg",
  "https://d1p0ixy3dp39l0.cloudfront.net/content/wp-content/uploads/2016/07/Cale-Victorian-bonus-page.jpg",
  "https://d1p0ixy3dp39l0.cloudfront.net/content/wp-content/uploads/2016/07/Jeff-Victorian-bonus-pages.jpg",
  "https://cdn.newsapi.com.au/image/v1/2430569768509f69217f7bfac125cf09?width=650",
  "https://gay.blog.br/50-tons-de-boy-magia/calendario-filantropico-com-bombeiros-australianos-ja-esta-a-venda/attachment/2019-hot-firefighters-www-australianfirefighterscalendar-com2027-720x960/",
  "https://gay.blog.br/50-tons-de-boy-magia/calendario-filantropico-com-bombeiros-australianos-ja-esta-a-venda/attachment/2019-hot-firefighters-www-australianfirefighterscalendar-com2023-copy-720x960/",
  "https://www.virascoop.com/wp-content/uploads/2017/10/australian-firefighters-pose-with-animals-for-charity-and-its-hotter-than-the-fires-they-extinguish-6.jpg",
  "https://i.dailymail.co.uk/i/pix/2014/12/30/2454E1FE00000578-0-image-a-31_1419957965191.jpg",
  "https://media1.popsugar-assets.com/files/thumbor/cPy8N-ckVv8WpqS6ealDHHdj6Vw/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2019/10/08/729/n/1922243/5fa9e1a93411f5dc_Australian_Firefighters_Calendar_2020_gifts_greeting_cards_christmas_presents_birthday_mothers_day_fathers_day_valentines_day_xmas_1/i/shirtless-australian-firefighters-cat-dog-animal-calendars.jpg",
  "https://media1.popsugar-assets.com/files/thumbor/YPpx08Mxs9elV-sR_IbQj-cfGE4/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2019/10/08/731/n/1922243/52f7d1ec2fdf2554_Australian_Firefighters_Calendar_2020_gifts_greeting_cards_christmas_presents_birthday_mothers_day_fathers_day_valentines_day_xmas_15_2_/i/shirtless-australian-firefighters-cat-dog-animal-calendars.jpg",
  "https://i2.wp.com/metro.co.uk/wp-content/uploads/2018/10/sei_34241768-d771.jpg?quality=90&strip=all&zoom=1&resize=644%2C858&ssl=1"
];
console.log(random_item(items));

exports.handler = function(event, context, callback) {
  Promise.all(
    CONTACT_NUMBERS.split(';').map(num => {
      return client.messages.create({
        from: BOT_NUMBER,
        to: num,
        body: "It's getting hot in herre",
        mediaUrl: [random_item(items)]
      });
    })
  )
    .then(() => callback(null, { statusCode: 200, body: 'Created' }))
    .catch(e => callback(e));
};
