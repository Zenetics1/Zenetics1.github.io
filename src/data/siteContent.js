export const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/william-kim-1402ab280/', icon: 'linkedin' },
  { label: 'GitHub', href: 'https://github.com/Zenetics1', icon: 'github' },
  { label: 'YouTube', href: 'https://www.youtube.com/channel/UCJac4noeRVBhPlXyS2omAQg', icon: 'youtube' },
]


export const scenePanels = [
  'panel-large layer-1',
  'panel-wide layer-2',
  'panel-square layer-3',
  'panel-large layer-4',
  'panel-wide layer-5',
  'panel-square layer-6',
  'panel-wide layer-7',
  'panel-large layer-8',
  'panel-square layer-9',
  'panel-wide layer-10',
  'panel-large layer-11',
  'panel-square layer-12',
  'panel-wide layer-13',
  'panel-large layer-14',
  'panel-wide layer-15',
  'panel-square layer-16',
]

export const featuredRepoUrl =
  import.meta.env.VITE_FEATURED_REPO_URL || 'https://github.com/Zenetics1/Notion_Python_Stock_Tracker'

export const portfolioCategories = [
  {
    slug: 'personal',
    label: 'Personal Projects',
    eyebrow: 'Creative Work',
    description: 'Experiments and hands-on creations outside classwork.',
    accent: 'portfolio-accent-sand',
    projects: [
      {
        title: 'Making an Arcade Machine Pt.1',
        summary: 'Built over the summer of 2024, this is my take on a bartop arcade machine. It utilizes a Raspberry Pi 4 2GB to run Retropie, allowing me to run classic arcade emulators.',
        videoUrl: 'https://www.youtube.com/embed/JbIsC9RpNSs',
      },
      {
        title: 'Making an Arcade Machine Pt.2',
        summary: 'Built over the summer of 2024, this is my take on a bartop arcade machine. The final video of the two part series.',
        videoUrl: 'https://www.youtube.com/embed/qwvoPNThrJ0',
      },
    ],
  },
  {
    slug: 'programming',
    label: 'Programming Projects',
    eyebrow: 'Software Builds',
    description: 'Coding projects focused on tooling, automation, and practical problem solving.',
    accent: 'portfolio-accent-amber',
    projects: [
      {
        title: 'Lava Escape',
        summary: 'This is the first game that I have fully completed and tested. It uses the Java language to create a game where the user is a block trying to escape the rising lava in a volcano.',
        videoUrl: 'https://www.youtube.com/embed/5aZ5x-nAvVA',
      },
      {
        title: 'CREATE Design Challenge: BeatTrends',
        summary: 'This is a Project where I and a group of students used Python data visualization/manipulation libraries to create graphs based on music data collected between the early 90s to 2020.',
        videoUrl: 'https://www.youtube.com/embed/LZaWQyHEUK4',
      },
      {
        title: '6502 Emulator',
        summary: 'A C emulator for the 6502 8-bit microprocessor, verified for instruction-accurate behavior against the SingleStepTests JSON test suite.',
        linkUrl: 'https://github.com/Zenetics1/6502_Emulator',
        linkLabel: 'View on GitHub',
      },
      {
        title: 'Notion Python Stock Tracker',
        summary: 'A Python script that tracks investment opportunities through a Notion page, using the Twelve Data API to pull live prices and volumes, keeping the watchlist database automatically updated.',
        linkUrl: 'https://github.com/Zenetics1/Notion_Python_Stock_Tracker',
        linkLabel: 'View on GitHub',
      },
    ],
  },
  {
    slug: 'hardware',
    label: 'Hardware Projects',
    eyebrow: 'Systems + Circuits',
    description: 'Builds spanning Arduino circuitry, digital design, and device prototyping.',
    accent: 'portfolio-accent-olive',
    projects: [
      {
        title: 'Arduino Documentary #1',
        summary: 'This is the first video where I experiement with the Arduino UNO, I hope to learn as much as I can about circuitry and electronics.',
        videoUrl: 'https://www.youtube.com/embed/W6iDsVtBoCA',
      },
      {
        title: '10G Ethernet Parser: Block Sync Module',
        summary: "Contributed the Block Sync module to UWASIC's 10G Ethernet Parser project, implementing the state machine and header counters that detect valid 66b block boundaries in the PCS layer.",
        linkUrl: 'https://github.com/Zenetics1/10G-Ethernet-Parser',
        linkLabel: 'View on Github',
      },
      {
        title: 'UWASIC Onboarding',
        summary: 'My onboarding project for UWASIC, the University of Waterloo student ASIC design team, learning the Verilog-to-silicon workflow through the TinyTapeout project template and cocotb testbenches.',
        linkUrl: 'https://github.com/Zenetics1/onboarding_start',
        linkLabel: 'View on GitHub',
      },
    ],
  },
]
