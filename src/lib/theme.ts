import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

// Design tokens for the clone target. During /clone-website, replace these
// with the exact values extracted from the target site (hex / rgb / rgba as
// reported by getComputedStyle).
const config = defineConfig({
  theme: {
    tokens: {
      fonts: {
        heading: {
          value:
            "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif",
        },
        body: {
          value:
            "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif",
        },
        mono: {
          value: "var(--font-geist-mono), ui-monospace, monospace",
        },
      },
      colors: {
        // Neutral scale; Chakra's bg / fg / border semantic tokens derive from it.
        gray: {
          50: { value: "#fafafa" },
          100: { value: "#f5f5f5" },
          200: { value: "#e5e5e5" },
          300: { value: "#d4d4d4" },
          400: { value: "#a1a1a1" },
          500: { value: "#737373" },
          600: { value: "#525252" },
          700: { value: "#404040" },
          800: { value: "#262626" },
          900: { value: "#171717" },
          950: { value: "#0a0a0a" },
        },
      },
    },
    semanticTokens: {
      colors: {
        bg: {
          DEFAULT: {
            value: { _light: "{colors.white}", _dark: "{colors.gray.950}" },
          },
        },
        fg: {
          DEFAULT: {
            value: { _light: "{colors.gray.950}", _dark: "{colors.gray.50}" },
          },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
