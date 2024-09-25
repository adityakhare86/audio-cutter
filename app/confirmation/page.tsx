"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Container, Button, Text, Slider, Group } from '@mantine/core';
import WaveSurfer from 'wavesurfer.js';
import { RangeSlider } from '@mantine/core';

const ConfirmationPage = () => {
    const waveformRef = useRef<HTMLDivElement>(null);
    const [waveSurfer, setWaveSurfer] = useState<WaveSurfer | null>(null);
    const [audioDuration, setAudioDuration] = useState(0);
    const [startPosition, setStartPosition] = useState(0);
    const [endPosition, setEndPosition] = useState(100); // percentage of audio length
    const [showWaveform, setShowWaveform] = useState(false); // New state for conditional rendering

    useEffect(() => {
        const createWaveSurfer = () => {
            if (waveformRef.current) {
                const wavesurferInstance = WaveSurfer.create({
                    container: waveformRef.current,
                    waveColor: '#32e875',
                    progressColor: '#32e875',
                    cursorColor: 'white',
                    height: 128,
                    barWidth: 2,
                });

                const audioFileData = sessionStorage.getItem('uploadedFileData');
                if (audioFileData) {
                    const audioBlob = new Blob([new Uint8Array(JSON.parse(audioFileData))], { type: 'audio/mp3' });
                    const audioUrl = URL.createObjectURL(audioBlob);
                    wavesurferInstance.load(audioUrl);
                }

                wavesurferInstance.on('ready', () => {
                    setAudioDuration(wavesurferInstance.getDuration());
                    setShowWaveform(true);  // Show the waveform only when ready
                });

                setWaveSurfer(wavesurferInstance);

                return wavesurferInstance;
            }
            return null;
        };

        const wavesurferInstance = createWaveSurfer();

        const handleResize = () => {
            if (wavesurferInstance && waveformRef.current) {
                wavesurferInstance.zoom(1);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            if (wavesurferInstance) {
                wavesurferInstance.destroy();

                const uploadedFileData = sessionStorage.getItem('uploadedFileData');
                if (uploadedFileData) {
                    URL.revokeObjectURL(uploadedFileData); // Revoke Blob URL when done
                }
            }
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleTrimChange = (value: [number, number]) => {
        setStartPosition(value[0]);
        setEndPosition(value[1]);

        if (waveSurfer && audioDuration > 0) { // Check that audioDuration is valid
            const start = (value[0] / 100) * audioDuration;
            waveSurfer.seekTo(start / audioDuration); // Seek to start position
        }
    };

    const handlePlayPause = () => {
        if (waveSurfer) {
            waveSurfer.playPause();
        }
    };

    return (
        <Container size="md" style={{ padding: '2rem', textAlign: 'center' }}>
            <Text size="xl" fw={700}>Audio Editor</Text>

            {/* Conditionally render or hide the waveform */}
            <div
                ref={waveformRef}
                style={{
                    width: '100%',
                    margin: '2rem 0',
                    display: showWaveform ? 'block' : 'none' // Hide the waveform if not ready
                }}
            />

            <Group justify="space-between" mt="md">
                <RangeSlider
                    value={[startPosition, endPosition]} // Use value as a tuple for range slider
                    onChange={handleTrimChange}
                    min={0}
                    max={100}
                    label={(value) => `${Math.round((value / 100) * audioDuration)}s`}
                    style={{ width: '100%' }}
                />
            </Group>

            <Group mt="xl">
                <Button onClick={handlePlayPause}>Play / Pause</Button>
                <Button variant="outline">Cut</Button>
                <Button variant="outline" color="red">Remove</Button>
                <Button variant="outline">Save</Button>
            </Group>
        </Container>
    );
};

export default ConfirmationPage;
