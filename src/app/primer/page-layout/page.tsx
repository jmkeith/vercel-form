"use client";

import { Box, Button, Flex, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import {
  PageLayout,
  type PageLayoutRootProps,
} from "@/components/trango/components/PageLayout";

/** Keeps sticky panes below the site's 64px sticky header. */
const STICKY_OFFSET = { "--page-layout-sticky-offset": "64px" };

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at enim id lorem tempus egestas a " +
  "non ipsum. Maecenas imperdiet ante quam, at varius lorem molestie vel. Sed at eros consequat, " +
  "varius tellus et, auctor felis. Donec pulvinar lacinia urna nec commodo. Phasellus at imperdiet " +
  "risus. Donec sit amet massa purus.";

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

function Options<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <HStack gap="8px" wrap="wrap">
      <Text fontSize="13px" color="fg.muted" minWidth="110px">
        {label}
      </Text>
      {options.map((option) => (
        <Button
          key={option}
          size="xs"
          variant={option === value ? "solid" : "outline"}
          aria-pressed={option === value}
          onClick={() => onChange(option)}
        >
          {option}
        </Button>
      ))}
    </HStack>
  );
}

const CONTAINER_WIDTHS = ["full", "medium", "large", "xlarge"] as const;
const SPACINGS = ["none", "condensed", "normal"] as const;

type ContainerWidth = (typeof CONTAINER_WIDTHS)[number];
type Spacing = (typeof SPACINGS)[number];

function ContainerOptionsDemo() {
  const [containerWidth, setContainerWidth] = useState<ContainerWidth>("large");
  const [padding, setPadding] = useState<Spacing>("normal");
  const [rowGap, setRowGap] = useState<Spacing>("normal");
  const [columnGap, setColumnGap] = useState<Spacing>("normal");
  const [regionPadding, setRegionPadding] = useState<Spacing>("condensed");

  const options: PageLayoutRootProps = { containerWidth, padding, rowGap, columnGap, regionPadding };

  return (
    <>
      <Stack gap="8px" padding="16px 24px" borderBottom="1px solid" borderColor="border">
        <Options
          label="containerWidth"
          options={CONTAINER_WIDTHS}
          value={containerWidth}
          onChange={setContainerWidth}
        />
        <Options label="padding" options={SPACINGS} value={padding} onChange={setPadding} />
        <Options label="rowGap" options={SPACINGS} value={rowGap} onChange={setRowGap} />
        <Options label="columnGap" options={SPACINGS} value={columnGap} onChange={setColumnGap} />
        <Options
          label="regionPadding"
          options={SPACINGS}
          value={regionPadding}
          onChange={setRegionPadding}
        />
      </Stack>
      <PageLayout.Root
        {...options}
        contentWidth="medium"
        headerDivider="line"
        paneDivider="line"
        footerDivider="line"
      >
        <PageLayout.Header>
          <Placeholder label="Header" height={64} />
        </PageLayout.Header>
        <PageLayout.Content as="div">
          <Placeholder label='Content (contentWidth="medium")' height={240} />
        </PageLayout.Content>
        <PageLayout.Pane aria-label="Options demo pane">
          <Placeholder label="Pane" height={160} />
        </PageLayout.Pane>
        <PageLayout.Footer>
          <Placeholder label="Footer" height={64} />
        </PageLayout.Footer>
      </PageLayout.Root>
    </>
  );
}

