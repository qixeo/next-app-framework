import prisma from '@/prisma/client';
import Link from 'next/link';

interface Props {
  emailAddress: string;
}

const AccountLink = async ({ emailAddress }: Props) => {
  const user = await prisma.user.findUnique({
    where: { email: emailAddress },
  });

  if (!user) return <Link href="/users/">Account</Link>;

  return <Link href={`/users/${user.id}`}>Account</Link>;
};

export default AccountLink;
