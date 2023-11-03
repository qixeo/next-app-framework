'use client';

import {
  TextField,
  Button,
  Callout,
  Heading,
  Container,
  Flex,
  Separator,
} from '@radix-ui/themes';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Spinner from '@/app/components/Spinner';
import Link from 'next/link';

const ForgotPasswordPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      await axios.post('/api/users/forgot-password', data);
      setSuccess(true);
    } catch (error) {
      setSubmitting(false);
      setError('An unexpected error occurred.');
    }
  });

  return (
    <>
      <Flex justify="center">
        <Container>
          {!success && (
            <>
              <Flex direction="column" align="center">
                <Heading size="8" mb="2">
                  Reset Password
                </Heading>
                <p className="text-center mb-3">
                  Enter your email address below to reset the password for your
                  account.
                </p>
                <Separator mt="5" mb="7" size="3" color="gray" />
              </Flex>
              <div className="w-full">
                {error && (
                  <Callout.Root color="red" className="mb-5">
                    <Callout.Text>{error}</Callout.Text>
                  </Callout.Root>
                )}
                <form
                  className="space-y-4"
                  style={{ textAlign: 'right' }}
                  onSubmit={onSubmit}
                >
                  <Flex
                    className="flex-col sm:flex-row"
                    align="center"
                    justify="center"
                    gap="2"
                  >
                    <TextField.Root className="w-full sm:max-w-[280px]">
                      <TextField.Input
                        size="3"
                        placeholder="Email"
                        {...register('email')}
                      />
                    </TextField.Root>
                    <Button
                      size="3"
                      className="w-full sm:w-32"
                      disabled={isSubmitting}
                    >
                      Submit {isSubmitting && <Spinner />}
                    </Button>
                  </Flex>
                </form>
              </div>
            </>
          )}
          {success && (
            <>
              <Flex direction="column" align="center">
                <Heading size="8" mb="2">
                  Success!
                </Heading>
                <p className="text-center mb-3">
                  We've sent you a link to update your password. The link will
                  expire in 1 hour.
                </p>
                <Separator mt="5" mb="7" size="3" color="gray" />
                <p className="text-center mb-3">
                  If the email doesn’t arrive after a few minutes, try checking
                  your spam folder. If you still can’t find it, please try
                  again, or <Link href="/contact">contact support</Link>.
                </p>
              </Flex>
            </>
          )}
        </Container>
      </Flex>
    </>
  );
};

export default ForgotPasswordPage;