export default function PageLayoutDemoPage() {
  return (
    <Box as="main" width="100%" paddingBlock="24px">
      <Box paddingInline="24px" paddingBottom="8px">
        <Heading as="h1" fontSize="32px" lineHeight="40px" fontWeight="600">
          PageLayout
        </Heading>
        <Text marginTop="8px" color="fg.muted">
          Primer&apos;s PageLayout as a Chakra UI slot recipe component. Every layout option is a
          variant of the root. Resize the window to see the pane stack below 768px.
        </Text>
      </Box>

      <Stack gap="32px">
        <Demo
          title="Default"
          description="Header, content, pane (at the end by default) and footer with the default spacing."
        >
          <PageLayout.Root>
            <PageLayout.Header>
              <Placeholder label="Header" height={64} />
            </PageLayout.Header>
            <PageLayout.Content as="div">
              <Placeholder label="Content" height={400} />
            </PageLayout.Content>
            <PageLayout.Pane aria-label="Default pane">
              <Placeholder label="Pane" height={200} />
            </PageLayout.Pane>
            <PageLayout.Footer>
              <Placeholder label="Footer" height={64} />
            </PageLayout.Footer>
          </PageLayout.Root>
        </Demo>

        <Demo
          title="Pane at start, with dividers"
          description='panePosition="start" with headerDivider, paneDivider and footerDivider set to "line". Below 768px the pane stacks above the content and its divider turns horizontal.'
        >
          <PageLayout.Root
            panePosition="start"
            headerDivider="line"
            paneDivider="line"
            footerDivider="line"
          >
            <PageLayout.Header>
              <Placeholder label="Header" height={64} />
            </PageLayout.Header>
            <PageLayout.Pane aria-label="Start pane">
              <Placeholder label="Pane (start)" height={200} />
            </PageLayout.Pane>
            <PageLayout.Content as="div">
              <Placeholder label="Content" height={400} />
            </PageLayout.Content>
            <PageLayout.Footer>
              <Placeholder label="Footer" height={64} />
            </PageLayout.Footer>
          </PageLayout.Root>
        </Demo>

        <Demo
          title="Resizable pane"
          description="Drag the divider, or focus it and use the arrow keys (3px per press; Home and End jump to the limits). Double-click resets. The width is saved to localStorage and restored on reload."
        >
          <PageLayout.Root panePosition="start">
            <PageLayout.Header>
              <Placeholder label="Header" height={64} />
            </PageLayout.Header>
            <PageLayout.Pane
              resizable
              widthStorageKey="primer-demo.page-layout.pane"
              aria-label="Resizable pane"
            >
              <Placeholder label="Pane (resizable, start)" height={320} />
            </PageLayout.Pane>
            <PageLayout.Content as="div">
              <Placeholder label="Content" height={640} />
            </PageLayout.Content>
            <PageLayout.Footer>
              <Placeholder label="Footer" height={64} />
            </PageLayout.Footer>
          </PageLayout.Root>
        </Demo>

        <Demo
          title="Resizable pane at end, custom limits"
          description='minWidth="200px" and maxWidth="400px" on the pane bound the resize. No widthStorageKey, so the width is not remembered.'
        >
          <PageLayout.Root>
            <PageLayout.Header>
              <Placeholder label="Header" height={64} />
            </PageLayout.Header>
            <PageLayout.Pane resizable minWidth="200px" maxWidth="400px" aria-label="Bounded pane">
              <Placeholder label="Pane: resizable between 200px and 400px" height={200} />
            </PageLayout.Pane>
            <PageLayout.Content as="div">
              <Placeholder label="Content" height={320} />
            </PageLayout.Content>
          </PageLayout.Root>
        </Demo>

        <Demo
          title="Sticky pane"
          description="The pane sticks below the site header (--page-layout-sticky-offset: 64px) while the long content scrolls, and scrolls on its own once it is taller than the viewport."
        >
          <PageLayout.Root
            css={STICKY_OFFSET}
            sticky
            containerWidth="full"
            contentWidth="large"
            padding="none"
            rowGap="none"
            columnGap="none"
            regionPadding="normal"
            panePosition="start"
            headerDivider="line"
            paneDivider="line"
            footerDivider="line"
          >
            <PageLayout.Header>
              <Placeholder label="Header" height={64} />
            </PageLayout.Header>
            <PageLayout.Content as="div">
              <Paragraphs count={30} />
            </PageLayout.Content>
            <PageLayout.Pane aria-label="Sticky pane">
              <Paragraphs count={10} />
            </PageLayout.Pane>
            <PageLayout.Footer>
              <Placeholder label="Footer" height={64} />
            </PageLayout.Footer>
          </PageLayout.Root>
        </Demo>

        <Demo
          title="Container width and spacing"
          description="containerWidth caps the layout; padding, rowGap and columnGap set the outer and inner spacing; regionPadding pads every part."
        >
          <ContainerOptionsDemo />
        </Demo>

        <Demo
          title="Responsive pane position"
          description='panePosition={{ base: "end", md: "start" }}: the pane stacks below the content under 768px and sits at the start from there up.'
        >
          <PageLayout.Root panePosition={{ base: "end", md: "start" }} paneDivider="line">
            <PageLayout.Header>
              <Placeholder label="Header" height={64} />
            </PageLayout.Header>
            <PageLayout.Content as="div">
              <Placeholder label="Content" height={300} />
            </PageLayout.Content>
            <PageLayout.Pane aria-label="Responsive pane">
              <Placeholder label="Pane: below the content (< md) → at the start (md and up)" height={200} />
            </PageLayout.Pane>
          </PageLayout.Root>
        </Demo>

        <Demo
          title="Parts hidden per viewport"
          description='Every part takes hideBelow / hideFrom: the pane is hidden below md, the header from xl, and the footer from md.'
        >
          <PageLayout.Root>
            <PageLayout.Header hideFrom="xl">
              <Placeholder label='Header: hideFrom="xl"' height={64} />
            </PageLayout.Header>
            <PageLayout.Content as="div">
              <Placeholder label="Content" height={300} />
            </PageLayout.Content>
            <PageLayout.Pane hideBelow="md" aria-label="Pane hidden when narrow">
              <Placeholder label='Pane: hideBelow="md"' height={200} />
            </PageLayout.Pane>
            <PageLayout.Footer hideFrom="md">
              <Placeholder label='Footer: hideFrom="md"' height={64} />
            </PageLayout.Footer>
          </PageLayout.Root>
        </Demo>

        <Demo
          title="Sidebar"
          description="A sidebar spans the full height next to header, content, pane and footer; below 768px it stacks on top."
        >
          <PageLayout.Root containerWidth="full" sidebarDivider="line">
            <PageLayout.Sidebar aria-label="Demo sidebar">
              <Placeholder label="Sidebar" height={400} />
            </PageLayout.Sidebar>
            <PageLayout.Header>
              <Placeholder label="Header" height={64} />
            </PageLayout.Header>
            <PageLayout.Content as="div">
              <Placeholder label="Content" height={300} />
            </PageLayout.Content>
            <PageLayout.Pane aria-label="Pane next to sidebar">
              <Placeholder label="Pane" height={200} />
            </PageLayout.Pane>
            <PageLayout.Footer>
              <Placeholder label="Footer" height={64} />
            </PageLayout.Footer>
          </PageLayout.Root>
        </Demo>
      </Stack>
    </Box>
  );
}
