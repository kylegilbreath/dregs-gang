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
  "https://i.pinimg.com/736x/3c/f7/9c/3cf79cd78bb2e87538b793245f88c6ba.jpg",
  "https://i.redd.it/cwxogh8lz8s01.jpg",
  "https://mycotopia.net/uploads/monthly_01_2008/post-13626-13818573074.jpg",
  "http://www.naturefoto2000.com/image/Phallus%20impudicus%20IMG_0021xnM.jpg",
  "https://static.fjcdn.com/pictures/Mushroom_73dc01_5423255.jpg",
  "https://i.imgur.com/ajHd330.jpg",
  "https://i.imgur.com/R1AOUyE.jpg",
  "https://freerangestock.com/sample/81509/penis-mushroom-and-mulch.jpg"
];
console.log(random_item(items));

exports.handler = function(event, context, callback) {
  Promise.all(
    CONTACT_NUMBERS.split(';').map(num => {
      return client.messages.create({
        from: BOT_NUMBER,
        to: num,
        body: "Keep your head up, buddy!",
        mediaUrl: [random_item(items)]
      });
    })
  )
    .then(() => callback(null, { statusCode: 200, body: 'Created' }))
    .catch(e => callback(e));
};
