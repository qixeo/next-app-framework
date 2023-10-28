import WelcomeTemplate from '@/emails/WelcomeTemplate';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  resend.emails.send({
    from: '...',
    to: 'example@example.com',
    subject: '...',
    react: <WelcomeTemplate name="Joe User" />,
  });

  return NextResponse.json({});
}
