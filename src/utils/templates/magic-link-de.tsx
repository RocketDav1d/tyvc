
import * as React from 'react';

import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface TrustyourvcMagicLinkEmailDEProps {
  magicLink?: string;
}

export const TrustyourvcMagicLinkEmailDE = ({
  magicLink,
}: TrustyourvcMagicLinkEmailDEProps) => (
  <Html>
    <Head />
    <Preview>Einloggen mit diesem magic link</Preview>
    <Body style={main}>
      <Container style={container}>
        <img
          src={`https://ik.imagekit.io/tyvc/logo-color.png?updatedAt=1711037473006`}
          width={150}
          height={'auto'}
          alt="TYVC Logo"
        />
        <Heading style={heading}>🪄 Dein magic link</Heading>
        <Section style={body}>
          <Text style={paragraph}>
            <Link style={link} href={magicLink}>
              👉 Klicke hier, um Dich anzumelden 👈
            </Link>
          </Text>
          <Text style={paragraph}>
            Wenn Du diese E-Mail nicht angefordert hast, ignoriere bitte diese
            E-Mail.
          </Text>
        </Section>
        <Text style={paragraph}>
          Beste Grüße,
          <br />- Trustyourvc Team
        </Text>
        <Hr style={hr} />
        <img
          src={`https://ik.imagekit.io/tyvc/icon-gray.png?updatedAt=1711037472830`}
          width={40}
          height={'auto'}
          style={{
            WebkitFilter: 'grayscale(100%)',
            filter: 'grayscale(100%)',
            margin: '20px 0',
          }}
          alt="TYVC Icon"
        />
        <Text style={footer}>Trustyourvc GmbH</Text>
        <Text style={footer}>Friedrichstraße 114a, D-10117 Berlin</Text>
      </Container>
    </Body>
  </Html>
);

TrustyourvcMagicLinkEmailDE.PreviewProps = {
  magicLink: 'https://app.trustyourvc.com',
} as TrustyourvcMagicLinkEmailDEProps;

export default TrustyourvcMagicLinkEmailDE;

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 25px 48px',
};

const heading = {
  fontSize: '28px',
  fontWeight: 'bold',
  marginTop: '48px',
};

const body = {
  margin: '24px 0',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
};

const link = {
  color: '#68E07D',
};

const hr = {
  borderColor: '#dddddd',
  marginTop: '48px',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  marginLeft: '4px',
};
