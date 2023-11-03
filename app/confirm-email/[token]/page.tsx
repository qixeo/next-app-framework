import prisma from '@/prisma/client';
import { Button, Callout, Flex, Heading, Link, Text } from '@radix-ui/themes';
import ErrorMessage from '@/app/components/ErrorMessage';
import { InfoCircledIcon } from '@radix-ui/react-icons';

interface Props {
  params: {
    token: string;
  };
}

const ConfirmEmail = async ({ params }: Props) => {
  const token = decodeURIComponent(params.token);
  const userToken = await prisma.verificationToken.findUnique({
    where: { token: token },
  });

  if (!userToken) {
    return (
      <div>
        <CallOut errorMessage={'Invalid verification token.'} />
      </div>
    );
  }

  const sqlDate = new Date(userToken?.expires);
  const expires = sqlDate.getTime();
  const now = Date.now();

  if (expires <= now) {
    return (
      <div>
        <CallOut
          errorMessage={
            "Token expired. This really shouldn't happen as the token should have been valid for one year."
          }
        />
      </div>
    );
  }

  const user = await prisma.user.findUnique({
    where: { email: userToken.identifier },
  });

  if (!user) {
    return (
      <div>
        <CallOut
          errorMessage={"Hmm, that's strange. User or email not found."}
        />
      </div>
    );
  }

  // Update user and remove validation token
  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      emailVerified: new Date(now),
    },
  });

  await prisma.verificationToken.deleteMany({
    where: { identifier: userToken.identifier },
  });

  return (
    <div>
      <Heading mb="5">Email confirmed!</Heading>
      <Link href="/">
        <Button>To your dashboard</Button>
      </Link>
    </div>
  );
};

const CallOut = (errorMessage: any) => {
  return (
    <div className="flex justify-center mt-5">
      <div className="p-4 border border-red-200 bg-red-50 rounded-md">
        Error: {JSON.stringify(errorMessage.errorMessage)} Please{' '}
        <Link href="/contact">contact us</Link> and submit an inquiry.
      </div>
    </div>
  );
};

export default ConfirmEmail;
