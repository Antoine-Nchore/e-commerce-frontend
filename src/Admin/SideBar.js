import { Link } from "react-router-dom";
import { Flex, Heading, Box, Stack } from "@chakra-ui/react";

const SideBar = () => {
  return (
    <Box>
      <Flex
        alignItems="center"
        direction="column"
        w="250px"
        h="100vh"
        bg="#48a14d"
        color="white"
        p={4}
      >
        <Heading as="h2" size="lg" mb={6} mt="150px">
          Admin Panel
        </Heading>
        <Stack direction="column" spacing={4} mt="-10px">
          <Link to="/add-products">Post Ads</Link>
          <Link to="/all-users">View Clients</Link>
        </Stack>
      </Flex>
    </Box>
  );
};

export default SideBar;
