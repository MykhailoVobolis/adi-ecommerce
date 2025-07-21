import { Box, Container, Flex, Heading, Section, Text } from '@radix-ui/themes';

import css from './AccountPage.module.css';

export default function AccountPage() {
  return (
    <Section size="4">
      <Container size={{ initial: '1', sm: '2', md: '3', lg: '4', xl: '5' }}>
        <Flex justify="between" mb="7">
          <Box className={css.wrapper}>
            <Heading as="h2" size="8" mb="4" weight="bold">
              HELLO !
            </Heading>
            <Text as="p" mb="8">
              This is your personal space. Get the low down on your membership status and all the points and rewards
              you've earned.
            </Text>
          </Box>
          {/* {totalQuantityProducts > 0 && (
            <Flex direction="column">
              <OrderSummary totalPrice={totalPrice} totalQuantityProducts={totalQuantityProducts} isDelivery="true" />
              <CheckoutCart products={products} />
              <DeliverySummary
                customerPhone={phone}
                deliveryAddress={deliveryAddress}
                selectedDeliveryCost={selectedDeliveryCost}
              />
            </Flex>
          )} */}
        </Flex>
      </Container>
    </Section>
  );
}
