var Mailgun = require('mailgun-js');

//Your api key, from Mailgun’s Control Panel
const api_key = process.env.MAILGUN_API_KEY;

//Your domain, from the Mailgun Control Panel
const domain = process.env.EMAIL_DOMAIN;

//Your sending email address
const from_who = process.env.FROM_EMAIL;

//Your destination email address
const to_who = process.env.TO_EMAIL;

const email = (body, time) => {
    const mailgun = new Mailgun({apiKey: api_key, domain: domain});
    let subject = `EPL Schedule - ${time}`;    
    const data = {
        from: from_who,
        to: to_who,
        subject: subject,
        text: body
    }
    mailgun.messages().send(data, function (err, body) {
        if (err) {
            console.log("Got an error: ", err);
        }
        else {
            console.log('Sent email to recipient!');
        }
    });   
}

module.exports = {
    email,
}