import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import { recipes, slotRecipes } from "./recipes";

const config = defineConfig({
  cssVarsPrefix: "vc",
  globalCss: {
    html: {
      height: "100%",
      backgroundColor: "ds.background.200",
      scrollBehavior: "smooth",
    },
    body: {
      display: "flex",
      flexDirection: "column",
      minHeight: "100%",
      fontFamily: "body",
      color: "ds.gray.1000",
      backgroundColor: "ds.page",
    },
  },
  theme: {
    breakpoints: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    tokens: {
      fonts: {
        body: {
          value:
            'var(--font-geist-sans), Arial, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        },
        heading: {
          value:
            'var(--font-geist-sans), Arial, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        },
        mono: {
          value:
            'var(--font-geist-mono), ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, Monaco, monospace',
        },
      },
      sizes: {
        header: { value: "64px" },
        content: { value: "1248px" },
        pageWithMargin: { value: "1448px" },
      },
      spacing: { pageMargin: { value: "24px" } },
      zIndex: { header: { value: 75 }, headerBelow: { value: 74 } },
    },
    // Light values are the page's default theme; `_dark` values are its dark theme.
    semanticTokens: {
      colors: {
        ds: {
          page: { value: { base: "#ffffff", _dark: "#000000" } },
          background: {
            100: { value: { base: "#ffffff", _dark: "#0a0a0a" } },
            200: { value: { base: "#fafafa", _dark: "#000000" } },
          },
          gray: {
            100: { value: { base: "#f2f2f2", _dark: "#1a1a1a" } },
            200: { value: { base: "#ebebeb", _dark: "#1f1f1f" } },
            400: { value: { base: "#ebebeb", _dark: "#2e2e2e" } },
            500: { value: { base: "#c9c9c9", _dark: "#454545" } },
            600: { value: { base: "#a8a8a8", _dark: "#878787" } },
            700: { value: { base: "#8f8f8f", _dark: "#8f8f8f" } },
            900: { value: { base: "#4d4d4d", _dark: "#a1a1a1" } },
            1000: { value: { base: "#171717", _dark: "#ededed" } },
          },
          grayAlpha: {
            100: { value: { base: "rgba(0, 0, 0, 0.05)", _dark: "rgba(255, 255, 255, 0.06)" } },
            200: { value: { base: "rgba(0, 0, 0, 0.08)", _dark: "rgba(255, 255, 255, 0.09)" } },
            300: { value: { base: "rgba(0, 0, 0, 0.1)", _dark: "rgba(255, 255, 255, 0.13)" } },
            400: { value: { base: "rgba(0, 0, 0, 0.08)", _dark: "rgba(255, 255, 255, 0.14)" } },
            500: { value: { base: "rgba(0, 0, 0, 0.21)", _dark: "rgba(255, 255, 255, 0.24)" } },
            600: { value: { base: "rgba(0, 0, 0, 0.34)", _dark: "rgba(255, 255, 255, 0.51)" } },
          },
          foreground: { value: { base: "#000000", _dark: "#ffffff" } },
          link: { value: { base: "hsl(211, 100%, 42%)", _dark: "hsl(210, 100%, 66%)" } },
          inputRing: { value: { base: "rgba(0, 0, 0, 0.16)", _dark: "rgba(255, 255, 255, 0.24)" } },
          primaryHover: { value: { base: "#383838", _dark: "#cccccc" } },
          secondary: { value: { base: "#666666", _dark: "#888888" } },
          error: { value: { base: "#cb2a2f", _dark: "#ff6166" } },
          focus: { value: { base: "hsl(212, 100%, 48%)", _dark: "hsl(210, 100%, 66%)" } },
          overlay: { value: { base: "rgba(250, 250, 250, 0.5)", _dark: "rgba(0, 0, 0, 0.5)" } },
          searchBg: { value: { base: "rgba(0, 0, 0, 0.05)", _dark: "rgba(255, 255, 255, 0.09)" } },
          kbd: { value: { base: "#fafafa", _dark: "#111111" } },
          badge: { value: { base: "#ebebeb", _dark: "#262626" } },
          footerBorder: { value: { base: "rgba(0, 0, 0, 0.08)", _dark: "rgba(255, 255, 255, 0.09)" } },
        },
      },
      shadows: {
        focusRing: {
          value: {
            base: "0 0 0 2px #ffffff, 0 0 0 4px hsl(212, 100%, 48%)",
            _dark: "0 0 0 2px #0a0a0a, 0 0 0 4px hsl(210, 100%, 66%)",
          },
        },
      },
    },
    recipes,
    slotRecipes,
  },
});

export const system = createSystem(defaultConfig, config);
