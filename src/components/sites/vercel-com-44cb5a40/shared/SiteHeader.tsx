"use client";

import { chakra, useSlotRecipe } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LuChevronDown, LuEqual, LuX } from "react-icons/lu";
import { Button, ButtonLink } from "./Button";
import { navLinks, navMenus, SITE_URL } from "./data/navigation";
import { LogoIcon } from "./icons";
import { siteHeaderRecipe } from "./theme/recipes/site-header.recipe";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const recipe = useSlotRecipe({ recipe: siteHeaderRecipe });
  const styles = recipe({ scrolled, navOpen: openMenu !== null, mobileOpen });
  const activeMenu = navMenus.find((menu) => menu.label === openMenu);

  return (
    <>
      <chakra.header css={styles.root} onMouseLeave={() => setOpenMenu(null)}>
        <chakra.div css={styles.inner}>
          <chakra.a css={styles.logo} href={`${SITE_URL}/home`} aria-label="Vercel">
            <LogoIcon />
          </chakra.a>

          <chakra.nav css={styles.nav} aria-label="Main navigation">
            {navMenus.map((menu) => {
              const open = openMenu === menu.label;
              return (
                <chakra.button
                  key={menu.label}
                  type="button"
                  css={styles.navTrigger}
                  aria-expanded={open}
                  data-open={open ? "" : undefined}
                  onMouseEnter={() => setOpenMenu(menu.label)}
                  onClick={() => setOpenMenu(open ? null : menu.label)}
                >
                  {menu.label}
                  <chakra.span css={styles.navChevron}>
                    <LuChevronDown size={14} />
                  </chakra.span>
                </chakra.button>
              );
            })}
            {navLinks.map((link) => (
              <chakra.a
                key={link.label}
                css={styles.navLink}
                href={link.href}
                onMouseEnter={() => setOpenMenu(null)}
              >
                {link.label}
              </chakra.a>
            ))}
          </chakra.nav>

          <chakra.div css={styles.actions}>
            <chakra.div css={styles.desktopActions}>
              <chakra.button type="button" css={styles.search}>
                <chakra.span css={styles.searchLabel}>Search Documentation</chakra.span>
                <chakra.kbd css={styles.kbd}>⌘ K</chakra.kbd>
              </chakra.button>
              <Button type="button">
                <span>Ask AI</span>
              </Button>
              <ButtonLink href={`${SITE_URL}/login`}>
                <span>Log In</span>
              </ButtonLink>
              <ButtonLink href={`${SITE_URL}/signup`} variant="primary">
                <span>Sign Up</span>
              </ButtonLink>
            </chakra.div>
            <chakra.button
              type="button"
              css={styles.burger}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((value) => !value)}
            >
              {mobileOpen ? (
                <LuX size={24} strokeWidth={1.5} />
              ) : (
                <LuEqual size={24} strokeWidth={1.5} />
              )}
            </chakra.button>
          </chakra.div>
        </chakra.div>

        <chakra.div css={styles.panel} data-open={activeMenu ? "" : undefined}>
          <chakra.div css={styles.panelInner}>
            {activeMenu?.columns.map((column) => (
              <chakra.div key={column.label} css={styles.panelColumn}>
                <chakra.div css={styles.panelLabel}>{column.label}</chakra.div>
                <chakra.ul css={styles.panelList} aria-label={column.label}>
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <chakra.a css={styles.panelLink} href={link.href}>
                        <span data-part="text">{link.label}</span>
                        {link.external ? <span aria-hidden="true">↗</span> : null}
                      </chakra.a>
                    </li>
                  ))}
                </chakra.ul>
              </chakra.div>
            ))}
          </chakra.div>
        </chakra.div>

        <chakra.div css={styles.mobilePanel} role="dialog" aria-label="Navigation menu">
          <chakra.div css={styles.mobileInner}>
            <chakra.div css={styles.mobileList}>
              {navMenus.map((menu) => (
                <details key={menu.label}>
                  <chakra.summary css={styles.mobileItem}>
                    {menu.label}
                    <LuChevronDown size={24} strokeWidth={1.5} />
                  </chakra.summary>
                  <chakra.div css={styles.mobileGroups}>
                    {menu.columns.map((column) => (
                      <div key={column.label}>
                        <chakra.div css={styles.mobileGroupLabel}>{column.label}</chakra.div>
                        <ul aria-label={column.label}>
                          {column.links.map((link) => (
                            <li key={link.label}>
                              <chakra.a css={styles.mobileSubLink} href={link.href}>
                                {link.label}
                                {link.external ? " ↗" : null}
                              </chakra.a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </chakra.div>
                </details>
              ))}
              {navLinks.map((link) => (
                <chakra.a key={link.label} css={styles.mobileItem} href={link.href}>
                  {link.label}
                </chakra.a>
              ))}
            </chakra.div>
            <chakra.div css={styles.mobileActions}>
              <ButtonLink href={`${SITE_URL}/signup`} variant="primary" size="lg">
                <span>Sign Up</span>
              </ButtonLink>
              <ButtonLink href={`${SITE_URL}/login`} size="lg">
                <span>Log In</span>
              </ButtonLink>
            </chakra.div>
          </chakra.div>
        </chakra.div>
      </chakra.header>
      <chakra.div css={styles.overlay} data-open={activeMenu ? "" : undefined} />
    </>
  );
}
