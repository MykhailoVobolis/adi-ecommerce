import { Flex, Text } from '@radix-ui/themes';

export default function SummaryItem({ label, value, bold = false }) {
  return (
    <Flex justify="between" mb="2">
      <Text as="p" weight={bold ? 'bold' : undefined}>
        {label}
      </Text>
      <Text as="p" weight={bold ? 'bold' : undefined}>
        {value}
      </Text>
    </Flex>
  );
}
