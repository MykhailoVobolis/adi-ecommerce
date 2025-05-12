import { Section, Text } from "@radix-ui/themes";

import css from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <Section className={css.container}>
      <Text as="p" size="4">
        404 | Sorry, page not found
      </Text>
    </Section>
  );
}
