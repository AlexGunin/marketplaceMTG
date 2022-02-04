const nodemailer = require('nodemailer');

async function main() {
  const smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'jinaguyfersahcoli@gmail.com',
      pass: 'elbrusbootcamp',
    },
  });
  // send mail with defined transport object
  await smtpTransport.sendMail({
    from: '"MGT shop" <jinaguyfersahcoli@gmail.com>', // sender address
    to: 'alymkulov_almambet@mail.ru', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: '<b>Hello world?</b>', // html body
  }, (error, response) => {
    if (error) {
      console.log(error);
    } else {
      console.log('aaaa');
    }
  });
}

main().catch(console.error);
