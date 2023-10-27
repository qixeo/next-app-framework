import { Flex, Grid } from '@radix-ui/themes';

export default async function Home() {
  return (
    <Grid columns={{ initial: '1', md: '2' }} gap="5">
      <Flex direction="column" gap="5">
        Welcome!
      </Flex>
    </Grid>
  );
}
