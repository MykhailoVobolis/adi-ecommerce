import { Flex, Heading, Section } from '@radix-ui/themes';

import css from './HomePage.module.css';

export default function HomePage() {
  return (
    <>
      <Section className={css.sectionContainer}>
        <Flex className={css.hero}>
          <Heading as="h1" className={css.heading}>
            Impossible
            <br />
            is<span className={css.spase}></span>Nothing
          </Heading>
        </Flex>
      </Section>
    </>
  );
}
