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

export const ContactForm = ({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) => (
  <Html>
    <Head />
    <Preview>Message send via contact form</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={box}>
          <Img src={`${baseUrl}/images/logo.png`} height="40" alt="Logo" />
          <Hr style={hr} />
          <Text style={paragraph}>You have been sent a new message.</Text>
          <Text style={paragraph}>From: {name}</Text>
          <Text style={paragraph}>Email: {email}</Text>
          <Text style={paragraph}>Message:</Text>
          <Text style={paragraph}>{message}</Text>
          <Hr style={hr} />
          <Text style={paragraph}>This in an internal email.</Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default ContactForm;

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

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
};
