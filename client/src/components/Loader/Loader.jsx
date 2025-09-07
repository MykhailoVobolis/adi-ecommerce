import { Flex, Spinner } from '@radix-ui/themes';

export default function Loader({ heightValue }) {
  return (
    <Flex align="center" justify="center" height={heightValue}>
      <Spinner size="3" style={{ transform: 'scale(2)' }} />
    </Flex>
  );
}
