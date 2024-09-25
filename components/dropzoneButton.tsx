import { useEffect, useRef } from 'react';
import { Text, Group, Button, rem, useMantineTheme } from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import { IconCloudUpload, IconX, IconDownload } from '@tabler/icons-react';
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
            <Dropzone.Idle>
              <IconCloudUpload style={{ width: rem(50), height: rem(50) }} stroke={1.5} />
            </Dropzone.Idle>
          </Group>

          <Text ta="center" fw={700} fz="lg" mt="xl">
            <Dropzone.Accept>Drop audio files here</Dropzone.Accept>
            <Dropzone.Reject>Audio file must be less than 30 MB</Dropzone.Reject>
            <Dropzone.Idle>Upload audio file</Dropzone.Idle>
          </Text>
          <Text ta="center" fz="sm" mt="xs" c="dimmed">
            Drag&apos;n&apos;drop audio files here to upload. We can accept only audio files that are less than 30 MB in size.
          </Text>
        </div>
      </Dropzone>

      <Button className={classes.control} size="md" radius="xl" onClick={() => openRef.current?.()}>
        Select files
      </Button>
    </div>
  );
}
