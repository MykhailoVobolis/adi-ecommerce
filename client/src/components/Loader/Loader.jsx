import { Flex, Spinner } from '@radix-ui/themes';

export default function Loader() {
  return (
    <Flex align="center" justify="center" height="calc(100vh - 64px)">
      <Spinner size="3" style={{ transform: 'scale(2)' }} />
    </Flex>
  );
}
