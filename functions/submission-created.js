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
  "https://pbs.twimg.com/media/CD5v-S1UkAAGYnt.png",
  "https://i.imgur.com/cExTcDR.jpg",
  "https://cdn.ebaumsworld.com/mediaFiles/picture/2183782/84689433.jpg",
  "https://media.virascoop.com/images/2017/09/29093803/defintely-not-a-penis.jpg",
  "https://cdn.mpasho.co.ke/wp-content/uploads/2018/01/maxresdefault-4.jpg",
  "http://uk.cc.uat-sites.vimn.com/sites/default/files/styles/image-w-520-h-520-scale/public/cc_uk/galleries/large/2016/03/23/dick-insta-2.jpg?itok=dWeaj8mc",
  "https://nexter.org/wp-content/uploads/2018/05/funny-animals-pics4.jpg",
  "https://i.pinimg.com/originals/85/f0/58/85f058813dfe428e32eee96532db0486.jpg",
  "https://cdn.ebaumsworld.com/mediaFiles/picture/2369109/84679930.jpg",
  "https://preview.redd.it/oezr0gqr09f01.jpg?width=540&s=03b33f6d4ebfb869d2248f730ad5a47e8c22df1d",
  "https://pbs.twimg.com/media/A94SisfCAAAlWfI.jpg",
  "https://i.redd.it/3ka0v7358lb11.jpg",
  "https://hips.hearstapps.com/del.h-cdn.co/assets/15/49/1449248014-67dbz29l.jpg?crop=1xw:1.0xh;center,top&resize=480:*",
  "https://media.pri.org/s3fs-public/styles/story_main/public/passion_fruit.jpg?itok=AR0rlzJT",
  "https://i.pinimg.com/originals/00/91/03/00910359b2c51cbcf301783006ef506c.jpg"
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
