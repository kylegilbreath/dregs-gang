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
  "https://253qv1sx4ey389p9wtpp9sj0-wpengine.netdna-ssl.com/wp-content/uploads/2019/09/Hard_Seltzer_Comp_1920x1280-700x461.jpg",
  "https://253qv1sx4ey389p9wtpp9sj0-wpengine.netdna-ssl.com/wp-content/uploads/2019/09/Bon_Viv_Credit_Candace_Hampton_1600wide.jpg",
  "https://cached.imagescaler.hbpl.co.uk/resize/scaleWidth/815/cached.offlinehbpl.hbpl.co.uk/news/ORP/whiteclaw8-15-2019-20190819070537254.jpg",
  "https://media3.s-nbcnews.com/i/newscms/2019_34/1474068/natalie-morales-spiked-seltzer-willie-geist_a6cccb22c29ad1fafb9106b0a367705b.jpg",
  "https://image.cnbcfm.com/api/v1/image/106245361-1573743748239budlightseltzer.jpeg?v=1573743755&w=678&h=381",
  "https://assets3.thrillist.com/v1/image/2821567/size/tmg-article_default_mobile_2x.jpg",
  "https://assets.rbl.ms/20553644/210x.jpg",
  "https://www.bonnaroo.com/wp-www-bonnaroo-com/wp/wp-content/uploads/2016/10/2-156005c5.jpg",
  "https://media0.giphy.com/media/VcwV9B5KCs0JsfNRn2/giphy.gif?cid=790b761197b5bd43cf2f9fc1cf0ebf329e980a5943d472b2&rid=giphy.gif",
  "https://media0.giphy.com/media/Y42RNDQsGYlzAb7G2K/giphy.gif?cid=790b76119171ca5eb681bd7ad6c0320efa984b615e5606dd&rid=giphy.gif",
  "https://media1.giphy.com/media/MCR8oAVTma7jiwshAz/200.webp?cid=790b761192b7f809b8ba674ee9bd93b2122c58bf43bf40b8&rid=200.webp",
  "https://media0.giphy.com/media/RlkHvILb2jDyP18kNz/200.webp?cid=790b761192b7f809b8ba674ee9bd93b2122c58bf43bf40b8&rid=200.webp",
  "https://s3-prod.adage.com/s3fs-public/styles/width_1024/public/6canlineup20180413.jpg",
  "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1559142110-truly-hard-seltzer-1559142094.jpg?crop=1xw:1xh;center,top&resize=480:*",
  "https://thenypost.files.wordpress.com/2019/08/spiked-seltzer-main-1a.jpg?quality=90&strip=all&w=1200",
  "https://images.agoramedia.com/everydayhealth/gcms/Is-Whiteclaw-Unhealthy-722x406.jpg?width=546",
  "https://untappd.akamaized.net/site/beer_logos_hd/beer-3344701_ae468_hd.jpeg",
  "https://icdn2.themanual.com/image/themanual/mighty-swell-v2.jpg",
  "https://images1.westword.com/imager/u/blog/11477445/dbc.hard.seltzer.jpg",
  "https://trulyhardseltzer.com//app_media/TrulyRedux/Social/LiveTrulyPanel_Summer19.file",
  "https://pbs.twimg.com/media/EFfiz1PWkAkM5z9.jpg",
  "https://images.squarespace-cdn.com/content/v1/58c1b78586e6c0616c2cbed2/1555591137063-UJFC1NT9Y24KAVENZ75C/ke17ZwdGBToddI8pDm48kHEFWEt6g4d7FcdTSvFDJS57gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0g9xiYCO_4ze-uEG5pWlE5NtjNWuFqjBEdH6rfmVTa6f_PTvzwhkr3_2kdhvhcLbow/IMG_0584+-+Copy.JPG?format=1500w"

];
console.log(random_item(items));

exports.handler = function(event, context, callback) {
  Promise.all(
    CONTACT_NUMBERS.split(';').map(num => {
      return client.messages.create({
        from: BOT_NUMBER,
        to: num,
        body: "Look at that delicious bevvy",
        mediaUrl: [random_item(items)]
      });
    })
  )
    .then(() => callback(null, { statusCode: 200, body: 'Created' }))
    .catch(e => callback(e));
};
