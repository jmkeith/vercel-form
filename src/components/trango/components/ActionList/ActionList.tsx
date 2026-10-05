"use client";

import {
  createSlotRecipeContext,
  mergeProps,
  Spinner,
  VisuallyHidden,
  type HTMLChakraProps,
} from "@chakra-ui/react";
import { useId, type MouseEvent, type ReactNode, type Ref } from "react";
import { GoAlert, GoCheck } from "react-icons/go";
import { Tooltip } from "@/components/ui/tooltip";
import { actionListSlotRecipe, type ActionListVariantProps } from "./ActionList.recipe";
import { rovingFocusProps } from "./rovingFocus";

const { withProvider, withContext, usePropsContext, PropsProvider } = createSlotRecipeContext({
  recipe: actionListSlotRecipe,
});

/** `true` for the values of `aria-current` that mark an element as the current one. */
export const isActionListCurrent = (value: HTMLChakraProps<"a">["aria-current"]) =>
  Boolean(value) && value !== "false";

// `""` sets a boolean data attribute, `undefined` leaves it off.
const flag = (on: unknown) => (on ? "" : undefined);

// Root
export interface ActionListRootProps extends HTMLChakraProps<"ul">, ActionListVariantProps {
  ref?: Ref<HTMLUListElement>;
}

type ListProps = ActionListRootProps;

// The options the items act on travel through the recipe's props context.
const ListRoot = withProvider<HTMLUListElement, ActionListRootProps>("ul", "root", {
  defaultProps: { role: "list" },
  wrapElement: (element, { role, selectionVariant }) => (
    <PropsProvider value={{ role, selectionVariant }}>{element}</PropsProvider>
  ),
});

/** What `Item` and `Group` need to know about the list they are in. */
function useList() {
  const { role, selectionVariant }: ActionListRootProps = usePropsContext();
  return { role, selectionVariant, isMenu: role === "menu" || role === "listbox" };
}

/**
 * Resolves the recipe (`variant`, `showDividers`, `selectionVariant`, `size`) and shares its
 * styles with every part. With `role="menu"` or `role="listbox"` the list is one tab stop and
 * the arrow keys move between its items.
 */
export function ActionListRoot(props: ListProps) {
  const roving = props.role === "menu" || props.role === "listbox";
  return <ListRoot {...(roving ? mergeProps<ListProps>(rovingFocusProps, props) : props)} />;
}

export interface ActionListHeadingProps extends HTMLChakraProps<"h2"> {
  size?: "small" | "medium" | "large";
}
const HeadingTitle = withContext<HTMLHeadingElement, HTMLChakraProps<"h2">>("h2", "heading");

/** Title of the list: an `h2` (change the level with `as`), inside a presentational item. */
export function ActionListHeading({ size, ...props }: ActionListHeadingProps) {
  return (
    <li role="presentation">
      <HeadingTitle data-size={size} {...props} />
    </li>
  );
}

// Rows
export type ActionListItemRootProps = HTMLChakraProps<"li">;
/** The bare row, for composing a custom item. Takes `data-current`, `data-disabled`, ... */
export const ActionListItemRoot = withContext<HTMLLIElement, ActionListItemRootProps>(
  "li",
  "item",
);

export type ActionListItemButtonProps = HTMLChakraProps<"button">;
export const ActionListItemButton = withContext<HTMLButtonElement, ActionListItemButtonProps>(
  "button",
  "itemContent",
  { defaultProps: { type: "button" } },
);

export type ActionListItemLinkProps = HTMLChakraProps<"a">;
export const ActionListItemLink = withContext<HTMLAnchorElement, ActionListItemLinkProps>(
  "a",
  "itemContent",
);

const ItemIndicator = withContext<HTMLSpanElement, HTMLChakraProps<"span">>(
  "span",
  "itemIndicator",
  { defaultProps: { "aria-hidden": true } },
);
const ItemStatus = withContext<HTMLSpanElement, HTMLChakraProps<"span">>("span", "itemStatus");
const InactiveText = withContext<HTMLSpanElement, HTMLChakraProps<"span">>("span", "inactiveText");

/** Wraps a label that is more than one run of text, e.g. `<strong>21</strong> watching`. */
export type ActionListItemLabelProps = HTMLChakraProps<"span">;
export const ActionListItemLabel = withContext<HTMLSpanElement, ActionListItemLabelProps>(
  "span",
  "itemLabel",
);

