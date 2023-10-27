import authOptions from '@/app/auth/authOptions';
import { userSchema } from '@/app/validationSchemas';
import prisma from '@/prisma/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany({ orderBy: { name: 'asc' } });
  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const validation = userSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newUser = await prisma.user.create({
    data: { name: body.name, email: body.email },
  });

  return NextResponse.json(newUser, { status: 201 });
}
