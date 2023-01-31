const accountSid = 'AC1535720077868d2d6b96447d3b9f57b8';
const authToken = '5eeb5d63c203ec6cb3187487d06b16fb';
const client = require('twilio')(accountSid, authToken);

export default {
  validationSms: (number) => {
    const userNumber = `+57${number}`;
    client.messages
      .create({
        body: 'Su cuenta en Dataelect ha sido activada',
        messagingServiceSid: 'MGaf637253ef0e35e640983953ab33e85f',
        to: userNumber
      })
      .then((message) => console.log(message.sid))
      .catch((error) => {
        return error;
      })
      .done();
  }
};
