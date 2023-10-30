'use client';

import {
  TextField,
  Button,
  Callout,
  TextArea,
  Heading,
  Container,
  Flex,
  Separator,
} from '@radix-ui/themes';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema } from '@/app/validationSchemas';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';

type Inputs = z.infer<typeof contactFormSchema>;

const ContactPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(contactFormSchema),
  });
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      await axios.post('/api/send-email/contact-form', data);
      router.push('/contact/success');
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      setError('An unexpected error occurred.');
    }
  });

  return (
    <>
      <Flex justify="center">
        <Container style={{ maxWidth: 500 }}>
          <Flex direction="column" align="center">
            <Heading size="8" mb="2">
              Contact Us
            </Heading>
            <p className="text-center mb-3">
              Use this form to send us a message.
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
              <TextField.Root>
                <TextField.Input
                  size="3"
                  placeholder="Name"
                  {...register('name')}
                />
              </TextField.Root>
              <ErrorMessage>{errors.name?.message}</ErrorMessage>
              <TextField.Root>
                <TextField.Input
                  size="3"
                  placeholder="Email"
                  {...register('email')}
                />
              </TextField.Root>
              <ErrorMessage>{errors.email?.message}</ErrorMessage>
              <TextField.Root>
                <TextArea
                  size="3"
                  placeholder="Your message…"
                  {...register('message')}
                />
              </TextField.Root>
              <ErrorMessage>{errors.message?.message}</ErrorMessage>
              <Button
                size="3"
                style={{ marginTop: 28 }}
                disabled={isSubmitting}
              >
                Send Message {isSubmitting && <Spinner />}
              </Button>
            </form>
          </div>
        </Container>
      </Flex>
    </>
  );
};

export default ContactPage;
