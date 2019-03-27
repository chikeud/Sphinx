var config = require('../config/index');
var nodeMailer = require('nodemailer');
// create reusable transporter object using SMTP transport

var transporter;
exports.setupTransport = (mailConfig) => {
    transporter = nodeMailer.createTransport(mailConfig);
};

/**
 * from: mailOptions.from, // sender address.  Must be the same as authenticated user if using GMail.
 * to: mailOptions.to, // receiver
 * subject: mailOptions.subject, // subject
 * @param mailOptions
 * @returns {*}
 */
function setHeaders(mailOptions) {
    mailOptions.headers = {
        "Content-Type": "text/html"
    };

    return mailOptions;
}

// send mail with defined transport object
exports.sendMail = (mailOptions, cb) => {
    mailOptions = setHeaders(mailOptions);

    if (typeof transporter == 'undefined') {
        this.setupTransport(config.SMTP);
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            cb(error);
            console.log(error);
        } else {
            cb();
            console.log('Message sent: ' + info.response);
        }
    });
};

/**
 * Send email
 * @param subject
 * @param html
 * @param to
 * @param from
 */
exports.send = (subject, html, to, cc, bcc, from, cb) => {
    exports.sendMail({
        from: from,
        to: to,
        cc: cc,
        bcc: bcc,
        subject: subject,
        html: html
    }, cb);
};
        