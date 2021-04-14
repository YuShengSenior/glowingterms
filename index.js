const nodemailer = require("nodemailer"); //npm发送mail包
const schedule = require("node-schedule"); //npm 定时发送包
const moment = require('moment');
const api = require("./api/api")
const KEY = require("./public/secretKey")

// 女友列表
const gfList = [
  { name: '这里是收件人的姓名,你可以替换成爱称', emailAddress: '收件人的Email地址' },
]

/**
 * 发送邮件函数
 * @param {String} text 发送的内容
 * @param {String} name 收件人名字(爱称)
 * @param {String} emailAddress 收件人地址
 */
async function sendMail(text, name, emailAddress) {
  const { honeyedWords, loveTalk, lovePoem, pyqText, wyyHot } = text
  const user = "xxxxx@xx.com"; // 自己邮箱
  const pass = "xxxxxxx"; // 自己邮箱的授权码
  let transporter = nodemailer.createTransport({
    host: "smtp.yeah.net", // 发送邮件服务器 我用的是网易的 可以换成你常用的邮箱
    port: 25, // 端口 这个端口可以去百度
    secure: false,
    auth: {
      user: user, // 用户账号
      pass: pass, //授权码,通过QQ获取
    },
  });

  let info = await transporter.sendMail({
    from: `超级无敌大暖男<${user}>`,// 发件人名字
    to: `<${emailAddress}>`,// 收件人邮箱地址
    subject: `悄悄发送给${name}小可爱的彩虹屁`, //mail主题
    // 下面的html可以自定义样式, 如果你不想整这些华丽花哨的,用下面的这个
    // text: honeyedWords,
    html: `
    <div style="padding: 8% 5%;">
    <p style="text-indent: 2em;"> ${honeyedWords}</p>
    <p style="text-indent: 2em;"> ${loveTalk} </p>
    <p style="text-indent: 2em;">${lovePoem.content}</p>
    <p style="text-indent: 2em;">
            <img src="${NetEase_Muusic_base64}"
                alt="网抑云logo">
            ${wyyHot.content} -- 《${wyyHot.source}》
        </p>
        <p style="text-indent: 2em;">
            <img
                src="${WeChat_PYQ_base64}"
                alt="朋友圈logo">
                ${pyqText.content}
                ${pyqText.source === '佚名' ? '' : '--' + pyqText.source}
        </p>
    <div style="text-align: right;">
      <span style="width: 100%; color: #f38181">爱你的老baby🥰</span>
    </div>
    `
  });
  console.log(`${moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')}————服务端已向用户${name}-<${emailAddress}>发送彩虹屁邮件♥`)
}

//自定义时间进行定时发送   例如  每天的 17:30 定时进行发送
schedule.scheduleJob({ hour: "07", minute: "30" }, function () {
  main().then(function (value) {
    let honeyedWords = value[0].data
    let loveTalk = value[1].data
    let lovePoem = value[2].data.newslist[0]
    let pyqText = value[3].data.newslist[0]
    let wyyHot = value[4].data.newslist[0]
    text = {
      honeyedWords, loveTalk, lovePoem, pyqText, wyyHot
    }
    // 这里可以发送给多人,如果你没有那么多女朋友的话,去掉这个遍历就可以
    // 多人
    gfList.forEach(i => {
      sendMail(text, i.name, i.emailAddress);
    });
    // 单人
    // sendMail(text, '收件人姓名(也可以是爱称)', '收件人邮箱地址');
  }).catch(function (error) {
    console.log(error);
  });
});

let result = {

  // 彩虹屁
  honeyedWords: function getHoneyedWords() {
    return api.getChpText()
  },
  // 情话
  loveTalk: function getLoveTalk() {
    return api.getChpText({ key: KEY.TX })
  },
  // 情诗
  lovePoem: function getLovePoem() {
    return api.getLovePoem({ key: KEY.TX })
  },
  // 朋友圈文案
  pyqText: function getPyqText() {
    return api.getPyqText({ key: KEY.TX })
  },
  // 网抑云热评
  wyyHot: function getWYYHot() {
    return api.getWYYHot({ key: KEY.TX })
  },
}

function main() {
  return Promise.all([
    result.honeyedWords(),
    result.loveTalk(),
    result.lovePoem(),
    result.pyqText(),
    result.wyyHot(),
  ])
}
