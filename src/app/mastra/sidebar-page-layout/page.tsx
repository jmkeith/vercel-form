"use client";

import { Button, Stack, Text } from "@chakra-ui/react";
import { CollapsibleNavList, PageHeader, SidebarPageLayout } from "@/components/trango/components";
import { DemoNavItems } from "../nav-items";

export default function SidebarPageLayoutDemoPage() {
  return (
    // The site header above is 64px tall and sticky.
    <SidebarPageLayout.Root
      storageKey="mastra-demo.page"
      colorPalette="blue"
      css={{ "--page-layout-sticky-offset": "64px" }}
    >
      <SidebarPageLayout.Sidebar aria-label="Repository" resizable widthStorageKey="mastra-demo.page.width">
        <CollapsibleNavList.Root aria-label="Repository">
          <DemoNavItems />
        </CollapsibleNavList.Root>
      </SidebarPageLayout.Sidebar>
      <SidebarPageLayout.Header>
        <SidebarPageLayout.PageHeader>
          <PageHeader.TitleArea>
            <PageHeader.Title as="h1">Issues</PageHeader.Title>
          </PageHeader.TitleArea>
          <PageHeader.Actions>
            <Button size="sm" colorPalette="green">
              New issue
            </Button>
          </PageHeader.Actions>
        </SidebarPageLayout.PageHeader>
      </SidebarPageLayout.Header>
      <SidebarPageLayout.Content>
        <Stack gap="4">
          {Array.from({ length: 30 }, (_, index) => (
            <Text key={index} color="fg.muted">
              Issue {index + 1}: lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Text>
          ))}
        </Stack>
      </SidebarPageLayout.Content>
      <SidebarPageLayout.Footer>
        <Text color="fg.muted" fontSize="sm">
          Footer
        </Text>
      </SidebarPageLayout.Footer>
    </SidebarPageLayout.Root>
  );
}
