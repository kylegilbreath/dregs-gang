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
  "https://i.pinimg.com/originals/9f/db/95/9fdb95b3fed625d71804e078df5c928b.jpg",
  "https://i.pinimg.com/originals/da/d4/f7/dad4f7887eaa36ab6f73682a9b491f67.jpg",
  "https://www.usmagazine.com/wp-content/uploads/1400587628_terry-crews-jimmy-fallon-shirtless-350.jpg?w=350&h=441&crop=1",
  "https://i.pinimg.com/originals/ec/02/1a/ec021a2d9c4968f8ab783fe55c4645ac.jpg",
  "https://i.imgur.com/Ti28XbK.jpg",
  "https://images-na.ssl-images-amazon.com/images/I/51qtCwdB9bL.jpg",
  "https://i.dailymail.co.uk/i/pix/2013/10/18/article-0-04C087450000044D-249_634x604.jpg",
  "https://i.pinimg.com/originals/88/e6/1e/88e61ecb1998d46f8c42dedaa30804ec.jpg",
  "https://i.pinimg.com/736x/68/e2/c9/68e2c91e564b007fac3b786f3469685f.jpg",
  "https://media.istockphoto.com/photos/big-man-little-hat-large-tummy-picture-id154202282?k=6&m=154202282&s=612x612&w=0&h=8qLqdlbqXhydNUMub5cb8Zm7VQERkDRdSb1HJ-fpZ_M=",
  "https://www.usmagazine.com/wp-content/uploads/2019/02/adam-levine-bro-tattoo.jpg",
  "https://i.pinimg.com/564x/ae/39/b8/ae39b89e3da0e9645560a18081b4ca91.jpg",
  "https://broscience.com/wp-content/uploads/2015/02/409268_10152215844025105_1405678018_n1.jpg",
  "https://cdn1.i-scmp.com/sites/default/files/styles/1200x800/public/images/methode/2018/07/16/a6e48a02-889d-11e8-8608-b7163509a377_1280x720_113228.jpg?itok=X_PusDnK",
  "https://giantbomb1.cbsistatic.com/uploads/scale_medium/0/6745/326537-markymk4i1722335.jpg"
];
console.log(random_item(items));

exports.handler = function(event, context, callback) {
  Promise.all(
    CONTACT_NUMBERS.split(';').map(num => {
      return client.messages.create({
        from: BOT_NUMBER,
        to: num,
        body: "Enjoy this bare chested beaut...",
        mediaUrl: [random_item(items)]
      });
    })
  )
    .then(() => callback(null, { statusCode: 200, body: 'Created' }))
    .catch(e => callback(e));
};
