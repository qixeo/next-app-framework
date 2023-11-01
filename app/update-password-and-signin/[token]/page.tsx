import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import { Heading, Text } from '@radix-ui/themes';
import dynamic from 'next/dynamic';

const PasswordForm = dynamic(
  () => import('@/app/users/_components/PasswordForm'),
  {
    ssr: false,
  }
);

interface Props {
  params: {
    token: string;
  };
}

const UpdatePasswordAndSignin = async ({ params }: Props) => {
  const token = decodeURIComponent(params.token);
  const userToken = await prisma.verificationToken.findUnique({
    where: { token: token },
  });

  if (!userToken) return notFound();
  // TODO: Set custom error message for the client

  const sqlDate = new Date(userToken?.expires);
  const expires = sqlDate.getTime();
  const now = Date.now();

  if (expires <= now) return notFound();

  const user = await prisma.user.findUnique({
    where: { email: userToken.identifier },
  });

  if (!user) return notFound();
  // TODO: Set custom error message for the client

  return (
    <div>
      <Heading mb="5">Change Password</Heading>
      <PasswordForm user={user}></PasswordForm>
    </div>
  );
};

export default UpdatePasswordAndSignin;
