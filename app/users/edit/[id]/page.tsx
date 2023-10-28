import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import React from 'react';

interface Props {
  params: {
    id: string;
  };
}

const EditUserPage = async ({ params }: Props) => {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
  });

  if (!user) notFound();

  return <div>User: {user.name}</div>;
};

export default EditUserPage;
