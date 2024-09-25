import { useEffect, useRef } from 'react';
import { Text, Group, Button, rem, useMantineTheme } from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import { IconX, IconDownload } from '@tabler/icons-react';
import { useRouter } from 'next/navigation'; // Use the new import
import classes from './dropzoneButton.module.css';

export function DropzoneButton() {
  const theme = useMantineTheme();
  const openRef = useRef<() => void>(null);
  const router = useRouter();

  // Clear any uploaded files in sessionStorage on component mount
  useEffect(() => {
    sessionStorage.removeItem('uploadedFileData');
    sessionStorage.removeItem('uploadedFileName');
  }, []);

  const handleDrop = (files: File[]) => {
    if (files.length > 0) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const arrayBuffer = e.target?.result;
        if (arrayBuffer) {
          // Store the file data in sessionStorage as a stringified Uint8Array
          const uint8Array = new Uint8Array(arrayBuffer as ArrayBuffer);
          sessionStorage.setItem('uploadedFileData', JSON.stringify(Array.from(uint8Array)));
        }
      };

      reader.readAsArrayBuffer(files[0]);
      sessionStorage.setItem('uploadedFileName', files[0].name);
      router.push('/confirmation'); // Redirect to confirmation page
    }
  };

  return (
    <div className={classes.wrapper}>
      <Dropzone
        openRef={openRef}
        onDrop={handleDrop}
        className={classes.dropzone}
        radius="md"
        accept={['audio/*']}
        maxSize={30 * 1024 ** 2} // 30 MB
      >
        <div style={{ pointerEvents: 'none' }}>
          <Group justify="center">
            <Dropzone.Accept>
              <IconDownload
                style={{ width: rem(50), height: rem(50) }}
                color={theme.colors.blue[6]}
                stroke={1.5}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX
                style={{ width: rem(50), height: rem(50) }}
                color={theme.colors.red[6]}
                stroke={1.5}
              />
            </Dropzone.Reject>
          </Group>

          <Text ta="center" fw={700} fz="lg" mt="xl">
            <Dropzone.Accept>Drop audio files here</Dropzone.Accept>
            <Dropzone.Reject>Audio file must be less than 30 MB</Dropzone.Reject>
          </Text>
        </div>
      </Dropzone>

      <Button
        className={classes.control}
        size="md" 
        radius="xl" 
        onClick={() => openRef.current?.()}
        style={{
          border: 'solid 2px #675cb6',
          background: '#17181d'
        }}
        >
        Browse my files
      </Button>
    </div>
  );
}
