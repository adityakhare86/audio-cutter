"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Container, Button, Group, Text } from '@mantine/core';
import WaveSurfer from 'wavesurfer.js';
import { RangeSlider } from '@mantine/core';

const ConfirmationPage = () => {
    const waveformRef = useRef<HTMLDivElement>(null);
    const [waveSurfer, setWaveSurfer] = useState<WaveSurfer | null>(null);
    const [audioDuration, setAudioDuration] = useState(0);
    const [startPosition, setStartPosition] = useState(0);
    const [endPosition, setEndPosition] = useState(100);
    const [showWaveform, setShowWaveform] = useState(false);

    useEffect(() => {
        const createWaveSurfer = () => {
            if (waveformRef.current) {
                const wavesurferInstance = WaveSurfer.create({
                    container: waveformRef.current,
                    waveColor: '#00FFBE',
                    progressColor: '#00FFBE',
                    cursorColor: '#FFFFFF',
                    height: 80,
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
                    setShowWaveform(true);
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
            }
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleTrimChange = (value: [number, number]) => {
        setStartPosition(value[0]);
        setEndPosition(value[1]);

        if (waveSurfer && audioDuration > 0) {
            const start = (value[0] / 100) * audioDuration;
            waveSurfer.seekTo(start / audioDuration);
        }
    };

    const handlePlayPause = () => {
        if (waveSurfer) {
            waveSurfer.playPause();
        }
    };

    const formatTime = (timeInSeconds: number) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        const milliseconds = Math.floor((timeInSeconds % 1) * 10);

        return `${minutes.toString().padStart(2, '0')}:${seconds
            .toString()
            .padStart(2, '0')}.${milliseconds}`;
    };

    return (
        <Container
            fluid
            style={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#1A1A1A',
                color: 'white',
                padding: '0 2rem',
            }}
        >
            {/* Wrapper for Waveform and Slider */}
            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '700px',
                    height: '100px', // Adjust to your preferred height
                    marginBottom: '2rem',
                }}
            >
                {/* Waveform container */}
                <div
                    ref={waveformRef}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: '8px',
                        display: showWaveform ? 'block' : 'none',
                    }}
                />

                {/* RangeSlider overlaying the waveform with taller thumbs */}
                <RangeSlider
                    value={[startPosition, endPosition]}
                    onChange={handleTrimChange}
                    min={0}
                    max={100}
                    step={0.1}
                    label={(value) => `${Math.round((value / 100) * audioDuration)}s`}
                    style={{
                        position: 'absolute',
                        left: 0,
                        top: '50%', // Center vertically
                        zIndex: 10, // Ensure the slider is above the waveform
                        width: '100%', // Make sure the slider spans the full width
                        transform: 'translateY(-50%)', // Adjust to center the slider
                        padding: 0,
                    }}
                    size="lg"
                    thumbSize={80} // Adjust the thumb size to match the height of the waveform (80px)
                    styles={{
                        thumb: {
                            height: '80px', // Ensure thumbs are the same height as the waveform
                            width: '10px', // Narrow the thumb to keep a clean look
                            borderRadius: '0', // Square ends for better matching
                            backgroundColor: '#00FFBE', // Color of the thumbs
                        },
                        track: {
                            height: '5px', // Keep the track thin and clean
                            backgroundColor: '#333', // Background color of the track
                        },
                    }}
                />
            </div>

            {/* Button group pinned at the bottom */}
            <Group
                mt="auto"
                style={{
                    position: 'absolute',
                    bottom: '20px',
                    width: '100%',
                    justifyContent: 'space-between',
                    padding: '0 2rem',
                }}
            >
                {/* Play / Pause Button */}
                <Button
                    variant="filled"
                    color="dark"
                    radius="xl"
                    size="lg"
                    style={{
                        padding: '10px 20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onClick={handlePlayPause}
                >
                    {/* Play / Pause Icon */}
                    <span style={{ marginRight: '8px' }}>
                        ▶ {/* Play icon for illustration */}
                    </span>
                </Button>

                {/* Time Control Inputs */}
                <div style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
                    <Text style={{ marginRight: '8px' }}>Start:</Text>
                    <input
                        type="text"
                        value={formatTime((startPosition / 100) * audioDuration)} // Update to reflect trimmed time
                        style={{
                            backgroundColor: '#1A1A1A',
                            borderRadius: '8px',
                            padding: '8px 12px',
                            color: 'white',
                            border: '1px solid #333',
                            textAlign: 'center',
                        }}
                        readOnly
                    />
                    <Text style={{ margin: '0 12px' }}>End:</Text>
                    <input
                        type="text"
                        value={formatTime((endPosition / 100) * audioDuration)} // Update to reflect trimmed time
                        style={{
                            backgroundColor: '#1A1A1A',
                            borderRadius: '8px',
                            padding: '8px 12px',
                            color: 'white',
                            border: '1px solid #333',
                            textAlign: 'center',
                        }}
                        readOnly
                    />
                </div>

                {/* Format and Save Button */}
                <div style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
                    <Text style={{ marginRight: '8px' }}>format:</Text>
                    <Text
                        style={{
                            color: '#00FFBE',
                            marginRight: '16px',
                        }}
                    >
                        mp3
                    </Text>
                    <Button
                        variant="light"
                        color="gray"
                        radius="xl"
                        size="md"
                        style={{ padding: '10px 20px' }}
                    >
                        Save
                    </Button>
                </div>
            </Group>
        </Container>
    );
};

export default ConfirmationPage;
