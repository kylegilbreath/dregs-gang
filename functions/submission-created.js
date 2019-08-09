require('dotenv').config();

const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  CONTACT_NUMBERS,
  BOT_NUMBER,
  BOT_MESSAGE
} = process.env;
const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

var myArray = [
  "'https://demo.twilio.com/owl.png'",
  "'https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg'"
];

var randomPic = myArray[Math.floor(Math.random()*myArray.length)];

exports.handler = function(event, context, callback) {
  Promise.all(
    CONTACT_NUMBERS.split(';').map(num => {
      return client.messages.create({
        from: BOT_NUMBER,
        to: num,
        body: "test",
        mediaUrl: [randomPic]
        // mediaUrl: ['https://demo.twilio.com/owl.png']
      });
    })
  )
    .then(() => callback(null, { statusCode: 200, body: 'Created' }))
    .catch(e => callback(e));
};
