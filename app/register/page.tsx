import React from 'react';
import { Card, Flex, Text } from '@radix-ui/themes';
import Image from 'next/image';
import logo from '@/public/images/logo.png';
import dynamic from 'next/dynamic';
import Spinner from '@/app/components/Spinner';

const RegisterForm = dynamic(
  () => import('@/app/register/_components/RegisterForm'),
  {
    ssr: false,
    loading: () => <Spinner />,
  }
);

const RegisterPage = () => {
  return (
    <Flex direction="column" align="center">
      <Card
        size="4"
        className="shadow-xl"
        style={{ minWidth: 360, textAlign: 'center' }}
      >
        <Flex justify="center">
          <Image
            src={logo}
            height="40"
            alt="My Image"
            className="mb-5"
            priority
          />
        </Flex>
        <Text as="p" color="violet" size="3" mb="3">
          Sign up for our cool app.
        </Text>
        <RegisterForm />
      </Card>
    </Flex>
  );
};

export default RegisterPage;
