export interface NavItem {
  label: string;
  href: string;
  badge?: number;
}

export interface NavGroup {
  group: string;
  items: NavItem[];
}

export const navGroups: NavGroup[] = [
  {
    group: 'Core HR',
    items: [
      { label: 'Dashboard',    href: '/dashboard'    },
      { label: 'Employees',    href: '/employees'    },
      { label: 'Organization', href: '/organization' },
      { label: 'Attendance',   href: '/attendance'   },
      { label: 'Leave',        href: '/leave',        badge: 8 },
      { label: 'Shifts',       href: '/shifts'        },
      { label: 'Documents',    href: '/documents'     },
    ],
  },
  {
    group: 'Lifecycle',
    items: [
      { label: 'Recruitment',  href: '/recruitment',  badge: 3 },
      { label: 'Onboarding',   href: '/onboarding'   },
      { label: 'Performance',  href: '/performance'  },
      { label: 'Training',     href: '/training'     },
      { label: 'Engagement',   href: '/engagement'   },
      { label: 'Promotions',   href: '/promotions'   },
      { label: 'Disciplinary', href: '/disciplinary' },
      { label: 'Offboarding',  href: '/offboarding'  },
    ],
  },
  {
    group: 'Finance & Compliance',
    items: [
      { label: 'Payroll',      href: '/payroll'      },
      { label: 'Compensation', href: '/compensation' },
      { label: 'Expenses',     href: '/expenses',     badge: 5 },
      { label: 'Statutory',    href: '/statutory'    },
      { label: 'Compliance',   href: '/compliance'   },
    ],
  },
  {
    group: 'HR Ops',
    items: [
      { label: 'Timesheets',   href: '/timesheets'   },
      { label: 'Assets',       href: '/assets'       },
      { label: 'Approvals',    href: '/approvals',    badge: 12 },
      { label: 'Helpdesk',     href: '/helpdesk'     },
      { label: 'Data Import',  href: '/data-import'  },
    ],
  },
  {
    group: 'Insights',
    items: [
      { label: 'Analytics',     href: '/analytics'     },
      { label: 'Insights',      href: '/insights'      },
      { label: 'AI Assistant',  href: '/ai-assistant'  },
    ],
  },
  {
    group: 'Administration',
    items: [
      { label: 'Benefits',      href: '/benefits'      },
      { label: 'Headcount',     href: '/headcount'     },
      { label: 'Contractors',   href: '/contractors'   },
      { label: 'Workflows',     href: '/workflows'     },
      { label: 'Integrations',  href: '/integrations'  },
      { label: 'Communications',href: '/communications'},
      { label: 'Security',      href: '/security'      },
      { label: 'Billing',       href: '/billing'       },
      { label: 'Settings',      href: '/settings'      },
    ],
  },
];
