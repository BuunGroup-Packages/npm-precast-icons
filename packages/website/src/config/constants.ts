export const COMPANY_INFO = {
  name: 'Buun Group',
  email: 'hello@buungroup.com',
  year: 2025,
  socials: {
    linkedin: 'https://www.linkedin.com/company/buun-group',
    discord: 'https://discord.gg/4Wen9Pg3rG',
  },
  github: {
    repo: 'https://github.com/BuunGroup-Packages/npm-precast-icons',
    newIssue:
      'https://github.com/BuunGroup-Packages/npm-precast-icons/issues/new?template=icon-request.md&title=%5BIcon%20Request%5D%20',
  },
  resources: [
    {
      name: 'Precast.dev',
      description: 'Generate projects',
      url: 'https://precast.dev/',
    },
    {
      name: 'Brutalist Components',
      description: 'Brutalist component library',
      url: 'https://brutalist.precast.dev/',
    },
    {
      name: 'Color Showcase',
      description: 'Hex color display tool',
      url: '/color?hex=3b82f6',
    },
  ],
} as const;

export const LEGAL_PAGES = {
  disclaimer: {
    title: 'Disclaimer',
    description: 'Important information about icon usage and copyright',
  },
  privacy: {
    title: 'Privacy Policy',
    description: 'How we handle your data and privacy',
  },
  terms: {
    title: 'Terms of Use',
    description: 'Terms and conditions for using our service',
  },
} as const;
