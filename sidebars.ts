import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docs: [
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'README',
        'setup/invite',
        'setup/quick-start',
      ],
    },
    {
      type: 'category',
      label: 'Server Setup',
      collapsed: false,
      items: [
        'setup/general-settings',
        'setup/moderation',
        'setup/automod',
        'setup/leveling',
        'setup/welcome',
        'setup/logging',
        'setup/reaction-roles',
        'setup/self-roles',
        'setup/starboard',
        'setup/stream-alerts',
        'setup/invite-tracker',
        'setup/birthdays',
        'setup/suggestions',
        'setup/giveaways',
        'setup/music',
        'setup/counting',
        'setup/scheduled-messages',
        'setup/temp-voice',
        'setup/slowmode',
        'setup/stats-channels',
        'setup/embeds',
        'setup/custom-commands',
        'setup/auto-responses',
        'setup/command-permissions',
      ],
    },
    {
      type: 'category',
      label: 'Commands',
      items: [
        'commands/moderation',
        'commands/leveling',
        'commands/community',
        'commands/music',
        'commands/utility',
      ],
    },
    {
      type: 'category',
      label: 'Addons',
      items: [
        'addons/overview',
        'addons/applications',
        'addons/tickets',
        'addons/gameservers',
        'addons/rsm-manager',
        'addons/code-review',
        'addons/sdk',
      ],
    },
    {
      type: 'category',
      label: 'Self-Hosting',
      items: [
        'self-hosting/overview',
        'self-hosting/prerequisites',
        'self-hosting/discord-setup',
        'self-hosting/installation',
        'self-hosting/database',
        'self-hosting/deployment',
        'self-hosting/troubleshooting',
      ],
    },
  ],
};

export default sidebars;
