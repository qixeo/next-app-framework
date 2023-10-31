'use client';

import { TextField, Button, Callout, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { User } from '@prisma/client';

const passwordSchema = z
  .object({
    password: z
      .string()
      .min(6, 'Password with a minimum of 6 characters is required.'),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ['confirm'],
  });

type Schema = z.infer<typeof passwordSchema>;

const PasswordForm = ({ user }: { user?: User }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(passwordSchema),
  });
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      if (user) axios.patch('/api/users/change-password/' + user.id, data);
      router.push('/users/' + user!.id);
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      setError('An unexpected error occurred.');
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input
            size="3"
            placeholder="New Password"
            type="password"
            {...register('password')}
          />
        </TextField.Root>
        <ErrorMessage>{errors.password?.message}</ErrorMessage>
        <TextField.Root>
          <TextField.Input
            size="3"
            placeholder="Confirm Password"
            type="password"
            {...register('confirm')}
          />
        </TextField.Root>
        <ErrorMessage>{errors.confirm?.message}</ErrorMessage>
        <Flex align="center" justify="between" style={{ marginTop: 28 }}>
          <Link href={`/users/${user?.id}`}>
            <Button size="3" variant="outline">
              Cancel
            </Button>
          </Link>
          <Button size="3" disabled={isSubmitting}>
            Change Password {isSubmitting && <Spinner />}
          </Button>
        </Flex>
      </form>
    </div>
  );
};

export default PasswordForm;
