import type { Course } from "./types";

export const ACADEMY_BASE_URL = "https://vercel.com/academy";

export const hero = {
  "title": "Vercel Academy",
  "description": "Go from beginner to expert by learning the ins and outs of Vercel, Next.js, Turborepo, AI SDK and more to build fully functional apps that use all the latest features."
};

export const courses: Course[] = [
  {
    "slug": "agent-friendly-apis",
    "title": "Agent-Friendly APIs",
    "description": "Build a feedback API, then build a Claude Code skill that generates the documentation agents need to use it."
  },
  {
    "slug": "build-and-launch-with-ai",
    "title": "Build and Launch with AI",
    "description": "Build and launch a website for Small Hours Studio with AI. Start in v0, add workshop pages and an email inquiry form, and learn to publish your own updates with fx, GitHub, and Vercel. No coding experience required."
  },
  {
    "slug": "visual-workflow-builder-on-vercel",
    "title": "Build Visual Workflow Plugins on Vercel",
    "description": "Deploy a visual workflow builder on Vercel and extend it with plugins for the APIs you actually use. Learn Vercel Workflow fundamentals along the way."
  },
  {
    "slug": "build-ai-agent-harness",
    "title": "Build Your Own AI Coding Agent Harness",
    "description": "Build an AI coding agent harness from scratch using AI SDK, Vercel Sandbox, and just-bash. Covers the tool loop, tool design, system prompts, sandbox abstraction, context pruning, subagent delegation, lifecycle management, and extensibility."
  },
  {
    "slug": "ai-sdk",
    "title": "Builders Guide to the AI SDK",
    "description": "Build production-ready AI features with the AI SDK & Next.js. Learn LLMs, prompting, extraction, streaming, & more."
  },
  {
    "slug": "building-agents-with-eve",
    "title": "Building Agents with eve",
    "description": "Build a production bike shop dispatcher agent with eve, from its first typed tool to a deployed app behind Slack, a web dashboard, real auth, and human approval."
  },
  {
    "slug": "filesystem-agents",
    "title": "Building Filesystem Agents",
    "description": "Build a filesystem agent that uses bash tools and Vercel Sandbox to explore call transcripts and answer questions."
  },
  {
    "slug": "creating-a-software-factory",
    "title": "Creating a Software Factory",
    "description": "Build a risk-routed software factory that requires evidence before code changes and preserves human control over consequential decisions."
  },
  {
    "slug": "ai-summary-app-with-nextjs",
    "title": "Creating an AI Summary App with Next.js",
    "description": "Build an AI-powered summary application using Next.js App Router and the Vercel AI SDK. You'll implement text summarization, structured output, caching, and production-ready patterns."
  },
  {
    "slug": "enterprise-apps-agents",
    "title": "Enterprise Apps and Agents",
    "description": "Take an internal AI prototype from demo to rollout: assign owners, restrict access, test model behavior, and add human approval."
  },
  {
    "slug": "subscription-store",
    "title": "Launch a Subscription Store with Vercel and Stripe",
    "description": "Build a production-ready subscription storefront with Next.js 16, React 19, Supabase Auth, and Stripe. Learn authentication, payments, and access control."
  },
  {
    "slug": "make-decisions-with-jev",
    "title": "Make Decisions with Jev",
    "description": "Use Jev to route customer messages to the right team. Start with a working contact form, teach it who handles cancellations, and test your rules with different requests."
  },
  {
    "slug": "microfrontends-on-vercel",
    "title": "Microfrontends on Vercel",
    "description": "Build scalable, independent frontend applications with Vercel's microfrontends platform."
  },
  {
    "slug": "nextjs-foundations",
    "title": "Next.js Foundations",
    "description": "Prepare for the self-paced Foundations workshop. Across four sections you'll build a marketing app and a blog using Next.js and Vercel. This page covers the projects, prerequisites, and section roadmap."
  },
  {
    "slug": "nuxt-on-vercel",
    "title": "Nuxt on Vercel",
    "description": "Translate your React and Next.js skills to Nuxt. Build a hot springs finder app using idiomatic Nuxt patterns, from reactivity to auth to deployment."
  },
  {
    "slug": "optimize-your-vercel-account",
    "title": "Optimize Your Vercel Account",
    "description": "Audit and tune your Vercel account for security, cost, and operations."
  },
  {
    "slug": "production-monorepos",
    "title": "Production Monorepos with Turborepo",
    "description": "Build a production monorepo from idea to enterprise scale with Turborepo and Next.js."
  },
  {
    "slug": "python-on-vercel",
    "title": "Python on Vercel",
    "description": "Keep your Python stack and ship it with your frontend. Build a FastAPI + Next.js furniture app deployed as one Vercel project."
  },
  {
    "slug": "shadcn-ui",
    "title": "React UI with shadcn/ui + Radix + Tailwind",
    "description": "Learn the fundamentals of modern UI development with shadcn/ui. Master component libraries, Radix primitives, and build production-ready interfaces."
  },
  {
    "slug": "slack-agents",
    "title": "Slack Agents on Vercel with the AI SDK",
    "description": "Step-by-step course to build, deploy, and run a real Slack bot on Vercel using the AI SDK, with logging, safeguards, and an ops runbook for your team’s workspace."
  },
  {
    "slug": "svelte-on-vercel",
    "title": "Svelte on Vercel",
    "description": "Build production-ready SvelteKit applications on Vercel. Learn deployment, AI integration, workflows, and performance optimization."
  },
  {
    "slug": "ai-gateway",
    "title": "Using AI Gateway in Production",
    "description": "Learn how AI Gateway handles model access, routing, spend, privacy, developer tools, and production authentication."
  },
  {
    "slug": "v0-foundations",
    "title": "v0 Foundations",
    "description": "Build, customize, and ship a real website with v0. No code required."
  },
  {
    "slug": "vercel-foundations",
    "title": "Vercel Foundations",
    "description": "A 1-hour video series covering the most important Vercel concepts. Nine short sessions to get you productive on the platform."
  },
  {
    "slug": "vercel-sandbox",
    "title": "Vercel Sandbox",
    "description": "Learn how to safely execute untrusted code using Vercel Sandbox. Build a CLI code review agent that clones repositories, runs tests, and uses AI to analyze code for security and quality issues, all in an isolated environment."
  },
  {
    "slug": "workflow-foundations",
    "title": "Workflow Foundations",
    "description": "Learn the foundations of the Workflow SDK by building a pizza order tracker. Durable, resumable code with two directives and no state machines."
  }
];
