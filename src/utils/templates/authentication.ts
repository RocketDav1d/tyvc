import { promises as fs } from 'fs';
import path from 'path';

type AuthenticationTemplateProps = {
  organizationLogoURL: string; // {{replace.logoURL}}
  organizationName: string; // {{replace.emailTitle}}
  loginButtonHref: string; // {{replace.loginButtonHref}}
  siteHost: string; // {{replace.host}}
};

function loadAuthenticationTemplate(
  props: AuthenticationTemplateProps
): Promise<string> {
  return new Promise<string>(async (res) => {
    const templatesDirectory = path.join(process.cwd(), 'templates');
    const fileContents = await fs.readFile(
      templatesDirectory + '/authentication.html',
      'utf8'
    );

    res(
      fileContents
        .replace('{{replace.logoURL}}', props.organizationLogoURL)
        .replace(
          '{{replace.emailTitle}}',
          `Login-Link für ${props.organizationName}`
        )
        .replace('{{replace.loginButtonHref}}', props.loginButtonHref)
        .replace('{{replace.host}}', props.siteHost)
    );
  });
}

export { loadAuthenticationTemplate }
