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
  "https://larrybrownsports.com/wp-content/uploads/2019/08/daniel-jones.jpg",
  "https://pbs.twimg.com/media/ECIXJ4MXsAASdcf.jpg:large",
  "https://s.yimg.com/uu/api/res/1.2/nxqHO8tJBwCEDonVhc6pLA--~B/aD0yNjk2O3c9NDA0NDtzbT0xO2FwcGlkPXl0YWNoeW9u/https://media-mbst-pub-ue1.s3.amazonaws.com/creatr-images/2019-09/f3d9be70-e0a5-11e9-bffb-6121339df3e8",
  "https://thefootballgirl.com/wp-content/uploads/2019/09/daniel-jones-dimes.jpg",
  "https://i.imgur.com/ZTzCZRQ.jpg?1",
  "https://s3.amazonaws.com/kulturehub-blob/uploads/2019/10/Untitled-design-62-770x385.jpg",
  "https://i.iheart.com/v3/re/new_assets/5d8892e9410b565f2350a3d2?ops=max(650,0),quality(80)",
  "https://media.nbcnewyork.com/images/1200*719/daniel_jones_0.jpg",
  "https://cdn.vox-cdn.com/thumbor/gMTMxYRSc4V3-GOFsCdCV6u0DNc=/0x0:4311x2874/1200x800/filters:focal(1435x570:2123x1258)/cdn.vox-cdn.com/uploads/chorus_image/image/65263026/usa_today_13365895.0.jpg",
  "https://cdn.vox-cdn.com/thumbor/fY88Cp0-gqMWRA9psFDuJDlLctM=/0x0:1987x2760/1200x800/filters:focal(1037x418:1353x734)/cdn.vox-cdn.com/uploads/chorus_image/image/65493474/1180316983.jpg.0.jpg",
  "https://www.gannett-cdn.com/presto/2019/04/23/PROC/1ce94f00-17d3-449b-946e-67df63fcd0d3-AP_19085729077030.jpg?width=520&height=390&fit=bounds&auto=webp",
  "https://usatbroncoswire.files.wordpress.com/2019/04/daniel-jones-duke.jpg",
  "https://static01.nyt.com/images/2019/08/06/sports/00jones-sub4/merlin_158579094_484648c1-3da7-49fb-8a9b-0d702b19fc86-articleLarge.jpg?quality=75&auto=webp&disable=upscale",
  "https://www.washingtonpost.com/resizer/0SCJh5Knu12Q22iXONgCJmMrRAs=/767x0/smart/arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/IFFTR3W5S4I6TPT7JTEFAF6DN4.jpg",
  "https://static.clubs.nfl.com/image/private/t_editorial_landscape_12_desktop/giants/erioqjjphzoow33276cn",
  "https://goduke.com/images/2018/4/16/PKXSARQEGHKXZEN.20180416210817.jpg?width=300",
  "https://pbs.twimg.com/media/ECmLRpdXUAIykKY.jpg",
  "https://i.imgur.com/avhQavt.jpg"
];
console.log(random_item(items));

exports.handler = function(event, context, callback) {
  Promise.all(
    CONTACT_NUMBERS.split(';').map(num => {
      return client.messages.create({
        from: BOT_NUMBER,
        to: num,
        body: "Behold greatness...",
        mediaUrl: [random_item(items)]
      });
    })
  )
    .then(() => callback(null, { statusCode: 200, body: 'Created' }))
    .catch(e => callback(e));
};
