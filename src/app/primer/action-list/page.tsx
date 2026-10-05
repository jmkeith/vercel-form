"use client";

import { Badge, Box, Container, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { useState, type ReactNode } from "react";
import {
  GoArchive,
  GoArrowLeft,
  GoArrowRight,
  GoBook,
  GoEye,
  GoFileDirectory,
  GoGear,
  GoLaw,
  GoLink,
  GoPencil,
  GoQuote,
  GoRepoForked,
  GoStar,
  GoTable,
  GoTrash,
} from "react-icons/go";
import { ActionList } from "@/components/trango/components/ActionList";

const users = [
  { login: "pksjce", name: "Pavithra Kodmad" },
  { login: "jfuchs", name: "Jonathan Fuchs" },
  { login: "broccolinisoup", name: "Armagan Ersoz" },
  { login: "dgreif", name: "Dusty Greif" },
];

const projects = [
  { name: "Primer Backlog", scope: "GitHub" },
  { name: "Accessibility", scope: "GitHub" },
  { name: "Octicons", scope: "github/primer" },
  { name: "Primer React", scope: "github/primer" },
];

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
      <Box borderWidth="1px" borderColor="border" borderRadius="6px" bg="bg" colorPalette="blue">
        {children}
      </Box>
    </Stack>
  );
}

function SingleSelect() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <ActionList.Root selectionVariant="single" showDividers role="menu" aria-label="Project">
      {projects.map((project, index) => (
        <ActionList.Item
          key={project.name}
          selected={index === selectedIndex}
          onSelect={() => setSelectedIndex(index)}
          disabled={index === 3}
        >
          <ActionList.LeadingVisual>
            <GoTable />
          </ActionList.LeadingVisual>
          {project.name}
          <ActionList.Description variant="block">{project.scope}</ActionList.Description>
        </ActionList.Item>
      ))}
    </ActionList.Root>
  );
}

function MultiSelect({ grouped = false }: { grouped?: boolean }) {
  const [selected, setSelected] = useState<string[]>([users[0].login]);
  const toggle = (login: string) =>
    setSelected((current) =>
      current.includes(login) ? current.filter((value) => value !== login) : [...current, login],
    );

  const items = users.map((user, index) => (
    <ActionList.Item
      key={user.login}
      selected={selected.includes(user.login)}
      onSelect={() => toggle(user.login)}
      disabled={!grouped && index === 3}
    >
      {user.login}
      <ActionList.Description>{user.name}</ActionList.Description>
    </ActionList.Item>
  ));

  return (
    <ActionList.Root selectionVariant="multiple" showDividers role="menu" aria-label="Reviewers">
      {grouped ? (
        <>
          <ActionList.Group title="Suggested">{items.slice(0, 2)}</ActionList.Group>
          <ActionList.Group title="Everyone" headingProps={{ variant: "filled" }}>
            {items.slice(2)}
          </ActionList.Group>
        </>
      ) : (
        items
      )}
    </ActionList.Root>
  );
}

function ListboxSelect({ selectionVariant }: { selectionVariant: "single" | "radio" }) {
  const [selectedIndex, setSelectedIndex] = useState(1);
  return (
    <ActionList.Root selectionVariant={selectionVariant} role="listbox" aria-label="Project">
      {projects.map((project, index) => (
        <ActionList.Item
          key={project.name}
          selected={index === selectedIndex}
          onSelect={() => setSelectedIndex(index)}
          inactiveText={index === 3 ? "Unavailable due to an outage" : undefined}
        >
          {project.name}
        </ActionList.Item>
      ))}
    </ActionList.Root>
  );
}

