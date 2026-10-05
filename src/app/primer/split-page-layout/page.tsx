"use client";

import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { SplitPageLayout } from "@/components/trango/components/SplitPageLayout";

/** Keeps sticky panes below the site's 64px sticky header. */
const STICKY_OFFSET = { "--page-layout-sticky-offset": "64px" };

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at enim id lorem tempus egestas a " +
  "non ipsum. Maecenas imperdiet ante quam, at varius lorem molestie vel. Sed at eros consequat, " +
  "varius tellus et, auctor felis. Donec pulvinar lacinia urna nec commodo. Phasellus at imperdiet " +
  "risus. Donec sit amet massa purus.";

const NAV_ITEMS = ["Profile", "Account", "Emails", "Notifications"];

function Placeholder({ label, height }: { label: string; height?: number }) {
  return (
    <Flex
      align="center"
      justify="center"
      minHeight={height === undefined ? undefined : `${height}px`}
      padding="8px"
      borderWidth="1px"
      borderStyle="dashed"
      borderColor="border.emphasized"
      borderRadius="6px"
      backgroundColor="bg.subtle"
      color="fg.muted"
      fontSize="14px"
      textAlign="center"
    >
      {label}
    </Flex>
  );
}

function Paragraphs({ count }: { count: number }) {
  return (
    <Stack gap="16px">
      {Array.from({ length: count }, (_, index) => (
        <Text key={index} fontSize="14px" lineHeight="20px">
          {LOREM}
        </Text>
      ))}
    </Stack>
  );
}

function Navigation() {
  return (
    <Stack as="ul" gap="4px" aria-label="Main navigation">
      {NAV_ITEMS.map((item) => (
        <Box
          as="li"
          key={item}
          padding="6px 8px"
          borderRadius="6px"
          fontSize="14px"
          lineHeight="20px"
          fontWeight={item === "Account" ? "600" : "400"}
          backgroundColor={item === "Account" ? "bg.muted" : "transparent"}
        >
          {item}
        </Box>
      ))}
    </Stack>
  );
}

function Demo({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Box as="section">
      <Box paddingInline="24px" paddingBlock="16px">
        <Heading as="h2" fontSize="20px" lineHeight="28px" fontWeight="600">
          {title}
        </Heading>
        <Text marginTop="4px" fontSize="14px" lineHeight="20px" color="fg.muted">
          {description}
        </Text>
      </Box>
      {/* No overflow on the frame: it would break `position: sticky` inside. */}
      <Box borderBlock="1px solid" borderColor="border">
        {children}
      </Box>
    </Box>
  );
}

