import nodemailer from 'nodemailer';

export default {
  sendEmailActive: async (email) => {
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'rocky139@gmail.com', // generated ethereal user
        pass: '8780337' // generated ethereal password
      }
    });

    let mailOptions = {
      from: 'noreply-dataelect',
      to: email,
      subject: 'Cuenta Activada',
      text: 'Su cuenta en la plataforma Dataelect ha sido activada'
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent');
      }
    });
  }
};
