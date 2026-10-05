import { Center, Code, Text } from "@chakra-ui/react";

export default function Home() {
  return (
    <Center as="main" minH="100vh">
      <Text color="fg.muted">
        Clone target not yet built. Run{" "}
        <Code variant="plain" color="fg">
          /clone-website
        </Code>{" "}
        to start.
      </Text>
    </Center>
  );
}
