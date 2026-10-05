export interface NavLinkItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface NavColumn {
  label: string;
  links: NavLinkItem[];
}

export interface NavMenu {
  label: string;
  columns: NavColumn[];
}

export interface FooterLink {
  label: string;
  /** Omitted for in-page actions, which render as buttons. */
  href?: string;
  isNew?: boolean;
}

export interface FooterColumn {
  label: string;
  links: FooterLink[];
}
