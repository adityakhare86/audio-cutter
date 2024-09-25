"use client";

import { useState } from 'react';
import { Text, Center, Tooltip, UnstyledButton, Stack, rem } from '@mantine/core';
import Image from 'next/image';
import classes from './navbar.module.css';

// Import SVG icons as React components
import HamburgerIcon from '../icons/Hamburger.svg';
import SplitterIcon from '../icons/Splitter.svg';
import PitcherIcon from '../icons/Pitcher.svg';
import BPMIcon from '../icons/BPM.svg';
import CutterIcon from '../icons/Cutter.svg';
import JoinerIcon from '../icons/Joiner.svg';
import RecorderIcon from '../icons/Recorder.svg';
import KaraokeIcon from '../icons/Karaoke.svg';

import {
  IconSwitchHorizontal,
  IconLogout
} from '@tabler/icons-react';

// NavbarLinkProps for type safety
interface NavbarLinkProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?(): void;
}

// NavbarLink Component
function NavbarLink({ icon, label, active, onClick }: NavbarLinkProps) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        onClick={onClick}
        className={classes.link}
        data-active={active || undefined}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        {icon}
        <Text
          size="xs"
          mt={5}
          style={{
            maxWidth: '55px',
            textAlign: 'center',
            whiteSpace: 'normal',
            overflowWrap: 'break-word'
          }}
        >
          {label}
        </Text>
      </UnstyledButton>
    </Tooltip>
  );
}

// Mock Data Array for Navbar Links
const mockdata = [
  { icon: <Image src='../icons/Hamburger.svg' alt="Remover" width={40} height={32} />, label: 'Remover' },
  { icon: <Image src={SplitterIcon} alt="Splitter" width={40} height={32} />, label: 'Splitter' },
  { icon: <Image src={PitcherIcon} alt="Pitcher" width={40} height={32} />, label: 'Pitcher' },
  { icon: <Image src={BPMIcon} alt="Key BPM Finder" width={40} height={32} />, label: 'Key BPM Finder' },
  { icon: <Image src={CutterIcon} alt="Cutter" width={40} height={32} />, label: 'Cutter' },
  { icon: <Image src={JoinerIcon} alt="Joiner" width={40} height={32} />, label: 'Joiner' },
  { icon: <Image src={RecorderIcon} alt="Recorder" width={40} height={32} />, label: 'Recorder' },
];

console.log("hhereeeeeeeeee: ", HamburgerIcon);

// Navbar Component
export function Navbar() {
  const [active, setActive] = useState(0);

  // Render Navbar Links from mockdata
  const links = mockdata.map((link, index) => (
    <NavbarLink
      key={link.label}
      icon={link.icon}
      label={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));

  return (
    <nav className={classes.navbar}>
      <Center>
        <Image src='../icons/Hamburger.svg' alt="Menu" width={30} height={30} />
      </Center>

      <div className={classes.navbarMain}>
        <Stack justify="center" gap={30} style={{ overflowY: 'scroll', maxHeight: '70vh' }}>
          {links}
        </Stack>
      </div>

      <Stack justify="center" gap={20}>
        <NavbarLink icon={<IconSwitchHorizontal />} label="Change account" />
        <NavbarLink icon={<IconLogout />} label="Logout" />
      </Stack>
    </nav>
  );
}