export type ActionListLeadingVisualProps = HTMLChakraProps<"span">;
export const ActionListLeadingVisual = withContext<HTMLSpanElement, ActionListLeadingVisualProps>(
  "span",
  "leadingVisual",
);

export type ActionListTrailingVisualProps = HTMLChakraProps<"span">;
export const ActionListTrailingVisual = withContext<
  HTMLSpanElement,
  ActionListTrailingVisualProps
>("span", "trailingVisual");

export interface ActionListDescriptionProps extends HTMLChakraProps<"span"> {
  /** `inline` sits beside the label, `block` under it. */
  variant?: "inline" | "block";
}
const DescriptionText = withContext<HTMLSpanElement, HTMLChakraProps<"span">>(
  "span",
  "description",
);

/** Secondary text of a row. Cut it off with an ellipsis through the `truncate` style prop. */
export function ActionListDescription(props: ActionListDescriptionProps) {
  const { variant = "inline", ...rest } = props;
  return <DescriptionText data-variant={variant} {...rest} />;
}

interface ItemOptions {
  /** Highlights the row as the current one and sets `aria-current`. */
  active?: boolean;
  /** Keeps the row visible but unusable, and explains why. */
  inactiveText?: string;
  /** An `ActionList.TrailingAction`, rendered beside the row's own control. */
  trailingAction?: ReactNode;
}

// The spinner or the "why is this inactive" note at the end of a row.
function itemStatus(loading?: boolean, inactiveText?: string, isMenu?: boolean) {
  if (inactiveText && !isMenu) return <InactiveText>{inactiveText}</InactiveText>;
  if (inactiveText) {
    return (
      <Tooltip content={inactiveText}>
        <ItemStatus>
          <GoAlert />
          <VisuallyHidden>{inactiveText}</VisuallyHidden>
        </ItemStatus>
      </Tooltip>
    );
  }
  if (!loading) return null;
  return (
    <ItemStatus>
      <Spinner size="sm" />
      <VisuallyHidden>Loading</VisuallyHidden>
    </ItemStatus>
  );
}

export interface ActionListItemProps
  extends Omit<ActionListItemButtonProps, "onSelect">,
    ItemOptions {
  ref?: Ref<HTMLButtonElement>;
  /** Checks the row's indicator when the list has a `selectionVariant`. */
  selected?: boolean;
  disabled?: boolean;
  loading?: boolean;
  variant?: "default" | "danger";
  /** Called on click, Enter and Space, unless the row is disabled, inactive or loading. */
  onSelect?: (event: MouseEvent<HTMLButtonElement>) => void;
}

/**
 * A row that does something. Children are the label text plus any `LeadingVisual`,
 * `TrailingVisual` and `Description`. Its role and checked state follow the list's `role` and
 * `selectionVariant`.
 */
export function ActionListItem(props: ActionListItemProps) {
  const {
    selected = false,
    active,
    disabled,
    loading,
    inactiveText,
    variant,
    trailingAction,
    onSelect,
    children,
    ...rest
  } = props;
  const { role, selectionVariant, isMenu } = useList();
  const unusable = Boolean(disabled || inactiveText);

  let selection: ActionListItemButtonProps = selectionVariant ? { "aria-pressed": selected } : {};
  if (role === "listbox") selection = { role: "option", "aria-selected": selected };
  else if (role === "menu" && selectionVariant) {
    const itemRole = selectionVariant === "multiple" ? "menuitemcheckbox" : "menuitemradio";
    selection = { role: itemRole, "aria-checked": selected };
  } else if (role === "menu") selection = { role: "menuitem" };

  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (unusable || loading) event.preventDefault();
    else onSelect?.(event);
  };

  return (
    <ActionListItemRoot
      role={isMenu ? "none" : undefined}
      data-current={flag(active)}
      data-disabled={flag(unusable)}
      data-inactive={flag(inactiveText)}
      data-loading={flag(loading)}
      data-variant={variant}
    >
      <ActionListItemButton
        tabIndex={isMenu ? -1 : undefined}
        aria-current={active || undefined}
        aria-disabled={unusable || undefined}
        aria-busy={loading || undefined}
        {...selection}
        {...mergeProps(rest, { onClick })}
      >
        {selectionVariant ? (
          <ItemIndicator data-checked={flag(selected)} data-disabled={flag(unusable)}>
            <GoCheck />
          </ItemIndicator>
        ) : null}
        {children}
        {itemStatus(loading, inactiveText, isMenu)}
      </ActionListItemButton>
      {trailingAction}
    </ActionListItemRoot>
  );
}

