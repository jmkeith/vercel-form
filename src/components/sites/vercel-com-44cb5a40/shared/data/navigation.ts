import type { FooterColumn, NavLinkItem, NavMenu } from "../types";

export const SITE_URL = "https://vercel.com";

export const navMenus: NavMenu[] = [
  {
    "label": "Products",
    "columns": [
      {
        "label": "Agent Stack",
        "links": [
          {
            "label": "AI SDK",
            "href": "https://vercel.com/ai-sdk"
          },
          {
            "label": "AI Gateway",
            "href": "https://vercel.com/ai-gateway"
          },
          {
            "label": "Sandbox",
            "href": "https://vercel.com/sandbox"
          },
          {
            "label": "Passport",
            "href": "https://vercel.com/passport"
          },
          {
            "label": "Connect",
            "href": "https://vercel.com/connect"
          },
          {
            "label": "eve",
            "href": "https://vercel.com/eve"
          }
        ]
      },
      {
        "label": "Core Platform",
        "links": [
          {
            "label": "Security",
            "href": "https://vercel.com/security"
          },
          {
            "label": "Content Delivery",
            "href": "https://vercel.com/cdn"
          },
          {
            "label": "Fluid Compute",
            "href": "https://vercel.com/fluid"
          },
          {
            "label": "Observability",
            "href": "https://vercel.com/products/observability"
          },
          {
            "label": "Workflows",
            "href": "https://vercel.com/workflows"
          },
          {
            "label": "CI/CD",
            "href": "https://vercel.com/products/previews"
          }
        ]
      },
      {
        "label": "Tools",
        "links": [
          {
            "label": "Next.js",
            "href": "https://vercel.com/frameworks/nextjs"
          },
          {
            "label": "Vercel Agent",
            "href": "https://vercel.com/agent"
          },
          {
            "label": "Vercel Plugin",
            "href": "https://vercel.com/plugin"
          },
          {
            "label": "Open Source",
            "href": "https://vercel.com/oss"
          },
          {
            "label": "Domains",
            "href": "https://vercel.com/domains",
            "external": true
          },
          {
            "label": "v0",
            "href": "https://v0.app",
            "external": true
          }
        ]
      }
    ]
  },
  {
    "label": "Resources",
    "columns": [
      {
        "label": "Learn",
        "links": [
          {
            "label": "Docs",
            "href": "https://vercel.com/docs"
          },
          {
            "label": "About",
            "href": "https://vercel.com/about"
          },
          {
            "label": "Blog",
            "href": "https://vercel.com/blog"
          },
          {
            "label": "Changelog",
            "href": "https://vercel.com/changelog"
          },
          {
            "label": "Knowledge Base",
            "href": "https://vercel.com/kb"
          }
        ]
      },
      {
        "label": "Build",
        "links": [
          {
            "label": "AI Apps",
            "href": "https://vercel.com/ai"
          },
          {
            "label": "Web Apps",
            "href": "https://vercel.com/for/web-apps"
          },
          {
            "label": "Marketing Sites",
            "href": "https://vercel.com/solutions/marketing-sites"
          },
          {
            "label": "Platforms",
            "href": "https://vercel.com/solutions/multi-tenant-saas"
          },
          {
            "label": "Commerce",
            "href": "https://vercel.com/for/retail"
          }
        ]
      },
      {
        "label": "Explore",
        "links": [
          {
            "label": "Customers",
            "href": "https://vercel.com/customers"
          },
          {
            "label": "Marketplace",
            "href": "https://vercel.com/marketplace"
          },
          {
            "label": "Partner Finder",
            "href": "https://vercel.com/partners/solution-partners"
          },
          {
            "label": "AWS",
            "href": "https://vercel.com/partners/aws"
          },
          {
            "label": "Community",
            "href": "https://community.vercel.com/",
            "external": true
          }
        ]
      }
    ]
  }
];

export const navLinks: NavLinkItem[] = [
  {
    "label": "Enterprise",
    "href": "https://vercel.com/enterprise"
  },
  {
    "label": "Pricing",
    "href": "https://vercel.com/pricing"
  }
];

