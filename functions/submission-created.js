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
  "https://i.chzbgr.com/full/7340101376/h69E2EF3F/too-easy",
  "https://66.media.tumblr.com/5a1f41add6a51bac796ba0e44e016919/tumblr_pt3o2jE8z01qjrmjb_400.jpg",
  "https://pics.awwmemes.com/he-didnt-even-slap-the-bag-imao-at-a-tailgate-37784843.png",
  "https://i.pinimg.com/originals/c2/10/92/c210927064764b9c61ae960f247fc94a.jpg",
  "https://1.bp.blogspot.com/-oDQAfgnhytU/TazRwNylHLI/AAAAAAAAAII/5XNegUU-sZA/s1600/franzia+2.jpg",
  "https://i.chzbgr.com/original/7047588608/hD440ADE1/not-even-once-wine-franzia-7047588608",
  "https://cdn.totalfratmove.com/wp-content/uploads/2013/09/78805a221a988e79ef3f42d7c5bfd418620883367-600x800.jpg",
  "https://dailybruin.com/images/2016/11/web.blogging.slapbag-640x426.jpg",
  "http://m.quickmeme.com/img/0b/0b444c4e037cff189f53b28ba6698bef8002d2af53d4b412a371ef41d0a80abb.jpg",
  "https://pics.me.me/death-to-zinfandels-franzia-dont-act-like-this-isnt-funny-13919566.png",
  "https://i5.walmartimages.com/asr/d560fc9c-8c77-49a2-9c1f-33cfe668884b_1.c3a00bf36cc92c480d6b94ff09ce350e.jpeg",
  "https://cdn2.bigcommerce.com/server5500/tpbc2s65/products/7030/images/10120/franzia-chardonnay__33767.1532452103.1280.1280.jpg?c=2",
  "https://bremerswineandliquor.com/wp-content/uploads/2019/05/franzia-rich-and-buttery-5l.png",
  "https://scontent.harristeeter.com/legacy/productimagesroot/DJ/4/61724.jpg",
  "https://icdn.bottlenose.wine/images/full/501834.png",
  "https://www.peoriabeerwinespirits.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/M/-/M-1164415.jpg",
  "https://target.scene7.com/is/image/Target/GUEST_2dbe1341-776e-4677-b392-ea42bc427709?wid=488&hei=488&fmt=pjpeg",
  "https://cdn2.bigcommerce.com/server5500/tpbc2s65/products/7029/images/10119/franzia-cabernet-sauvignon__01767.1532451847.380.500.jpg?c=2",
  "https://www.totalwine.com/dynamic/490x/media/sys_master/twmmedia/h3d/h0c/12074159276062.png"

];
console.log(random_item(items));

exports.handler = function(event, context, callback) {
  Promise.all(
    CONTACT_NUMBERS.split(';').map(num => {
      return client.messages.create({
        from: BOT_NUMBER,
        to: num,
        body: "It's wine time...",
        mediaUrl: [random_item(items)]
      });
    })
  )
    .then(() => callback(null, { statusCode: 200, body: 'Created' }))
    .catch(e => callback(e));
};
