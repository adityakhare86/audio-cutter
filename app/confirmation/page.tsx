"use client";

import { useEffect, useState } from 'react';
import { Container, Title, Text, Button } from '@mantine/core';

const ConfirmationPage = () => {
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  useEffect(() => {
    // Retrieve the uploaded file name from session storage when the component mounts
    const fileName = sessionStorage.getItem('uploadedFileName');
    setUploadedFileName(fileName);
  }, []); // Run only once after the component is mounted

  return (
    <Container size="sm" style={{ padding: '2rem', textAlign: 'center' }}>
      <Title order={1}>Thank You!</Title>
      <Text size="lg" mt="md">
        We received your audio file.
      </Text>
      {uploadedFileName && (
        <Text size="sm" mt="md">
          Uploaded File: {uploadedFileName}
        </Text>
      )}
      <Button variant="outline" mt="xl" onClick={() => window.location.reload()}>
        Upload Another File
      </Button>
    </Container>
  );
};

export default ConfirmationPage;
