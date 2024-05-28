import { Heading, Box } from "@chakra-ui/react";

import { getCountries } from "@/actions/countryActions";

import Dashboard from "../components/dashboard";

export default async function Home() {
  let countries = await getCountries();

  return (
    <Box minH="100vh" w="100%" p={6}>
      <Heading as="h1" size="4xl" noOfLines={1} color={"#222"}>
        Dashboard
      </Heading>

      <Dashboard countries={countries} />
    </Box>
  );
}
