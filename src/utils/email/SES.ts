import AWS from 'aws-sdk';
import nodemailer from 'nodemailer';

AWS.config.update({
  region: process.env.AWS_PROJ_TYVC_SES_REGION,
  accessKeyId: process.env.AWS_PROJ_TYVC_SES_USER_ACCESS_KEY,
  secretAccessKey: process.env.AWS_PROJ_TYVC_SES_USER_SECRET_KEY,
});

const mailer = nodemailer.createTransport({
  SES: new AWS.SES(),
});

type SESSenderProps = {
  from: string;
  to: string;
  subject: string;
  html: string;
};

function sendEmail(props: SESSenderProps): Promise<any> {
  return new Promise<any>(async (res) => {
    const info = await mailer.sendMail({
      from: props.from,
      to: props.to,
      subject: props.subject,
      html: props.html,
    });

    res(info);
  });
}

export { sendEmail };
