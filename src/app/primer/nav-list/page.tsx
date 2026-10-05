"use client";

import { Badge, Box, Container, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import type { ReactNode } from "react";
import {
  GoArrowLeft,
  GoArrowRight,
  GoBell,
  GoBook,
  GoFileDirectory,
  GoGear,
  GoGitPullRequest,
  GoHome,
  GoIssueOpened,
  GoKey,
  GoPeople,
  GoPerson,
  GoProject,
} from "react-icons/go";
import { NavList } from "@/components/trango/components/NavList";

function Section({ title, note, children }: { title: string; note?: string; children: ReactNode }) {
  return (
    <Stack as="section" gap="3" minWidth="0">
      <Heading as="h2" size="md">
        {title}
      </Heading>
      {note ? (
        <Text fontSize="sm" color="fg.muted">
          {note}
        </Text>
      ) : null}
      <Box
        borderWidth="1px"
        borderColor="border"
        borderRadius="6px"
        bg="bg"
        colorPalette="blue"
        maxWidth="320px"
      >
        {children}
      </Box>
    </Stack>
  );
}

const moreItems = ["Item 4", "Item 5", "Item 6", "Item 7", "Item 8", "Item 9"].map((text) => (
  <NavList.Item key={text} href="#">
    {text}
  </NavList.Item>
));

const groupItems1 = [
  <NavList.Item key="1D" href="#">
    Item 1D
  </NavList.Item>,
  <NavList.Item
    key="1E"
    href="#"
    trailingAction={
      <NavList.TrailingAction aria-label="Some action">
        <GoArrowRight />
      </NavList.TrailingAction>
    }
  >
    Item 1E
  </NavList.Item>,
];

const groupItems2 = [
  <NavList.Item key="2D" href="#">
    Item 2D
    <NavList.TrailingVisual>
      <GoBook />
    </NavList.TrailingVisual>
  </NavList.Item>,
  <NavList.Item key="2E" href="#">
    <NavList.LeadingVisual>
      <GoFileDirectory />
    </NavList.LeadingVisual>
    Item 2E
  </NavList.Item>,
];

export default function NavListDemoPage() {
  return (
    <Container maxW="5xl" py="10">
      <Stack gap="10">
        <Stack gap="2">
          <Heading as="h1" size="2xl">
            NavList
          </Heading>
          <Text color="fg.muted">Primer NavList as a Chakra UI slot recipe component.</Text>
        </Stack>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="8">
          <Section title="Items with aria-current">
            <NavList.Root aria-label="Default">
              <NavList.Item href="#" aria-current="page">
                Item 1
              </NavList.Item>
              <NavList.Item href="#">Item 2</NavList.Item>
              <NavList.Item href="#">Item 3</NavList.Item>
            </NavList.Root>
          </Section>

          <Section title="Leading and trailing visuals">
            <NavList.Root aria-label="Repository">
              <NavList.Item href="#" aria-current="page">
                <NavList.LeadingVisual>
                  <GoHome />
                </NavList.LeadingVisual>
                Overview
              </NavList.Item>
              <NavList.Item href="#">
                <NavList.LeadingVisual>
                  <GoIssueOpened />
                </NavList.LeadingVisual>
                Issues
                <NavList.TrailingVisual>
                  <Badge size="sm">12</Badge>
                </NavList.TrailingVisual>
              </NavList.Item>
              <NavList.Item href="#">
                <NavList.LeadingVisual>
                  <GoGitPullRequest />
                </NavList.LeadingVisual>
                Pull requests
                <NavList.TrailingVisual>3</NavList.TrailingVisual>
              </NavList.Item>
              <NavList.Item href="#" inactiveText="Unavailable due to an outage">
                <NavList.LeadingVisual>
                  <GoProject />
                </NavList.LeadingVisual>
                Projects
              </NavList.Item>
            </NavList.Root>
          </Section>

          <Section title="Heading">
            <NavList.Root aria-label="Settings">
              <NavList.Heading>Settings</NavList.Heading>
              <NavList.Item href="#" aria-current="page">
                Profile
              </NavList.Item>
              <NavList.Item href="#">Appearance</NavList.Item>
              <NavList.Item href="#">Notifications</NavList.Item>
            </NavList.Root>
          </Section>

          <Section
            title="Sub nav"
            note="Parents expand and collapse. Item 2 starts open because it holds the current page."
          >
            <NavList.Root aria-label="Sub nav">
              <NavList.Item href="#">Item 1</NavList.Item>
              <NavList.Item
                subNav={
                  <NavList.SubNav>
                    <NavList.Item href="#" aria-current="page">
                      Sub item 1
                    </NavList.Item>
                    <NavList.Item href="#">Sub item 2</NavList.Item>
                  </NavList.SubNav>
                }
              >
                Item 2
              </NavList.Item>
              <NavList.Item
                subNav={
                  <NavList.SubNav>
                    <NavList.Item href="#">Sub item 1</NavList.Item>
                    <NavList.Item href="#">Sub item 2</NavList.Item>
                  </NavList.SubNav>
                }
              >
                <NavList.LeadingVisual>
                  <GoGear />
                </NavList.LeadingVisual>
                Item 3
              </NavList.Item>
              <NavList.Item href="#">Item 4</NavList.Item>
            </NavList.Root>
          </Section>

          <Section title="Nested sub nav" note="defaultOpen on Item 1; up to four levels deep.">
            <NavList.Root aria-label="Nested sub nav">
              <NavList.Item
                defaultOpen
                subNav={
                  <NavList.SubNav>
                    <NavList.Item href="#">Sub item 1</NavList.Item>
                  </NavList.SubNav>
                }
              >
                Item 1
              </NavList.Item>
              <NavList.Item
                subNav={
                  <NavList.SubNav>
                    <NavList.Item
                      subNav={
                        <NavList.SubNav>
                          <NavList.Item href="#">Sub item 1.1</NavList.Item>
                          <NavList.Item
                            subNav={
                              <NavList.SubNav>
                                <NavList.Item href="#">Sub item 1.2.1</NavList.Item>
                                <NavList.Item href="#">Sub item 1.2.2</NavList.Item>
                              </NavList.SubNav>
                            }
                          >
                            Sub item 1.2
                          </NavList.Item>
                        </NavList.SubNav>
                      }
                    >
                      Sub item 1
                    </NavList.Item>
                    <NavList.Item href="#">Sub item 2</NavList.Item>
                  </NavList.SubNav>
                }
              >
                Item 2
              </NavList.Item>
              <NavList.Item href="#">Item 3</NavList.Item>
            </NavList.Root>
          </Section>

          <Section title="Groups" note="Group titles, the divider between groups, and a heading.">
            <NavList.Root aria-label="Settings">
              <NavList.Heading as="h3">Settings</NavList.Heading>
              <NavList.Group title="Account">
                <NavList.Item href="#" aria-current="true">
                  <NavList.LeadingVisual>
                    <GoPerson />
                  </NavList.LeadingVisual>
                  Profile
                </NavList.Item>
                <NavList.Item href="#">
                  <NavList.LeadingVisual>
                    <GoBell />
                  </NavList.LeadingVisual>
                  Notifications
                </NavList.Item>
              </NavList.Group>
              <NavList.Group title="Security">
                <NavList.Item href="#">
                  <NavList.LeadingVisual>
                    <GoKey />
                  </NavList.LeadingVisual>
                  Password and authentication
                </NavList.Item>
                <NavList.Item href="#">
                  <NavList.LeadingVisual>
                    <GoPeople />
                  </NavList.LeadingVisual>
                  Sessions
                </NavList.Item>
              </NavList.Group>
            </NavList.Root>
          </Section>

          <Section title="Divider and group heading links" note="hideDivider on the second group.">
            <NavList.Root aria-label="Group heading links">
              <NavList.Item href="#">Dashboard</NavList.Item>
              <NavList.Divider />
              <NavList.Group hideDivider title={<a href="#group-1">Group 1</a>}>
                <NavList.Item href="#">Item 1A</NavList.Item>
                <NavList.Item href="#">Item 1B</NavList.Item>
              </NavList.Group>
              <NavList.Group title={<a href="#group-2">Group 2</a>}>
                <NavList.Item href="#">Item 2A</NavList.Item>
                <NavList.Item href="#">Item 2B</NavList.Item>
              </NavList.Group>
            </NavList.Root>
          </Section>

          <Section title="Trailing action and description">
            <NavList.Root aria-label="Trailing action">
              <NavList.Item
                href="#"
                trailingAction={
                  <NavList.TrailingAction aria-label="Expand sidebar">
                    <GoArrowLeft />
                  </NavList.TrailingAction>
                }
              >
                <NavList.LeadingVisual>
                  <GoFileDirectory />
                </NavList.LeadingVisual>
                Item 1
              </NavList.Item>
              <NavList.Item
                href="#"
                trailingAction={
                  <NavList.TrailingAction asChild aria-label="Some action">
                    <a href="#">
                      <GoArrowRight />
                    </a>
                  </NavList.TrailingAction>
                }
              >
                Item 2
              </NavList.Item>
              <NavList.Item href="#">
                Item 3
                <NavList.Description>Inline description</NavList.Description>
              </NavList.Item>
              <NavList.Item href="#">
                Item 4
                <NavList.Description variant="block">Block description</NavList.Description>
              </NavList.Item>
            </NavList.Root>
          </Section>

          <Section title="Show more, in pages" note="GroupExpand with pages={2}.">
            <NavList.Root aria-label="Show more">
              <NavList.Item href="#" aria-current="page">
                Item 1
              </NavList.Item>
              <NavList.Item href="#">Item 2</NavList.Item>
              <NavList.Item href="#">Item 3</NavList.Item>
              <NavList.GroupExpand pages={2} items={moreItems} />
            </NavList.Root>
          </Section>

          <Section title="Show more, in groups">
            <NavList.Root aria-label="Show more in groups">
              <NavList.Group title="Group 1">
                <NavList.Item aria-current="true" href="#">
                  Item 1A
                </NavList.Item>
                <NavList.Item href="#">Item 1B</NavList.Item>
                <NavList.GroupExpand label="More" items={groupItems1} />
              </NavList.Group>
              <NavList.Group title="Group 2">
                <NavList.Item href="#">Item 2A</NavList.Item>
                <NavList.Item href="#">Item 2B</NavList.Item>
                <NavList.GroupExpand label="Show" items={groupItems2} />
              </NavList.Group>
            </NavList.Root>
          </Section>
        </SimpleGrid>
      </Stack>
    </Container>
  );
}
