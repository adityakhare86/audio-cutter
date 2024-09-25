"use client";

import React from 'react';
import { Container, Text, Title, Stack, Divider } from '@mantine/core';
import { DropzoneButton } from '../components/dropzoneButton';

const HomePage: React.FC = () => {
  return (
    <Container
      size="lg"
      style={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#17181d',
      }}
    >
      <Stack align="center" justify="center">
        <Text
          size="sm"
          mb="md"
          style={{
            color: 'white',
            fontWeight: 700
          }}>
          HOW IT WORKS &nbsp;&nbsp; JOINER
        </Text>

        <Title order={1} style={{ fontSize: 48, fontWeight: 600, color: 'white' }}>
          Audio Cutter
        </Title>

        <Text
          size="lg"
          mt="sm"
          mb="md"
          style={{
            color: 'white'
          }}>
          Free editor to trim and cut any audio file online
        </Text>

        {/* Centering the Dropzone Button */}
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', alignContent: 'center' }}>
          <DropzoneButton />
        </div>

        <Divider my="lg" />
      </Stack>
    </Container>
  );
};

export default HomePage;