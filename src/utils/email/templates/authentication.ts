import { Resend } from 'resend';

import { loadAuthenticationTemplate } from '@/utils/templates/authentication';

const resend = new Resend(process.env.RESEND_API_KEY);

type AuthenticationEmailProps = {
  to: string;
  from: string;
  url: string;
};

function sendAuthenticationEmail(
  props: AuthenticationEmailProps
): Promise<void> {
  return new Promise(async (res) => {
    const { host } = new URL(props.url);

    console.log(props.to, props.from, props.url, host);

    const html = await loadAuthenticationTemplate({
      organizationLogoURL: '',
      organizationName: 'TYVC',
      siteHost: host,
      loginButtonHref: props.url,
    });

    const { data, error } = await resend.emails.send({
      from: props.from,
      to: props.to,
      subject: `TYVC | Login Service`,
      html: html,
    });

    console.log(data, error);

    res();
  });
}

export { sendAuthenticationEmail };
