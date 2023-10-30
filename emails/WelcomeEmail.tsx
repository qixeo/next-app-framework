import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

// Be sure to change <APP_NAME> below to the name of your app.

// const baseUrl = process.env.BASE_URL ? `${process.env.BASE_URL}` : '';
// Make sure to change this in Production, or use environment vars like above ^
const baseUrl = 'http://localhost:3000';

export const WelcomeEmail = ({ name }: { name: string }) => (
  <Html>
    <Head />
    <Preview>Thanks for signing up!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={box}>
          <Img src={`${baseUrl}/images/logo.png`} height="40" alt="Logo" />
          <Hr style={hr} />
          <Text style={paragraph}>
            Welcome {name}, thanks for signing up! Your account is now ready.
          </Text>
          <Text style={paragraph}>
            You can log in by clicking the link below.
          </Text>
          <Button
            pX={10}
            pY={10}
            style={button}
            href={`${baseUrl}/api/auth/signin`}
          >
            View your Dashboard
          </Button>
          <Hr style={hr} />
          <Text style={paragraph}>
            If you you need to learn more, you may find our{' '}
            <Link style={anchor} href={`${baseUrl}/docs`}>
              docs
            </Link>{' '}
            helpful.
          </Text>
          <Text style={paragraph}>— The team at APP_NAME</Text>
          <Hr style={hr} />
          <Text style={footer}>&copy; 2023 APP_NAME</Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default WelcomeEmail;

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const box = {
  padding: '0 48px',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const paragraph = {
  color: '#525f7f',

  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'left' as const,
};

const anchor = {
  color: '#556cd6',
};

const button = {
  backgroundColor: '#656ee8',
  borderRadius: '5px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '100%',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
};