export interface ActionListLinkItemProps extends ActionListItemLinkProps, ItemOptions {
  ref?: Ref<HTMLAnchorElement>;
}

/** A row that navigates. Pass a router link through `as` (or `asChild`). */
export function ActionListLinkItem(props: ActionListLinkItemProps) {
  const { active, inactiveText, trailingAction, children, ...rest } = props;
  const current = rest["aria-current"] ?? (active ? "page" : undefined);

  return (
    <ActionListItemRoot
      data-current={flag(isActionListCurrent(current))}
      data-disabled={flag(inactiveText)}
      data-inactive={flag(inactiveText)}
    >
      <ActionListItemLink
        {...rest}
        aria-current={current}
        aria-disabled={inactiveText ? true : undefined}
      >
        {children}
        {itemStatus(false, inactiveText)}
      </ActionListItemLink>
      {trailingAction}
    </ActionListItemRoot>
  );
}

export interface ActionListTrailingActionProps extends HTMLChakraProps<"button"> {
  /** Swaps the content for a spinner and blocks the action. */
  loading?: boolean;
}
const TrailingActionButton = withContext<HTMLButtonElement, HTMLChakraProps<"button">>(
  "button",
  "trailingAction",
  { defaultProps: { type: "button" } },
);

/**
 * Second control of a row, given to an item's `trailingAction`. Children are an icon (with an
 * `aria-label`, which also shows as a tooltip) or a short text. Render a link with `asChild`.
 */
export function ActionListTrailingAction(props: ActionListTrailingActionProps) {
  const { loading, children, ...rest } = props;
  const label = rest["aria-label"];
  return (
    <Tooltip content={label} disabled={!label} positioning={{ placement: "left" }}>
      <TrailingActionButton aria-disabled={loading || undefined} aria-busy={loading} {...rest}>
        {loading ? <Spinner size="sm" /> : children}
      </TrailingActionButton>
    </Tooltip>
  );
}

// Structure
export type ActionListDividerProps = HTMLChakraProps<"li">;
export const ActionListDivider = withContext<HTMLLIElement, ActionListDividerProps>(
  "li",
  "divider",
  { defaultProps: { role: "presentation", "aria-hidden": true } },
);

export interface ActionListGroupHeadingProps extends HTMLChakraProps<"div"> {
  /** `filled` gives the heading a tinted, bordered band. */
  variant?: "subtle" | "filled";
}
const GroupHeadingText = withContext<HTMLDivElement, HTMLChakraProps<"div">>(
  "div",
  "groupHeading",
);

/** Heading of a `Group`. Renders a `div`; make it a real heading with `as="h3"`. */
export function ActionListGroupHeading({ variant, ...props }: ActionListGroupHeadingProps) {
  return <GroupHeadingText data-variant={variant} {...props} />;
}

const GroupRoot = withContext<HTMLLIElement, HTMLChakraProps<"li">>("li", "group");
const GroupList = withContext<HTMLUListElement, HTMLChakraProps<"ul">>("ul", "groupList");

export interface ActionListGroupProps extends Omit<HTMLChakraProps<"li">, "title"> {
  /** Heading shown above the group's rows; it also names the group. */
  title?: ReactNode;
  headingProps?: ActionListGroupHeadingProps;
}

/** A set of related rows: an item of the list holding its own heading and list. */
export function ActionListGroup({ title, headingProps, children, ...props }: ActionListGroupProps) {
  const { isMenu } = useList();
  const hasTitle = title != null;
  const headingId = `${useId()}-heading`;

  return (
    <GroupRoot role={isMenu ? "none" : undefined} {...props}>
      {hasTitle ? (
        <ActionListGroupHeading id={headingId} {...headingProps}>
          {title}
        </ActionListGroupHeading>
      ) : null}
      <GroupList
        role={isMenu ? "group" : undefined}
        aria-labelledby={hasTitle ? headingId : undefined}
      >
        {children}
      </GroupList>
    </GroupRoot>
  );
}
