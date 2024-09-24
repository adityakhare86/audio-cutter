import React from 'react';
import { Button, Container, Text, Title, Stack, Group, Divider } from '@mantine/core';

const HomePage: React.FC = () => {
  return (
    <Container
      size="lg"
      style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Stack align="center">
        {/* Header */}
        <Text color="dimmed" size="sm" mb="md">
          HOW IT WORKS | JOINER
        </Text>

        {/* Title */}
        <Title order={1} style={{ fontSize: 40, fontWeight: 900 }}>
          Audio Cutter
        </Title>

        {/* Description */}
        <Text color="dimmed" size="lg" mt="sm" mb="md">
          Free editor to trim and cut any audio file online
        </Text>

        {/* Browse Button */}
        <Button
          size="lg"
          variant="outline"
          color="violet"
          radius="md"
          styles={{ root: { paddingRight: 20, paddingLeft: 20 } }}
        >
          Browse my files
        </Button>

        <Divider my="lg" />
      </Stack>
    </Container>
  );
};

export default HomePage;
