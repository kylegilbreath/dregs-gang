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
  "https://mondrian.mashable.com/uploads%252Fcard%252Fimage%252F247657%252Fef65f3bb443344f58a1cd2045f7b57b5.jpg%252F950x534__filters%253Aquality%252880%2529.jpg?signature=cBsgBcPBjFKetRfm-RCfM7qVBvU=&source=https%3A%2F%2Fblueprint-api-production.s3.amazonaws.com",
  "https://static.independent.co.uk/s3fs-public/thumbnails/image/2016/10/17/11/ron-swanson.jpg?w968h681",
  "https://ksassets.timeincuk.net/wp/uploads/sites/55/2016/07/2016_RonSwanson_Press_210716-1-920x610.jpg",
  "https://babylonbee.com/img/articles/article-3561-1.jpg",
  "https://cnet4.cbsistatic.com/img/IuoT6okn3OLDSKmPnUm85O9-FjE=/1200x675/2019/08/07/64092893-7317-41d2-b052-605992abf147/fullhouse3.jpg",
  "https://cnet2.cbsistatic.com/img/fSylOq8DTDC7A5xLU7HjuZDnCzY=/1092x0/2019/08/07/441690a9-4ecc-4c05-b52c-7d0afaea598a/fullhouse1.jpg",
  "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/nick-offerman-full-house-deepfake-1565210570.jpg?crop=0.491xw:0.983xh;0.509xw,0&resize=480:*",
  "https://i.etsystatic.com/9766509/r/il/97e9c6/1847154113/il_570xN.1847154113_8x3w.jpg",
  "http://swansonquotes.com/wp-content/uploads/s07-ep11-samething-1000x500.jpg",
  "https://miro.medium.com/max/2756/1*qCBb_63HD7uMLS6t03NXuQ.jpeg",
  "https://www.birchbox.com/images/uploads/how_to_grow_a_mustache_nick_offerman.jpg",
  "https://cdn.shopify.com/s/files/1/0065/7670/1509/products/ron_swanson_mona_lisa_face_picture.jpg?v=1545401707"
];
console.log(random_item(items));

exports.handler = function(event, context, callback) {
  Promise.all(
    CONTACT_NUMBERS.split(';').map(num => {
      return client.messages.create({
        from: BOT_NUMBER,
        to: num,
        body: "Believe in the stache...",
        mediaUrl: [random_item(items)]
      });
    })
  )
    .then(() => callback(null, { statusCode: 200, body: 'Created' }))
    .catch(e => callback(e));
};
