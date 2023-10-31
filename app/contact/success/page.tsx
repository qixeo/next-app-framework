import React from 'react';
import { Card, Heading } from '@radix-ui/themes';

const EmailSuccessPage = () => {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-150px)]">
      <Card size="5" className="shadow-lg">
        <Heading weight="light">Your email has been sent!</Heading>
      </Card>
    </div>
  );
};

export default EmailSuccessPage;
