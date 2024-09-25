"use client";

import { useState } from 'react';
import { Center, Tooltip, UnstyledButton, Stack, rem } from '@mantine/core';
import {
  IconHome2,
  IconGauge,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconCalendarStats,
  IconUser,
  IconSettings,
  IconLogout,
  IconSwitchHorizontal,
} from '@tabler/icons-react';
import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './navbar.module.css';

interface NavbarLinkProps {
  icon: typeof IconHome2;
  label: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }} style={{
      width: '1%'
    }}>
      <UnstyledButton onClick={onClick} className={classes.link} data-active={active || undefined}
      style={{
        width: '60px',
        marginLeft: '5px'
      }}>
        <div className={classes.linkContent}>
          <Icon className={classes.icon} style={{ width: rem(25), height: rem(25) }} stroke={1} />
          <span className={classes.label}>{label}</span>
        </div>
      </UnstyledButton>
    </Tooltip>
  );
}


const mockdata = [
  { icon: IconHome2, label: 'Remover' },
  { icon: IconGauge, label: 'Splitter' },
  { icon: IconDeviceDesktopAnalytics, label: 'Pitcher' },
  { icon: IconCalendarStats, label: 'Key BPM Finer' },
  { icon: IconUser, label: 'Cutter' },
  { icon: IconFingerprint, label: 'Joiner' },
  { icon: IconSettings, label: 'Recorder' },
  { icon: IconSettings, label: 'Karoake' }
];

export function Navbar() {
  const [active, setActive] = useState(4);

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));

  return (
    <nav className={classes.navbar} style={{
      maxHeight: '100vh',
      marginTop: '15px'
    }}>
      <Center>
        <MantineLogo type="mark" size={30} />
      </Center>

      <div className={classes.navbarMain}>
        <Stack justify="center" gap={25}>
          {links}
        </Stack>
      </div>

      <Stack justify="center" gap={20}>
        <NavbarLink icon={IconSwitchHorizontal} label="Change account" />
        <NavbarLink icon={IconLogout} label="Logout" />
      </Stack>
    </nav>
  );
}
