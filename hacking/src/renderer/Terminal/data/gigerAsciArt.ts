import type { LineType } from '../../2.0/services/Console/components/Output';

export const gigerArt = [
  '',
  '',
  `##########################################################################################`,
  `                      ________ .___   ________ ________  __________ `,
  `                     /  _____/ |   | /  _____/ \\_____  \\ \\______   \\`,
  `                    /   \\  ___ |   |/   \\  ___   _(__  <  |       _/`,
  `                    \\    \\_\\  \\|   |\\    \\_\\  \\ /       \\ |    |   \\`,
  `                     \\______  /|___| \\______  //______  / |____|_  /`,
  `                            \\/              \\/        \\/         \\/ `,
  `##########################################################################################`,
  '',
  '',
];

export const newGigerArt: LineType[] = [
  { text: null, tag: 'br', id: crypto.randomUUID() },
  { text: null, tag: 'br', id: crypto.randomUUID() },
  {
    children: `##########################################################################################`,
    tag: 'p',
    id: crypto.randomUUID(),
  },
  {
    children: `                      ________ .___   ________ ________  __________ `,
    tag: 'p',
    id: crypto.randomUUID(),
  },
  {
    children: `                      ________ .___   ________ ________  __________ `,
    tag: 'p',
    id: crypto.randomUUID(),
  },
  {
    children: `                     /  _____/ |   | /  _____/ \\_____  \\ \\______   \\`,
    tag: 'p',
    id: crypto.randomUUID(),
  },
  {
    children: `                    /   \\  ___ |   |/   \\  ___   _(__  <  |       _/`,
    tag: 'p',
    id: crypto.randomUUID(),
  },
  {
    children: `                    \\    \\_\\  \\|   |\\    \\_\\  \\ /       \\ |    |   \\`,
    tag: 'p',
    id: crypto.randomUUID(),
  },
  {
    children: `                     \\______  /|___| \\______  //______  / |____|_  /`,
    tag: 'p',
    id: crypto.randomUUID(),
  },
  {
    children: `                            \\/              \\/        \\/         \\/ `,
    tag: 'p',
    id: crypto.randomUUID(),
  },
  {
    children: `##########################################################################################`,
    tag: 'p',
    id: crypto.randomUUID(),
  },
  { text: null, tag: 'br', id: crypto.randomUUID() },
  { text: null, tag: 'br', id: crypto.randomUUID() },
];
