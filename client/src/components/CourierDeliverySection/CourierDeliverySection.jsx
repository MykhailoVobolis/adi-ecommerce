import { Box, Heading, Text } from '@radix-ui/themes';

import DeliveryCourierForm from '../DeliveryCourierForm/DeliveryCourierForm.jsx';

import css from './CourierDeliverySection.module.css';

export default function CourierDeliverySection({
  streetsOfCity,
  selectedStreet,
  selectedCityName,
  selectedMethod,
  handleSubmit,
}) {
  const { streets, totalCount } = streetsOfCity;

  return (
    <Box>
      <Heading as="h2" size="7" mb="3" weight="bold">
        DELIVERY ADDRESS
      </Heading>
      <Text as="p" mb="4">
        We use your contact information only to inform you about your order.
      </Text>
      <DeliveryCourierForm
        onSubmit={handleSubmit}
        streets={streets}
        selectedStreet={selectedStreet}
        totalCount={totalCount}
        selectedCityName={selectedCityName}
        selectedMethod={selectedMethod}
      />
    </Box>
  );
}
