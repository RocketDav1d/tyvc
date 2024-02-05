import React from 'react';

import { Resend } from 'resend';

import { ApproveEmailTemplate } from '@/utils/templates/approve';
import { RejectEmailTemplate } from '@/utils/templates/reject';

const resend = new Resend(process.env.RESEND_API_KEY);

type NotificationEmailProps = {
  to: string;
  from: string;
  hostUrl: string;
  action: 'approve' | 'reject' | 'other';
  payload?: any;
};

async function sendNotificationEmail(
  props: NotificationEmailProps
): Promise<void> {
  let subject: string;

  const EmailContent = () => {
    switch (props.action) {
      case 'approve':
        return <ApproveEmailTemplate hostUrl={props.hostUrl} />;
      case 'reject':
        return <RejectEmailTemplate reason={props.payload.reason} />;
      default:
        return <div>You have a new notification from TYVC.</div>;
    }
  };

  subject = {
    approve: 'Welcome to TYVC | Your application has been approved',
    reject: 'TYVC Application Update | Your application has been rejected',
    other: 'TYVC Notification',
  }[props.action];

  const { data, error } = await resend.emails.send({
    from: props.from,
    to: props.to,
    subject: subject,
    react: EmailContent(),
  });
  if (error) {
    throw new Error(`Failed to send notification email: ${error}`);
  }

  console.log(`Notification email sent for action ${props.action}:`, data);
}

export { sendNotificationEmail };