export const footerColumns: FooterColumn[] = [
  {
    "label": "Agent Stack",
    "links": [
      {
        "label": "AI SDK",
        "href": "https://vercel.com/ai-sdk"
      },
      {
        "label": "AI Gateway",
        "href": "https://vercel.com/ai-gateway"
      },
      {
        "label": "Sandbox",
        "href": "https://vercel.com/sandbox"
      },
      {
        "label": "Workflows",
        "href": "https://vercel.com/workflows"
      },
      {
        "label": "Connect",
        "href": "https://vercel.com/connect",
        "isNew": true
      },
      {
        "label": "Passport",
        "href": "https://vercel.com/passport",
        "isNew": true
      },
      {
        "label": "eve",
        "href": "https://vercel.com/eve",
        "isNew": true
      }
    ]
  },
  {
    "label": "Core Platform",
    "links": [
      {
        "label": "CI/CD",
        "href": "https://vercel.com/products/previews"
      },
      {
        "label": "Content Delivery",
        "href": "https://vercel.com/cdn"
      },
      {
        "label": "Fluid Compute",
        "href": "https://vercel.com/fluid"
      },
      {
        "label": "Observability",
        "href": "https://vercel.com/products/observability"
      }
    ]
  },
  {
    "label": "Security",
    "links": [
      {
        "label": "Platform Security",
        "href": "https://vercel.com/security"
      },
      {
        "label": "WAF",
        "href": "https://vercel.com/security/web-application-firewall"
      },
      {
        "label": "Bot Management",
        "href": "https://vercel.com/security/bot-management"
      },
      {
        "label": "BotID",
        "href": "https://vercel.com/botid"
      }
    ]
  },
  {
    "label": "Tools",
    "links": [
      {
        "label": "Vercel Drop",
        "href": "https://vercel.com/drop",
        "isNew": true
      },
      {
        "label": "Vercel Agent",
        "href": "https://vercel.com/agent"
      },
      {
        "label": "Vercel Plugin",
        "href": "https://vercel.com/plugin",
        "isNew": true
      },
      {
        "label": "Agent Skills",
        "href": "https://skills.sh"
      },
      {
        "label": "Domains",
        "href": "https://vercel.com/domains"
      },
      {
        "label": "v0",
        "href": "https://v0.app"
      }
    ]
  },
  {
    "label": "Frameworks",
    "links": [
      {
        "label": "eve",
        "href": "https://eve.dev/",
        "isNew": true
      },
      {
        "label": "Next.js",
        "href": "https://vercel.com/frameworks/nextjs"
      },
      {
        "label": "Nuxt",
        "href": "https://vercel.com/docs/frameworks/full-stack/nuxt"
      },
      {
        "label": "SvelteKit",
        "href": "https://vercel.com/docs/frameworks/full-stack/sveltekit"
      },
      {
        "label": "Nitro",
        "href": "https://vercel.com/docs/frameworks/backend/nitro"
      },
      {
        "label": "Turborepo",
        "href": "https://vercel.com/solutions/turborepo"
      },
      {
        "label": "Tanstack Start",
        "href": "https://vercel.com/docs/frameworks/full-stack/tanstack-start"
      },
      {
        "label": "FastAPI",
        "href": "https://vercel.com/docs/frameworks/backend/fastapi"
      },
      {
        "label": "All frameworks",
        "href": "https://vercel.com/docs/frameworks"
      }
    ]
  },
  {
    "label": "SDKs",
    "links": [
      {
        "label": "Vercel SDK",
        "href": "https://vercel.com/docs/rest-api/sdk"
      },
      {
        "label": "Workflow SDK",
        "href": "https://vercel.com/workflows",
        "isNew": true
      },
      {
        "label": "Flags SDK",
        "href": "https://vercel.com/docs/flags/flags-sdk-reference"
      },
      {
        "label": "Chat SDK",
        "href": "https://vercel.com/chat",
        "isNew": true
      },
      {
        "label": "Queues SDK",
        "href": "https://vercel.com/docs/queues/sdk",
        "isNew": true
      },
      {
        "label": "Streamdown",
        "href": "https://streamdown.ai"
      }
    ]
  },
  {
    "label": "Build",
    "links": [
      {
        "label": "AI Apps",
        "href": "https://vercel.com/solutions/ai-apps"
      },
      {
        "label": "Web Apps",
        "href": "https://vercel.com/for/web-apps"
      },
      {
        "label": "Marketing Sites",
        "href": "https://vercel.com/solutions/marketing-sites"
      },
      {
        "label": "Platforms",
        "href": "https://vercel.com/solutions/multi-tenant-saas"
      },
      {
        "label": "Commerce",
        "href": "https://vercel.com/solutions/composable-commerce"
      },
      {
        "label": "Platform Engineers",
        "href": "https://vercel.com/solutions/platform-engineering"
      },
      {
        "label": "Design Engineers",
        "href": "https://vercel.com/solutions/design-engineering"
      }
    ]
  },
  {
    "label": "Learn",
    "links": [
      {
        "label": "Docs",
        "href": "https://vercel.com/docs"
      },
      {
        "label": "Blog",
        "href": "https://vercel.com/blog"
      },
      {
        "label": "Changelog",
        "href": "https://vercel.com/changelog"
      },
      {
        "label": "Knowledge Base",
        "href": "https://vercel.com/kb"
      },
      {
        "label": "Academy",
        "href": "https://vercel.com/academy"
      },
      {
        "label": "Articles",
        "href": "https://vercel.com/i"
      },
      {
        "label": "Community",
        "href": "https://community.vercel.com"
      },
      {
        "label": "Is Agentic",
        "href": "https://is-agentic.com"
      }
    ]
  },
  {
    "label": "Explore",
    "links": [
      {
        "label": "Customers",
        "href": "https://vercel.com/customers"
      },
      {
        "label": "Marketplace",
        "href": "https://vercel.com/marketplace"
      },
      {
        "label": "Templates",
        "href": "https://vercel.com/templates"
      },
      {
        "label": "Partner Finder",
        "href": "https://vercel.com/partners/solution-partners"
      },
      {
        "label": "Vercel + AWS",
        "href": "https://vercel.com/partners/aws"
      }
    ]
  },
  {
    "label": "Company",
    "links": [
      {
        "label": "About",
        "href": "https://vercel.com/about"
      },
      {
        "label": "Careers",
        "href": "https://vercel.com/careers"
      },
      {
        "label": "Press",
        "href": "https://vercel.com/press"
      },
      {
        "label": "Events",
        "href": "https://vercel.com/events"
      },
      {
        "label": "Startups",
        "href": "https://vercel.com/startups"
      },
      {
        "label": "Shipped on Vercel",
        "href": "https://vercel.com/shipped"
      },
      {
        "label": "Open Source Program",
        "href": "https://vercel.com/open-source-program"
      },
      {
        "label": "Enterprise",
        "href": "https://vercel.com/enterprise"
      },
      {
        "label": "Pricing",
        "href": "https://vercel.com/pricing"
      },
      {
        "label": "Help",
        "href": "https://vercel.com/help"
      }
    ]
  },
  {
    "label": "Legal & Trust",
    "links": [
      {
        "label": "Privacy Policy",
        "href": "https://vercel.com/legal/privacy-policy"
      },
      {
        "label": "Terms of Service",
        "href": "https://vercel.com/legal/terms"
      },
      {
        "label": "Cookie Policy",
        "href": "https://vercel.com/legal/cookie-policy"
      },
      {
        "label": "DPA",
        "href": "https://vercel.com/legal/dpa"
      },
      {
        "label": "Acceptable Use Policy",
        "href": "https://vercel.com/legal/acceptable-use-policy"
      },
      {
        "label": "Legal (all documents)",
        "href": "https://vercel.com/legal"
      },
      {
        "label": "Trust Center",
        "href": "https://security.vercel.com"
      },
      {
        "label": "Status",
        "href": "https://www.vercel-status.com"
      },
      {
        "label": "Cookie Preferences"
      }
    ]
  },
  {
    "label": "Social",
    "links": [
      {
        "label": "GitHub",
        "href": "https://github.com/vercel"
      },
      {
        "label": "X",
        "href": "https://x.com/vercel"
      },
      {
        "label": "LinkedIn",
        "href": "https://linkedin.com/company/vercel"
      },
      {
        "label": "YouTube",
        "href": "https://youtube.com/@VercelHQ"
      },
      {
        "label": "Instagram",
        "href": "https://www.instagram.com/vercel/"
      }
    ]
  }
];
