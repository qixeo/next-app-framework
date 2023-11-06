import ContactForm from '@/emails/ContactForm';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const defaultEmail = 'example@example.com';

export async function POST(request: NextRequest) {
  const data = await request.json();

  await resend.emails.send({
    from: defaultEmail,
    to: [data.email],
    subject: 'Welcome',
    react: (
      <ContactForm name={data.name} email={data.email} message={data.message} />
    ),
  });

  return NextResponse.json({});
}
