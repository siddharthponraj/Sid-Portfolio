// English — the primary language. Tamil and Hindi must match this shape exactly
// (TypeScript enforces it).

export const en = {
  meta: {
    title: 'Siddharth P — Full Stack Developer Portfolio',
    description:
      'Portfolio of Siddharth P, full stack developer at Hexaennea Technologies. JavaScript, React, Node.js, TypeScript, C# and .NET, MySQL and application security.',
  },
  nav: {
    about: 'About',
    experience: 'Experience',
    work: 'Work',
    skills: 'Skills',
    contact: 'Contact',
    resume: 'Resume',
    menu: 'Menu',
    close: 'Close',
    language: 'Language',
    themeDark: 'Switch to dark mode',
    themeLight: 'Switch to light mode',
    skip: 'Skip to content',
    sections: 'Sections',
  },
  hero: {
    kicker: 'Portfolio',
    name: 'Siddharth P',
    role: 'Full stack developer building secure web applications.',
    lede: 'Junior Software Developer at Hexaennea Technologies, working across JavaScript and React interfaces, Node.js and C# / .NET back ends, MySQL databases and application security.',
    cta: 'View work',
    facts: { joined: 'Joined Hexaennea Technologies', projects: 'Projects built', certs: 'Certifications', cgpa: 'CGPA, B.Tech CSE' },
    diagram: 'Diagram of the layers I work on: interface, logic, data and security.',
    layers: [
      { name: 'Interface', detail: 'React · JavaScript · TypeScript' },
      { name: 'Logic', detail: 'Node.js · C# · .NET' },
      { name: 'Data', detail: 'MySQL · PostgreSQL' },
      { name: 'Security', detail: 'Encryption · Hashing · Auth' },
    ],
  },
  about: {
    label: 'About',
    portraitAlt: 'Portrait of Siddharth P',
    paragraphs: [
      'I focus on the parts of an application people rely on most: interfaces that are easy to use, data that is well structured, and security that protects both.',
      'Because I started in design, I usually design the screens I build, and I pay attention to the details that make software feel dependable.',
    ],
  },
  experience: {
    label: 'Experience',
    jobs: [
      {
        period: 'Mar 2026 — Present',
        role: 'Junior Software Developer',
        org: 'Hexaennea Technologies',
        points: ['Full stack developer across three products: a fleet ERP used by trucking companies, the company’s sales CRM and its HR portal.'],
        groups: [
          {
            name: 'Hexigo ERP',
            tag: 'Core contributor',
            facts: '820 commits · 7 months · Web + Android/iOS',
            stack: 'React · TypeScript · Capacitor · Node.js · MySQL · Redis · Google Cloud',
            points: [
              ['Core modules', 'Built core modules across the full stack, from SQL views to the mobile apps, for a multi-tenant ERP used by trucking companies.'],
              ['UI/UX', 'Redesigned every module (trips, trucks, drivers, fuel, tolls, payments, invoices, accounts) with a shared component library, mobile-first layouts, interactive maps and a 3D truck viewer.'],
              ['Android & iOS', 'Delivered the mobile apps with Capacitor: Google and Apple Sign-In, native push notifications (FCM) and app-style back-button navigation.'],
              ['Telematics', 'A GPS sync service on Google Cloud that pulls live truck data from four OEM APIs (Eicher, Ashok Leyland, KTT, WheelsEye) for live tracking, route replay, ignition alerts and shareable live-location links.'],
              ['Billing & payments', 'Trip rate calculations, percentage-based driver pay, GST and TDS, and a payment request and approval flow with UPI, IMPS and bank payouts.'],
              ['Security & performance', 'Per-session AES-256-GCM encryption of API responses and every query limited to the user’s own company; Redis caching, SQL views and paginated loading.'],
              ['Quality', '180+ test files across the Jest and Vitest suites, which now run about 4,000 tests.'],
            ] as [string, string][],
          },
          {
            name: 'Hexigo CRM',
            tag: 'First author & maintainer',
            facts: '~16,000 lines · 41 files · 9 PRs reviewed',
            stack: 'React 19 · Vite · Supabase · PostgreSQL · Chart.js',
            points: [
              ['First version', 'Built the app shell and 9 pages: a revenue dashboard, drag-and-drop lead pipeline, contacts, tasks, a dialer with call timer, team management and profiles.'],
              ['Data & access', 'Designed the PostgreSQL schema and a typed Supabase service layer, with row-level security and role-based access for Admin, Manager and Sales Rep.'],
              ['Lead assignment', 'Automatic assignment that spreads new leads across active reps, plus SQL that redistributed about 413 unassigned leads evenly in production.'],
              ['Shared UI', 'A keyboard-friendly searchable dropdown that replaced about 25 native dropdowns across 11 screens.'],
              ['Maintainer', 'Reviewed and merged all 9 feature PRs, including the calendar, reports and Excel import/export.'],
            ] as [string, string][],
          },
          {
            name: 'Hex Attendance',
            tag: 'Sole developer',
            facts: '54 commits · ~15,500 lines · May–Oct 2026',
            stack: 'React 19 · React Router · Vite · Supabase · Edge Functions · Vercel',
            points: [
              ['Attendance', 'Check-in and check-out with session tracking, active vs. idle time, idle-mode requests, location links and a suspicious-activity log.'],
              ['Leave', 'Approvals, paid-leave balance, comp-off for holidays, LOP calculation, and automatic correction of past days when leave changes late.'],
              ['Payroll', 'Monthly salary from annual CTC, salary-expense tracking, and payslip PDFs that regenerate when leave changes.'],
              ['Security', 'Row-level security separating admin and employee data, and an Edge Function for admin-only onboarding, password reset and email change.'],
              ['Cost', 'Cut 1,000+ background database requests a day to almost zero by removing unneeded polling and a cron job.'],
            ] as [string, string][],
          },
        ],
      },
      {
        period: 'May 2024 — Jun 2024',
        role: 'Graphic Designer',
        org: 'Internship',
        points: [
          'User research, wireframes and prototypes in Figma.',
          'Worked with developers to implement designs and improve accessibility.',
          'Brand assets, illustrations and marketing material.',
        ],
      },
      {
        period: '2022 — 2026',
        role: 'B.Tech, Computer Science',
        org: 'Kalasalingam Academy of Research and Education',
        points: ['CGPA 8.62 / 10.', 'Data structures, algorithms, machine learning, DBMS, operating systems and networks.'],
      },
      {
        period: '2020 — 2022',
        role: 'Higher Secondary & Secondary',
        org: 'Edustar International School',
        points: ['12th: 75.5% (2022) · 10th: 77.2% (2020)'],
      },
    ],
  },
  work: {
    label: 'Work',
    source: 'GitHub',
    prototype: 'Figma prototype',
    company: 'Company',
    platform: 'Platform',
    modules: 'Modules',
    stack: 'Stack',
    role: 'My role',
    projects: [
      {
        title: 'Hexigo ERP',
        summary:
          'A fleet and logistics platform that lets trucking companies run trips, trucks, drivers, fuel, tolls, payments, invoices and customers from one place. I worked across the full stack: redesigned the UI across every module, delivered the Android/iOS apps, built GPS sync with four OEM telematics APIs, designed trip billing and payments, and wrote most of the automated tests.',
        platform: 'Web dashboard + Android/iOS apps',
        modules: 'Trips · Payments · Live tracking · Fuel & tolls · Documents · Reports',
        role: '820 commits over 7 months, one of the two most active of about 15 developers · 180+ test files',
      },
      {
        title: 'Hexigo CRM',
        summary:
          'An internal sales CRM that gives Hexaennea\u2019s sales team one place for leads, follow-ups and rep performance. I built the first version: a revenue dashboard, a drag-and-drop lead pipeline, contacts, tasks, a dialer and team management, on a Postgres schema with row-level security, role-based access and automatic lead assignment.',
        platform: 'Web app',
        modules: 'Dashboard · Lead pipeline · Contacts · Tasks · Dialer · Team',
        role: 'Wrote the first version (about 16,000 lines), then maintained it and reviewed and merged all 9 feature PRs',
      },
      {
        title: 'Hex Attendance',
        summary:
          'An internal attendance, leave and payroll portal that replaced spreadsheets at Hexaennea. Employees check in and out, apply for leave or permission and download payslips; admins see each session\u2019s active and idle time, approve requests, onboard staff and track salary expense. I designed, built and deployed it on my own.',
        platform: 'Web portal (employee + admin views)',
        modules: 'Check-in & sessions · Leave & permissions · Comp-off & LOP · Payroll & payslips · Holidays · Assets · Roles',
        role: 'Sole developer: 54 commits, about 15,000 lines · cut a background load of 1,000+ database requests a day to almost zero',
      },
      {
        title: 'Plant Disease Recognition',
        summary:
          "Identifies 38 leaf diseases from a single photo with 98.49% accuracy, using a CNN built on EfficientNet. Gemini explains the treatment in the farmer's language, with text-to-speech.",
      },
      {
        title: 'AI Code Compiler',
        summary:
          'A mobile IDE that compiles and debugs code in many languages through the JDoodle API, with Gemini Flash suggesting fixes in real time.',
      },
      {
        title: 'Path to Peace',
        summary:
          'A Flutter app for children that estimates stress from wearable sensor data and guides them through yoga, music, art and cognitive exercises.',
      },
      {
        title: 'Forest Fire Prediction',
        summary:
          'Predicts forest-fire risk from temperature, humidity, wind speed and rainfall, and shows risk levels for early warning.',
      },
      {
        title: 'USEAPP',
        summary: 'UI/UX for a messaging app in Figma: information architecture, components and an interactive prototype.',
      },
    ],
  },
  skills: {
    label: 'Skills',
    groups: ['Frontend', 'Backend', 'Data & Security', 'Design', 'Mobile & AI', 'Tools'],
  },
  certs: {
    label: 'Certifications',
  },
  contact: {
    label: 'Contact',
    title: 'Hiring, or have a project in mind?',
    intro: 'Email or call me directly, or send a message with the form. I reply by email.',
    phone: 'Phone',
    call: 'Call',
    whatsapp: 'WhatsApp',
    copy: 'Copy email',
    copied: 'Copied',
    formTitle: 'Write to me',
    formNote: 'Your message comes straight to my inbox.',
    name: 'Name',
    email: 'Email',
    message: 'Message',
    send: 'Send message',
    sending: 'Sending…',
    invalid: 'Please fill in your name, a valid email and a message.',
    success: 'Thank you. Your message has been sent.',
    error: 'The message could not be sent. Please email me at',
  },
};

export type Content = typeof en;