export default function ActionListDemoPage() {
  const [lastAction, setLastAction] = useState("nothing yet");

  return (
    <Container maxW="5xl" py="10">
      <Stack gap="10">
        <Stack gap="2">
          <Heading as="h1" size="2xl">
            ActionList
          </Heading>
          <Text color="fg.muted">
            Primer ActionList as a Chakra UI slot recipe component. Last selected: {lastAction}.
          </Text>
        </Stack>

        <SimpleGrid columns={{ base: 1, md: 2 }} gap="8">
          <Section title="Plain items">
            <ActionList.Root>
              <ActionList.Item onSelect={() => setLastAction("Copy link")}>Copy link</ActionList.Item>
              <ActionList.Item onSelect={() => setLastAction("Quote reply")}>
                Quote reply
              </ActionList.Item>
              <ActionList.Item onSelect={() => setLastAction("Edit comment")}>
                Edit comment
              </ActionList.Item>
            </ActionList.Root>
          </Section>

          <Section title="Heading, visuals, divider and danger">
            <ActionList.Root>
              <ActionList.Heading as="h3" size="small">
                Comment actions
              </ActionList.Heading>
              <ActionList.Item onSelect={() => setLastAction("Copy link")}>
                <ActionList.LeadingVisual>
                  <GoLink />
                </ActionList.LeadingVisual>
                Copy link
                <ActionList.TrailingVisual>⌘C</ActionList.TrailingVisual>
              </ActionList.Item>
              <ActionList.Item onSelect={() => setLastAction("Quote reply")}>
                <ActionList.LeadingVisual>
                  <GoQuote />
                </ActionList.LeadingVisual>
                Quote reply
                <ActionList.TrailingVisual>⌘Q</ActionList.TrailingVisual>
              </ActionList.Item>
              <ActionList.Item onSelect={() => setLastAction("Edit comment")}>
                <ActionList.LeadingVisual>
                  <GoPencil />
                </ActionList.LeadingVisual>
                Edit comment
                <ActionList.TrailingVisual>
                  <Badge size="sm">3</Badge>
                </ActionList.TrailingVisual>
              </ActionList.Item>
              <ActionList.Divider />
              <ActionList.Item onSelect={() => setLastAction("Archive")}>
                <ActionList.LeadingVisual>
                  <GoArchive />
                </ActionList.LeadingVisual>
                Archive
              </ActionList.Item>
              <ActionList.Item variant="danger" onSelect={() => setLastAction("Delete file")}>
                <ActionList.LeadingVisual>
                  <GoTrash />
                </ActionList.LeadingVisual>
                Delete file
                <ActionList.TrailingVisual>⌘D</ActionList.TrailingVisual>
              </ActionList.Item>
            </ActionList.Root>
          </Section>

          <Section title="Inline description">
            <ActionList.Root>
              {users.map((user) => (
                <ActionList.Item key={user.login}>
                  {user.login}
                  <ActionList.Description>{user.name}</ActionList.Description>
                </ActionList.Item>
              ))}
              <ActionList.Item>
                truncated
                <ActionList.Description truncate>
                  A long inline description that is cut off with an ellipsis when it runs out of room
                </ActionList.Description>
              </ActionList.Item>
            </ActionList.Root>
          </Section>

          <Section title="Block description">
            <ActionList.Root>
              {users.map((user) => (
                <ActionList.Item key={user.login}>
                  <ActionList.LeadingVisual>
                    <GoGear />
                  </ActionList.LeadingVisual>
                  {user.login}
                  <ActionList.Description variant="block">{user.name}</ActionList.Description>
                </ActionList.Item>
              ))}
            </ActionList.Root>
          </Section>

          <Section
            title="Item dividers and mixed descriptions"
            note="showDividers; a label is semibold only above a block description."
          >
            <ActionList.Root showDividers>
              <ActionList.Item>
                Primer Backlog
                <ActionList.Description variant="block">GitHub</ActionList.Description>
              </ActionList.Item>
              <ActionList.Item>Accessibility</ActionList.Item>
              <ActionList.Item>
                Octicons
                <ActionList.Description>github/primer</ActionList.Description>
              </ActionList.Item>
              <ActionList.Item>Primer React</ActionList.Item>
            </ActionList.Root>
          </Section>

          <Section
            title="Disabled, inactive, loading, active and large"
            note="The large row is a style prop here; size on the root sets it for the whole list."
          >
            <ActionList.Root aria-label="States">
              <ActionList.Item disabled>
                <ActionList.LeadingVisual>
                  <GoTable />
                </ActionList.LeadingVisual>
                Disabled item
                <ActionList.Description variant="block">Cannot be selected</ActionList.Description>
              </ActionList.Item>
              <ActionList.Item inactiveText="Unavailable due to an outage">
                <ActionList.LeadingVisual>
                  <GoTable />
                </ActionList.LeadingVisual>
                Inactive item with a visual
              </ActionList.Item>
              <ActionList.Item inactiveText="Unavailable due to an outage">
                Inactive item
              </ActionList.Item>
              <ActionList.Item loading>
                <ActionList.LeadingVisual>
                  <GoTable />
                </ActionList.LeadingVisual>
                Loading item with a visual
              </ActionList.Item>
              <ActionList.Item loading>Loading item</ActionList.Item>
              <ActionList.Item active>Active item</ActionList.Item>
              <ActionList.Item paddingBlock="10px">Large item</ActionList.Item>
              <ActionList.Item variant="danger">Danger item</ActionList.Item>
            </ActionList.Root>
          </Section>

          <Section title="Single selection" note='role="menu": items become menuitemradio.'>
            <SingleSelect />
          </Section>

          <Section title="Multiple selection" note='role="menu": items become menuitemcheckbox.'>
            <MultiSelect />
          </Section>

          <Section
            title="Listbox, single selection"
            note="One tab stop; arrow keys, Home and End move focus. The last option is inactive."
          >
            <ListboxSelect selectionVariant="single" />
          </Section>

          <Section title="Listbox, radio selection">
            <ListboxSelect selectionVariant="radio" />
          </Section>

          <Section title="Groups with headings">
            <ActionList.Root>
              <ActionList.Group title="Repositories" headingProps={{ as: "h3" }}>
                <ActionList.Item>
                  <ActionList.LeadingVisual>
                    <GoFileDirectory />
                  </ActionList.LeadingVisual>
                  app/assets/modules
                </ActionList.Item>
                <ActionList.Item>
                  <ActionList.LeadingVisual>
                    <GoFileDirectory />
                  </ActionList.LeadingVisual>
                  src/react/components
                </ActionList.Item>
              </ActionList.Group>
              <ActionList.Divider />
              <ActionList.Group title="Advisories" headingProps={{ as: "h3", variant: "filled" }}>
                <ActionList.Item>Security advisory</ActionList.Item>
                <ActionList.Item>Dependabot alert</ActionList.Item>
              </ActionList.Group>
            </ActionList.Root>
          </Section>

          <Section title="Groups with selection" note="In a menu each group is a labelled group.">
            <MultiSelect grouped />
          </Section>

          <Section title="Link items" note="A label with markup in it goes in ItemLabel.">
            <ActionList.Root>
              <ActionList.Heading as="h3" size="small">
                Details
              </ActionList.Heading>
              <ActionList.LinkItem href="https://github.com/primer/react#readme">
                <ActionList.LeadingVisual>
                  <GoBook />
                </ActionList.LeadingVisual>
                Readme
              </ActionList.LinkItem>
              <ActionList.LinkItem href="https://github.com/primer/react/blob/main/LICENSE">
                <ActionList.LeadingVisual>
                  <GoLaw />
                </ActionList.LeadingVisual>
                MIT License
              </ActionList.LinkItem>
              <ActionList.LinkItem href="https://github.com/primer/react/stargazers" active>
                <ActionList.LeadingVisual>
                  <GoStar />
                </ActionList.LeadingVisual>
                <ActionList.ItemLabel>
                  <strong>1.5k</strong> stars
                </ActionList.ItemLabel>
              </ActionList.LinkItem>
              <ActionList.LinkItem href="https://github.com/primer/react/watchers">
                <ActionList.LeadingVisual>
                  <GoEye />
                </ActionList.LeadingVisual>
                <ActionList.ItemLabel>
                  <strong>21</strong> watching
                </ActionList.ItemLabel>
              </ActionList.LinkItem>
              <ActionList.LinkItem
                href="https://github.com/primer/react/network/members"
                inactiveText="Unavailable due to an outage"
              >
                <ActionList.LeadingVisual>
                  <GoRepoForked />
                </ActionList.LeadingVisual>
                <ActionList.ItemLabel>
                  <strong>225</strong> forks
                </ActionList.ItemLabel>
              </ActionList.LinkItem>
            </ActionList.Root>
          </Section>

          <Section title="Trailing action" note="Passed to the row through trailingAction.">
            <ActionList.Root>
              <ActionList.Item
                trailingAction={
                  <ActionList.TrailingAction
                    aria-label="Expand sidebar"
                    onClick={() => setLastAction("Expand sidebar")}
                  >
                    <GoArrowLeft />
                  </ActionList.TrailingAction>
                }
              >
                <ActionList.LeadingVisual>
                  <GoFileDirectory />
                </ActionList.LeadingVisual>
                Item 1 (icon button)
              </ActionList.Item>
              <ActionList.Item
                trailingAction={
                  <ActionList.TrailingAction asChild aria-label="Some action 1">
                    <a href="#">
                      <GoArrowRight />
                    </a>
                  </ActionList.TrailingAction>
                }
              >
                Item 2 (icon link)
              </ActionList.Item>
              <ActionList.Item
                trailingAction={
                  <ActionList.TrailingAction aria-label="Some action 2">
                    <GoBook />
                  </ActionList.TrailingAction>
                }
              >
                Item 3<ActionList.Description>This is an inline description.</ActionList.Description>
              </ActionList.Item>
              <ActionList.Item
                trailingAction={
                  <ActionList.TrailingAction>Some action 3</ActionList.TrailingAction>
                }
              >
                Item 4
                <ActionList.Description variant="block">
                  This is a block description.
                </ActionList.Description>
              </ActionList.Item>
              <ActionList.Item
                trailingAction={
                  <ActionList.TrailingAction asChild>
                    <a href="#">Some action 4</a>
                  </ActionList.TrailingAction>
                }
              >
                Item 5 (text link)
              </ActionList.Item>
              <ActionList.Item
                trailingAction={
                  <ActionList.TrailingAction aria-label="Process item" loading>
                    <GoArrowRight />
                  </ActionList.TrailingAction>
                }
              >
                Icon button loading
              </ActionList.Item>
              <ActionList.Item
                trailingAction={
                  <ActionList.TrailingAction loading>Save changes</ActionList.TrailingAction>
                }
              >
                Text button loading
              </ActionList.Item>
              <ActionList.LinkItem
                href="#"
                trailingAction={
                  <ActionList.TrailingAction>Another action</ActionList.TrailingAction>
                }
              >
                LinkItem
                <ActionList.Description>with a trailing action</ActionList.Description>
              </ActionList.LinkItem>
            </ActionList.Root>
          </Section>

          <Section
            title="Full variant, large rows"
            note='variant="full" size="large": rows are flush with the list edges and 40px tall.'
          >
            <ActionList.Root variant="full" size="large">
              <ActionList.Item>Copy link</ActionList.Item>
              <ActionList.Item>Quote reply</ActionList.Item>
              <ActionList.Item>Edit comment</ActionList.Item>
            </ActionList.Root>
          </Section>

          <Section title="Horizontal inset variant" note='variant="horizontal-inset".'>
            <ActionList.Root variant="horizontal-inset">
              <ActionList.Item>Copy link</ActionList.Item>
              <ActionList.Item>Quote reply</ActionList.Item>
              <ActionList.Item>Edit comment</ActionList.Item>
            </ActionList.Root>
          </Section>
        </SimpleGrid>
      </Stack>
    </Container>
  );
}
