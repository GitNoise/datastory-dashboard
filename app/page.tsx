import { Heading, Flex, Container } from "@chakra-ui/react";

import { getCountries } from "@/actions/countryActions";
import { getMeasures } from "@/actions/measureActions";

import Dashboard from "../components/dashboard";

export default async function Home() {
  const countries = await getCountries();
  const measures = await getMeasures();

  return (
    <Flex justify="center" minH="100vh" w="100%" p={6}>
      <Container maxW="900px">
        <Heading as="h1" size="2xl" noOfLines={1} color={"#222"}>
          Datastory Country Dashboard
        </Heading>

        <main>
          {countries?.length && measures?.length && (
            <Dashboard
              countries={countries.sort((a, b) => (a.name < b.name ? -1 : 1))}
              measures={measures}
            />
          )}
        </main>
      </Container>
    </Flex>
  );
}
