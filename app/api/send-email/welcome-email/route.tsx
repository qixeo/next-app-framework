import WelcomeEmail from '@/emails/WelcomeEmail';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const defaultEmail = 'hello@qixeo.com';

export async function POST(request: NextRequest) {
  const data = await request.json();

  await resend.emails.send({
    from: defaultEmail,
    to: [data.email],
    subject: 'Welcome',
    react: <WelcomeEmail name={data.name} />,
  });

  return NextResponse.json({});
}
