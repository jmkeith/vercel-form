"use client";

import { chakra, useSlotRecipe } from "@chakra-ui/react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { LuMonitor, LuMoon, LuSun } from "react-icons/lu";
import { footerColumns, SITE_URL } from "./data/navigation";
import { AgentViewIcon, LogoIcon } from "./icons";
import { siteFooterRecipe } from "./theme/recipes/site-footer.recipe";

const themeOptions = [
  { value: "system", Icon: LuMonitor },
  { value: "light", Icon: LuSun },
  { value: "dark", Icon: LuMoon },
] as const;

const subscribeNoop = () => () => {};

// The stored theme is only known in the browser; render no selection until hydrated.
function useHydrated() {
  return useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );
}

export function SiteFooter() {
  const { theme, setTheme } = useTheme();
  const hydrated = useHydrated();
  const recipe = useSlotRecipe({ recipe: siteFooterRecipe });
  const styles = recipe();

  return (
    <chakra.div css={styles.root}>
      <chakra.footer css={styles.inner}>
        <nav aria-label="Vercel Directory">
          <chakra.div css={styles.grid}>
            {footerColumns.map((column) => (
              <chakra.div key={column.label} css={styles.column}>
                <chakra.h2 css={styles.heading}>{column.label}</chakra.h2>
                <chakra.ul css={styles.list}>
                  {column.links.map((link) => (
                    <chakra.li key={link.label} css={styles.item}>
                      {link.href ? (
                        <chakra.a css={styles.link} href={link.href}>
                          {link.label}
                          {link.isNew ? <chakra.span css={styles.badge}>New</chakra.span> : null}
                        </chakra.a>
                      ) : (
                        <chakra.button type="button" css={styles.link}>
                          {link.label}
                        </chakra.button>
                      )}
                    </chakra.li>
                  ))}
                </chakra.ul>
              </chakra.div>
            ))}
            <chakra.div css={styles.column}>
              <chakra.a css={styles.logoLink} href={`${SITE_URL}/home`} aria-label="Vercel">
                <LogoIcon width={16} height={14} />
              </chakra.a>
            </chakra.div>
          </chakra.div>
        </nav>

        <chakra.div css={styles.bottom}>
          <chakra.a css={styles.status} href="https://www.vercel-status.com">
            <chakra.span css={styles.statusDot} />
            <chakra.p css={styles.statusText}>Loading status…</chakra.p>
          </chakra.a>
          <chakra.div css={styles.tools}>
            <chakra.fieldset css={styles.themeSwitch}>
              <chakra.legend css={styles.themeLegend}>Select a display theme:</chakra.legend>
              {themeOptions.map(({ value, Icon }) => (
                <span key={value}>
                  <chakra.input
                    css={styles.themeInput}
                    type="radio"
                    name="theme"
                    id={`theme-${value}`}
                    aria-label={value}
                    checked={hydrated && theme === value}
                    onChange={() => setTheme(value)}
                  />
                  <chakra.label css={styles.themeOption} htmlFor={`theme-${value}`}>
                    <Icon size={16} />
                  </chakra.label>
                </span>
              ))}
            </chakra.fieldset>
            <chakra.button type="button" css={styles.agentButton} aria-label="View as AI agent">
              <AgentViewIcon />
            </chakra.button>
          </chakra.div>
        </chakra.div>
      </chakra.footer>
    </chakra.div>
  );
}
