"use client";

import React from 'react';
import { Container, Text, Title, Stack, Divider } from '@mantine/core';
import {DropzoneButton} from '../components/dropzoneButton'

const HomePage: React.FC = () => {
  return (
    <Container
      size="lg"
      style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Stack align="center">
        <Text color="dimmed" size="sm" mb="md">
          HOW IT WORKS | JOINER
        </Text>

        <Title order={1} style={{ fontSize: 40, fontWeight: 900 }}>
          Audio Cutter
        </Title>

        <Text color="dimmed" size="lg" mt="sm" mb="md">
          Free editor to trim and cut any audio file online
        </Text>

        <DropzoneButton/>
        <Divider my="lg" />

      </Stack>
    </Container>
  );
};

export default HomePage;