export default function SplitPageLayoutDemoPage() {
  return (
    <Box as="main" width="100%" paddingBlock="24px">
      <Box paddingInline="24px" paddingBottom="8px">
        <Heading as="h1" fontSize="32px" lineHeight="40px" fontWeight="600">
          SplitPageLayout
        </Heading>
        <Text marginTop="8px" color="fg.muted">
          PageLayout with full width, no outer spacing, line dividers, padded parts and a sticky
          start pane by default. Resize the window to see the pane stack below 768px.
        </Text>
      </Box>

      <Stack gap="32px">
        <Demo
          title="Default"
          description="Header, sticky start pane, content and footer with SplitPageLayout's defaults. The pane sticks below the site header (--page-layout-sticky-offset: 64px) while the content scrolls."
        >
          <SplitPageLayout.Root css={STICKY_OFFSET}>
            <SplitPageLayout.Header>
              <Placeholder label="Header" height={64} />
            </SplitPageLayout.Header>
            <SplitPageLayout.Pane aria-label="Navigation pane">
              <Navigation />
              <Box marginTop="16px">
                <Placeholder label="Pane (start, sticky)" height={120} />
              </Box>
            </SplitPageLayout.Pane>
            <SplitPageLayout.Content as="div">
              <Stack gap="16px">
                <Placeholder label='Content (contentWidth="large")' height={120} />
                <Paragraphs count={16} />
              </Stack>
            </SplitPageLayout.Content>
            <SplitPageLayout.Footer>
              <Placeholder label="Footer" height={64} />
            </SplitPageLayout.Footer>
          </SplitPageLayout.Root>
        </Demo>

        <Demo
          title="Resizable pane"
          description="Drag the divider, or focus it and use the arrow keys. Double-click resets. The width is saved to localStorage."
        >
          <SplitPageLayout.Root sticky={false}>
            <SplitPageLayout.Header>
              <Placeholder label="Header" height={64} />
            </SplitPageLayout.Header>
            <SplitPageLayout.Pane
              resizable
              widthStorageKey="primer-demo.split-page-layout.pane"
              aria-label="Resizable pane"
            >
              <Placeholder label="Pane (resizable)" height={240} />
            </SplitPageLayout.Pane>
            <SplitPageLayout.Content as="div">
              <Placeholder label="Content" height={400} />
            </SplitPageLayout.Content>
            <SplitPageLayout.Footer>
              <Placeholder label="Footer" height={64} />
            </SplitPageLayout.Footer>
          </SplitPageLayout.Root>
        </Demo>

        <Demo
          title="Pane at end, without dividers"
          description='panePosition="end", every divider set to "none", condensed regionPadding and a full-width content.'
        >
          <SplitPageLayout.Root
            sticky={false}
            panePosition="end"
            contentWidth="full"
            regionPadding="condensed"
            headerDivider="none"
            paneDivider="none"
            footerDivider="none"
          >
            <SplitPageLayout.Header>
              <Placeholder label="Header" height={64} />
            </SplitPageLayout.Header>
            <SplitPageLayout.Content as="div">
              <Placeholder label='Content (contentWidth="full")' height={300} />
            </SplitPageLayout.Content>
            <SplitPageLayout.Pane aria-label="End pane">
              <Placeholder label="Pane (end)" height={200} />
            </SplitPageLayout.Pane>
            <SplitPageLayout.Footer>
              <Placeholder label="Footer" height={64} />
            </SplitPageLayout.Footer>
          </SplitPageLayout.Root>
        </Demo>

        <Demo
          title="Responsive pane"
          description='panePosition={{ base: "end", md: "start" }}: the pane stacks below the content under 768px. The footer is hidden there with hideBelow="md".'
        >
          <SplitPageLayout.Root sticky={false} panePosition={{ base: "end", md: "start" }}>
            <SplitPageLayout.Header>
              <Placeholder label="Header" height={64} />
            </SplitPageLayout.Header>
            <SplitPageLayout.Pane aria-label="Responsive pane">
              <Placeholder label="Pane: below the content (< md) → at the start (md and up)" height={200} />
            </SplitPageLayout.Pane>
            <SplitPageLayout.Content as="div">
              <Placeholder label="Content" height={300} />
            </SplitPageLayout.Content>
            <SplitPageLayout.Footer hideBelow="md">
              <Placeholder label='Footer: hideBelow="md"' height={64} />
            </SplitPageLayout.Footer>
          </SplitPageLayout.Root>
        </Demo>

        <Demo
          title="Pane hidden when narrow"
          description='hideBelow="md" removes the pane below 768px, leaving header, content and footer.'
        >
          <SplitPageLayout.Root sticky={false}>
            <SplitPageLayout.Header>
              <Placeholder label="Header" height={64} />
            </SplitPageLayout.Header>
            <SplitPageLayout.Pane hideBelow="md" aria-label="Pane hidden when narrow">
              <Placeholder label='Pane: hideBelow="md"' height={200} />
            </SplitPageLayout.Pane>
            <SplitPageLayout.Content as="div">
              <Placeholder label="Content" height={300} />
            </SplitPageLayout.Content>
            <SplitPageLayout.Footer>
              <Placeholder label="Footer" height={64} />
            </SplitPageLayout.Footer>
          </SplitPageLayout.Root>
        </Demo>

        <Demo
          title="With sidebar"
          description="A sidebar spans the full height of the layout, next to header, pane, content and footer."
        >
          <SplitPageLayout.Root sticky={false}>
            <SplitPageLayout.Sidebar aria-label="Demo sidebar">
              <Placeholder label="Sidebar" height={300} />
            </SplitPageLayout.Sidebar>
            <SplitPageLayout.Header>
              <Placeholder label="Header" height={64} />
            </SplitPageLayout.Header>
            <SplitPageLayout.Pane aria-label="Pane next to sidebar">
              <Placeholder label="Pane" height={200} />
            </SplitPageLayout.Pane>
            <SplitPageLayout.Content as="div">
              <Placeholder label="Content" height={300} />
            </SplitPageLayout.Content>
            <SplitPageLayout.Footer>
              <Placeholder label="Footer" height={64} />
            </SplitPageLayout.Footer>
          </SplitPageLayout.Root>
        </Demo>
      </Stack>
    </Box>
  );
}
