import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { Resend } from 'resend';
import ConfirmEmail from '@/emails/ConfirmEmail';

const schema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(5),
});

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, {
      status: 400,
    });

  const user = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (user)
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });

  const hashedPassword = await bcrypt.hash(body.password, 10);
  const newUser = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      hashedPassword,
    },
  });

  // Generate an email verification token and save to DB
  const token = bcrypt.genSaltSync(10);
  const timeInMilliseconds = Date.now() + 60 * 60 * 24 * 365 * 1000; // Set to 1 year from now
  const expires = new Date(timeInMilliseconds);

  await prisma.verificationToken.create({
    data: {
      identifier: newUser?.email!,
      token,
      expires,
    },
  });

  const resend = new Resend(process.env.RESEND_API_KEY);
  const defaultEmail = 'example@example.com';

  // Send a recovery email with the token
  await resend.emails.send({
    from: defaultEmail,
    to: [newUser?.email!],
    subject: 'Please confirm your email',
    react: <ConfirmEmail token={token} />,
  });

  return NextResponse.json({ name: newUser.name, email: newUser.email });
}
