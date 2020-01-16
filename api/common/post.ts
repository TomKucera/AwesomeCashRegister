//import nodemailer from 'nodemailer';
var nodemailer = require('nodemailer');
/*
Update: (data: Customer): Promise<Customer> => {
    return new Promise<Customer>((resolve, reject) => {
        dataSet.edit(data).then((row) => {
            resolve(row);
        });
    });
},
*/

export const send = (subject: string, text: string): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
        var mailOptions = {
            from: 'om.kucera34@gmail.com',
            to: 'tom.kucera@centrum.cz',
            subject: subject,
            text: text
        };

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'tom.kucera34@gmail.com',
                pass: 'ToKu3402'
            }
        });

        transporter.sendMail(mailOptions, function (error: any, info: any) {
            if (error) {
                console.log(error);
                reject();
            } else {
                console.log('Email sent: ' + info.response);
                resolve();
            }
        });
    });
};


